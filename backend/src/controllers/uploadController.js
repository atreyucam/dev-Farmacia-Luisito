// controllers/uploadController.js

const xlsx = require('xlsx');
const fs = require('fs');
const ProveedorRepository = require('../repositories/ProveedorRepository');
const CompraRepository = require('../repositories/CompraProveedoresRepository');
const DetalleCompraRepository = require('../repositories/DetalleCompraRepository');
const MedicamentoRepository = require('../repositories/MedicamentoRepository');
const InventarioRepository = require('../repositories/InventarioRepository');
const tipoMedicamentoRepository = require('../repositories/tipoMedicamentoRepository');
const medicamentoProveedorRepository = require('../repositories/MedProvrepository');

exports.importarDatos = async (req, res) => {
    try {
        // Cargar el libro de Excel
        const workbook = xlsx.readFile(req.file.path);
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });

        // Procesar datos del proveedor
        const proveedorData = extractProveedorData(data);
        
        if (!proveedorData.ruc || !proveedorData.nombreProveedor || !proveedorData.direccion || !proveedorData.telefono || !proveedorData.emailProveedor) {
            return res.status(400).send('Datos incompletos del proveedor en el archivo Excel');
        }
        
        const proveedor = await ProveedorRepository.buscarOcrear(proveedorData);
        if (!proveedor || !proveedor.id_proveedor) { // Verificar que el proveedor tiene un ID
            return res.status(500).send('Error al obtener el ID del proveedor');
        }

        // ------------------------------------------------------------------
        // Procesar datos de la compra
        const compraData = extractCompraData(data, proveedor.id_proveedor);
        const compra = await CompraRepository.crearCompra(compraData);
        if (!compra) {
            return res.status(500).send('Error al crear la compra');
        }else{
            console.log("Datos del compra extraídos:", compraData);
            
        }
        
        // ------------------------------------------------------------------
        // Procesar detalles de productos
        const detallesCompraData = extractDetallesCompraData(data);
        console.log("detalles compra",detallesCompraData);

        // ------------------------------------------------------------------
        // Tablas
        // await processDetallesCompra(detallesCompraData, compra.id_detalleVenta);
        const tablas = processDetallesCompra(detallesCompraData, compra, proveedor.id_proveedor);
        // console.log("Tablas", tablas);

        // Eliminar el archivo Excel después de procesarlo
        fs.unlinkSync(req.file.path);
        
        res.status(200).send('Datos importados con éxito');
    } catch (error) {
        res.status(500).send(error.message);
    }
};
// ---------------------------------------------------------------
// Funciones para convertir fechas de excel para postgres
function excelSerialDate(serialDate){
    const utc_days = Math.floor(serialDate - 25569);
    const utc_value = utc_days * 86400;
    return new Date(utc_value * 1000);
}
function formatDatePostgres(date){
    return date.toISOString().split('T')[0];
}

// ---------------------------------------------------------------
const extractProveedorData = (data) => ({
    ruc: data[0][1],  //[fila][columna]
    nombreProveedor: data[1][1],
    direccion: data[2][1],
    telefono: data[3][1],
    emailProveedor: data[4][1],
});

// ---------------------------------------------------------------
const extractCompraData = (data, proveedorId) => {
    const fechaExcel = data[6][1]; 
    const fecha = excelSerialDate(fechaExcel);
    const fechaFormateada = formatDatePostgres(fecha);

    return {
        fechaCompra: fechaFormateada,
        numFacturaCompra: data[7][1],
        subtotalCommpra: data[8][1],
        descuentoCompra: data[9][1],
        IVA_compra: data[10][1],
        totalCompra: data[11][1],
        id_proveedor: proveedorId
    };
};

// ---------------------------------------------------------------
const extractDetallesCompraData = (data) => {
    const startIndex = 14; 
    const detalles = [];
    for (let i = startIndex; i < data.length; i++) {
        if (data[i] && data[i][0]) { 
            const fechaCaducidadExcel = data[i][5];
            const fechaCaducidadDate = excelSerialDate(fechaCaducidadExcel);
            const fechaCaducidadFormateado = formatDatePostgres(fechaCaducidadDate);
            detalles.push({
                item: data[i][0],
                numeroLote: data[i][1],
                nombreMedicamento: data[i][2],
                tipo: data[i][3],
                cantidadDisponible: data[i][4],
                fechaCaducidad: fechaCaducidadFormateado,
                precioUnitario: data[i][6],
                precioTotal: data[i][7]
            });
        }
    }
    return detalles;
};

// ---------------------------------------------------------------
// Procesamiento de datos a las diferentes tablas del sistema
const processDetallesCompra = async (detallesCompraData, compraId, idProveedor) => {
    for (const detalle of detallesCompraData) {
        // Primero, verificar si el tipo de medicamento existe
        const tipoMedicamento = await tipoMedicamentoRepository.buscarPorNombre(detalle.tipo);
        if (!tipoMedicamento) {
            console.error(`Tipo de medicamento no encontrado: ${detalle.tipo}`);
            continue; 
        }
        console.log("Tipo de Medicamento encontrado:", tipoMedicamento);

        // Buscar o crear el medicamento
        const medicamento = await MedicamentoRepository.findOrCreate({
            nombreMedicamento: detalle.nombreMedicamento,
            id_tipoMedicamento: tipoMedicamento.id_tipoMedicamento,
        });
        console.log("Medicamento:", medicamento);

        // Determinar y actualizar el campo exentoIVA
        const exentoIVA = tipoMedicamento.categoria !== 'OTC';
        await MedicamentoRepository.actualzarMedicamento(medicamento.id_medicamento, { exentoIVA });

        // Crear un nuevo lote en el inventario
        const inventario = await InventarioRepository.crearInventario({
            id_medicamento: medicamento.id_medicamento,
            numeroLote: detalle.numeroLote,
            cantidadDisponible: detalle.cantidadDisponible,
            fechaCaducidad: detalle.fechaCaducidad,
            precioCompra: detalle.precioUnitario 
        });
        console.log("Inventario:", inventario);

        await MedicamentoRepository.actualizarPrecioVentaMedicamento(medicamento.id_medicamento, detalle.precioUnitario);

        console.log("id compra: ", compraId);
        // Crear un nuevo detalle de compra
        const detalleCompra = await DetalleCompraRepository.crearDetalleCompra({
            cantidad: detalle.cantidadDisponible,
            precio: detalle.precioUnitario, // Este podría ser el precio de compra o venta
            id_compraProveedor: compraId,
            id_medicamento: medicamento.id_medicamento
        });
        console.log("detalleCompra", detalleCompra);

        // Actualizar relación MedicamentoProveedor
        const medicamentoProveedor = await medicamentoProveedorRepository.findOrCreate({
            id_medicamento: medicamento.id_medicamento,
            id_proveedor: idProveedor
        });
        console.log("MedicamentoProveedor", medicamentoProveedor);
    }
};

