const path = require('path');
const fs = require('fs');
const PDFDocument = require('pdfkit');

const VentaModel = require('../repositories/ventasRepository');
const detalleVentaRepository = require('../repositories/DetalleVentaRepository');
const usuarioRepository = require('../repositories/UsuarioRepository');
const medicamentoRepository = require('../repositories/MedicamentoRepository');
const inventarioRepository = require('../repositories/InventarioRepository');
const AlertaRepository = require('../repositories/AlertasRepository');


class VentaController{
    // async crearVenta(req, res){
    //     try {
    //         const venta = await VentaModel.crearVenta(req.body);
    //         res.status(201).json(venta);  
    //     } catch (error) {
    //         res.status(500).json({error: error.message});
    //     }
    // }

    async obtenerVentas(req, res){
        try {
            const venta = await VentaModel.obtenerVentas();
            res.status(200).json(venta);  
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    // async obtenerVentaporId(req, res){
    //     try {
    //         const venta = await VentaModel.obtenerVentaporId(req.params.id);
    //         if(venta){
    //             res.status(200).json(venta);  
    //         } else{
    //             res.status(404).json({message: 'venta no encontrado'});
    //         }
    //     } catch (error) {
    //         res.status(500).json({error: error.message});
    //     }
    // }
    // async obtenerVentaporId(req, res) {
    //     try {
    //         const idVenta = req.params.id; // Obtiene el ID de la venta desde los parámetros de la ruta
    
    //         // Obtener la venta
    //         const venta = await VentaModel.obtenerVentaporId(idVenta);
    //         if (!venta) {
    //             return res.status(404).json({ message: 'Venta no encontrada' });
    //         }
    
    //         // Obtener detalles de la venta
    //         const detallesVenta = await detalleVentaRepository.obtenerDetalleVentaporId(idVenta);
    
    //         // Opcionalmente, obtener información del cliente
    //         const cliente = await usuarioRepository.obtenerUsuarioporId(venta.id_usuario);
    
    //         res.status(200).json({
    //             cliente: cliente,
    //             venta: venta,
    //             detallesVenta: detallesVenta
    //         });
    //     } catch (error) {
    //         res.status(500).json({ error: error.message });
    //     }
    // }

    async obtenerVentaporId(idVenta) {
        try {
            const venta = await VentaModel.obtenerVentaporId(idVenta);
            if (!venta) {
                return null; // Indica que no se encontró la venta
            }
            const detallesVenta = await detalleVentaRepository.obtenerDetalleVentaporId(idVenta);
            const cliente = await usuarioRepository.obtenerUsuarioporId(venta.id_usuario);

            // Obtener nombres de los medicamentos para cada detalle
            for (const detalle of detallesVenta) {
                const medicamento = await medicamentoRepository.obtenerMedicamentoporId(detalle.id_medicamento);
                detalle.nombreMedicamento = medicamento.nombreMedicamento; // Agregar el nombre al detalle
            }
            console.log(cliente);
            console.log(detallesVenta);
            console.log(venta);

            return {
                cliente: cliente,
                venta: venta,
                detallesVenta: detallesVenta
            };
        } catch (error) {
            console.error(error);
            throw new Error('Error al obtener los datos de la venta');
        }
    }
    

    async actualzarVenta(req, res){
        try {
            const venta = await VentaModel.actualzarVenta(req.params.id, req.body);
            if(venta){
                res.status(200).json({message: 'venta actualizado'});  
            } else{
                res.status(404).json({message: 'venta no encontrado'});
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async eliminarVenta(req, res){
        try {
            const venta = await VentaModel.eliminarVenta(req.params.id);
            if(venta){
                res.status(200).json({message: 'venta eliminado'});  
            } else{
                res.status(404).json({message: 'venta no encontrado'});
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async realizarVenta(req, res) {
        try {
            const { id_usuario, detallesVenta } = req.body; // Asume que se envía el ID del cliente y los detalles de venta

            // Validar y obtener datos del cliente
            const cliente = await usuarioRepository.obtenerUsuarioporId(id_usuario);
            if (!cliente) {
                return res.status(404).json({ message: 'Cliente no encontrado' });
            }

            // calculos subtotal, descuento, iva y total
            let subtotalVenta = 0;
            let descuentoVenta = 0;
            let IVA = 0;
            let totalVenta = 0;

            for (const item of detallesVenta) {
                const medicamento = await medicamentoRepository.obtenerMedicamentoporId(item.id_medicamento);
                subtotalVenta += medicamento.precioVenta * item.cantidad;
            }

            totalVenta = subtotalVenta - descuentoVenta;

            // Generar número de venta aleatorio
            const numeroVenta = Math.floor(Math.random() * 1000000);

            // Crear la venta
            const venta = await VentaModel.crearVenta({
                numFacturaVenta: numeroVenta,
                fechaVenta: new Date(),
                subtotalVenta, // dato
                descuentoVenta,
                IVA,
                totalVenta,
                id_usuario: cliente.id_usuario,
                // Agrega otros campos necesarios
            });

            // detalle Venta
            // 
            let detallesRespuesta = [];

            // Procesar detalles de la venta
            for (const item of detallesVenta) {
                const medicamento = await medicamentoRepository.obtenerMedicamentoporId(item.id_medicamento);
                const inventario = await inventarioRepository.obtenerLoteProximoCaducar(item.id_medicamento);

                if (!inventario || inventario.cantidadDisponible < item.cantidad) {
                    return res.status(400).json({ message: `Stock insuficiente para el medicamento ${medicamento.nombreMedicamento}` });
                }

                // Guardar los detalles para la respuesta
                detallesRespuesta.push({
                    id_medicamento: item.id_medicamento,
                    cantidad: item.cantidad,
                    precioUnitario: medicamento.precioVenta
                });

                // Crear detalle de venta
                await detalleVentaRepository.crearDetalleVenta({
                    id_venta: venta.id_venta,
                    id_medicamento: medicamento.id_medicamento,
                    cantidad: item.cantidad,
                    precio: medicamento.precioVenta,
                });

                // Actualizar inventario
                await inventarioRepository.actualizarCantidadDisponible(inventario.id_inventario, inventario.cantidadDisponible - item.cantidad);
                
                // Verificar la caducidad y el stock después de actualizar el inventario
                await AlertaRepository.verificarProductoCaducado(item.id_medicamento);
                await AlertaRepository.verificarCaducidad(item.id_medicamento);
                await AlertaRepository.verificarStock(item.id_medicamento);
                await AlertaRepository.verificarStockVacio(item.id_medicamento);

            }

            res.status(200).json({
                mensaje: "Venta realizada con éxito",
                datosVenta: {
                    cliente: cliente,
                    venta: venta,
                    detallesVenta: detallesRespuesta
                }
            });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }


    // Generacion de facturas PDF
    generarFacturaPDF = async (req, res) => {
        try {
            const idVenta = req.params.id; // ID de la venta
            // Obtener los datos de la venta, el cliente y los detalles de la venta
            // (Asumiendo que ya tienes métodos para obtener esta información)
            const venta = await this.obtenerVentaporId(idVenta);
            if (!venta) {
                return res.status(404).json({ message: 'Venta no encontrada' });
            }
            const cliente = venta.cliente;
            const ventaInfo = venta.venta;
            const detallesVenta = venta.detallesVenta;

            // Crear un nuevo documento PDF
            const doc = new PDFDocument();

            // Guardar el PDF en un archivo (podrías también almacenarlo en un buffer o stream)
            const facturaDir = path.join(__dirname, '../../../', 'facturas'); // Ajusta según la estructura de tu proyecto
            const filePath = path.join(facturaDir, `factura-${idVenta}.pdf`);
            // const filePath = path.join(facturaDir, `factura-${idVenta}.pdf`);
            // const filePath = `../facturas/factura-${idVenta}.pdf`;

            // Verifica si el directorio existe, si no, créalo
            if (!fs.existsSync(facturaDir)) {
                fs.mkdirSync(facturaDir, { recursive: true });
            }

              // Crear un stream de escritura
            const stream = fs.createWriteStream(filePath);
            doc.pipe(stream);

            // Agregar contenido al PDF
            doc.fontSize(25).text('Factura de Venta', { align: 'center' });
            doc.fontSize(10).text(`Fecha: ${ventaInfo.fechaVenta}`, { align: 'right' });
            doc.text(`Factura No.: ${ventaInfo.numFacturaVenta}`, { align: 'right' });
            doc.moveDown();
            doc.fontSize(15).text('Datos del Cliente');
            doc.fontSize(10).text(`Cédula: ${cliente.cedula}`);
            doc.fontSize(10).text(`Nombre: ${cliente.nombreUsuario}`);
            doc.text(`Dirección: ${cliente.direccion}`);
            doc.text(`Teléfono: ${cliente.telefono}`);
            doc.moveDown();

            // Definir columnas para la tabla de detalles
            const columnsDetalle = [
                { header: 'item', property: 'indice', width: 50 },
                { header: 'Detalle', property: 'nombreMedicamento', width: 200 },
                { header: 'Cantidad', property: 'cantidad', width: 100 },
                { header: 'Precio Unitario', property: 'precio', width: 150 }
            ];

            // Preparar datos para la tabla de detalles
            const rowsDetalle = detallesVenta.map((detalle, index) => ({
                indice: index + 1,
                nombreMedicamento: detalle.nombreMedicamento,
                cantidad: detalle.cantidad,
                precio: detalle.precio
            }));

            // Dibujar tabla de detalles
            drawTable(doc, rowsDetalle, columnsDetalle, 50, 225); // Ajusta la posición según sea necesario



            // // Agregar detalles de la venta
            // doc.fontSize(15).text('Detalles de la Venta');
            // detallesVenta.forEach((detalle, index) => {
            //     doc.fontSize(10).text(`${index + 1}. Medicamento: ${detalle.nombreMedicamento}, Cantidad: ${detalle.cantidad}, Precio: ${detalle.precio}`);
            // });

            // Tabla de totales
            const columnsTotales = [
                { header: '', property: 'concepto', width: 75 },
                { header: '', property: 'valor', width: 75 }
            ];

            // Preparar datos para la tabla de totales
            const rowsTotales = [
                { concepto: 'Subtotal', valor: ventaInfo.subtotalVenta },
                { concepto: 'IVA', valor: ventaInfo.IVA },
                { concepto: 'Descuento', valor: ventaInfo.descuentoVenta },
                { concepto: 'Total', valor: ventaInfo.totalVenta }
            ];

            // Dibujar tabla de totales alineada a la derecha
            drawTable(doc, rowsTotales, columnsTotales, 362, doc.y+5); // Ajusta la posición según sea necesario


            // doc.moveDown();
            // doc.text(`Subtotal: ${ventaInfo.subtotalVenta}`);
            // doc.text(`IVA: ${ventaInfo.IVA}`);
            // doc.text(`Descuento: ${ventaInfo.descuentoVenta}`);
            // doc.text(`Total: ${ventaInfo.totalVenta}`, { align: 'right' });

            // Finalizar el PDF y cerrar el archivo
            doc.end();

             // Esperar a que el archivo se escriba completamente antes de enviarlo
            stream.on('finish', function() {
                res.sendFile(filePath);
            });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }


}

function drawTable(doc, rows, columns, startX, startY) {
    let i;
    const columnWidths = columns.map(col => col.width);
    const tableTop = startY;
    const rowHeight = 20;

    // Dibujar cabecera
    doc.fontSize(10).font('Helvetica-Bold');
    let currentX = startX;
    columns.forEach((col, i) => {
        doc.text(col.header, currentX, tableTop, { width: columnWidths[i], align: 'center'});
        currentX += columnWidths[i];
    });

    doc.font('Helvetica'); // Cambiar de nuevo a fuente normal

    // Dibujar filas
    for (i = 0; i < rows.length; i++) {
        const item = rows[i];
        let position = tableTop + (i + 1) * rowHeight;
        currentX = startX;
        columns.forEach((col, index) => {
            doc.text(item[col.property], currentX, position, { width: columnWidths[index], align: 'center' });
            currentX += columnWidths[index];
        });
    }
}





module.exports = new VentaController();
