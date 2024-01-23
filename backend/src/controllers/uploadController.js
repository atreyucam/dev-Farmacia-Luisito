// controllers/uploadController.js

const xlsx = require('xlsx');
const fs = require('fs');
const ProveedorRepository = require('../repositories/ProveedorRepository');
const CompraRepository = require('../repositories/CompraProveedoresRepository');
const DetalleCompraRepository = require('../repositories/DetalleCompraRepository');
const MedicamentoRepository = require('../repositories/MedicamentoRepository');
const InventarioRepository = require('../repositories/InventarioRepository');

exports.importarDatos = async (req, res) => {
    try {
        // Cargar el libro de Excel
        const workbook = xlsx.readFile(req.file.path);
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });

        // Procesar datos del proveedor
        const proveedorData = extractProveedorData(data);
        console.log("Datos del proveedor extraídos:", proveedorData);
        if (!proveedorData.ruc || !proveedorData.nombreProveedor || !proveedorData.direccion || !proveedorData.telefono || !proveedorData.emailProveedor) {
            return res.status(400).send('Datos incompletos del proveedor en el archivo Excel');
        }
        const proveedor = await ProveedorRepository.buscarOcrear(proveedorData);
        console.log("Proveedor creado o encontrado:", proveedor);

        // Procesar datos de la compra
        const compraData = extractCompraData(data, proveedor.id);
        console.log("Datos del compra extraídos:", compraData);
        const compra = await CompraRepository.crearCompra(compraData);

        // Procesar detalles de productos
        const detallesCompraData = extractDetallesCompraData(data);
        await processDetallesCompra(detallesCompraData, compra.id);

        // Eliminar el archivo Excel después de procesarlo
        fs.unlinkSync(req.file.path);
        
        res.status(200).send('Datos importados con éxito');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const extractProveedorData = (data) => ({
    ruc: data[0][1],  //[fila][columna]
    nombreProveedor: data[1][1],
    direccion: data[2][1],
    telefono: data[3][1],
    emailProveedor: data[4][1],
});


const extractCompraData = (data, proveedorId) => ({
    fecha: data[6][1],
    factura: data[7][1],
    subtotal: data[9][1],
    descuento: data[10][1],
    iva: data[11][1],
    total: data[12][1],
    proveedorId
});

const extractDetallesCompraData = (data) => {
    const startIndex = 17; 
    const detalles = [];
    for (let i = startIndex; i < data.length; i++) {
        if (data[i] && data[i][1]) { 
            detalles.push({
                item: data[i][1],
                lote: data[i][2],
                nombre: data[i][3],
                tipo: data[i][4],
                cantidad: data[i][6],
                fechaCaducidad: data[i][7],
                precioUnitario: data[i][8],
                precioTotal: data[i][9]
            });
        }
    }
    return detalles;
};

const processDetallesCompra = async (detallesCompraData, compraId) => {
    for (const detalle of detallesCompraData) {
        // Buscar o crear el medicamento
        const medicamento = await MedicamentoRepository.findOrCreate({
            nombre: detalle.nombre,
            tipo: detalle.tipo
        });

        // Crear un nuevo lote en el inventario
        await InventarioRepository.crearInventario({
            medicamentoId: medicamento.id,
            lote: detalle.lote,
            cantidad: detalle.cantidad,
            fechaCaducidad: detalle.fechaCaducidad
        });

        // Crear un nuevo detalle de compra
        await DetalleCompraRepository.crearDetalleCompra({
            compraId,
            medicamentoId: medicamento.id,
            cantidad: detalle.cantidad,
            precioUnitario: detalle.precioUnitario
        });
    }
};

