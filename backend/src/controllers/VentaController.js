const VentaModel = require('../repositories/ventasRepository');
const detalleVentaRepository = require('../repositories/DetalleVentaRepository');
const usuarioRepository = require('../repositories/UsuarioRepository');
const medicamentoRepository = require('../repositories/MedicamentoRepository');
const inventarioRepository = require('../repositories/InventarioRepository');


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
    async obtenerVentaporId(req, res) {
        try {
            const idVenta = req.params.id; // Obtiene el ID de la venta desde los parámetros de la ruta
    
            // Obtener la venta
            const venta = await VentaModel.obtenerVentaporId(idVenta);
            if (!venta) {
                return res.status(404).json({ message: 'Venta no encontrada' });
            }
    
            // Obtener detalles de la venta
            const detallesVenta = await detalleVentaRepository.obtenerDetalleVentaporId(idVenta);
    
            // Opcionalmente, obtener información del cliente
            const cliente = await usuarioRepository.obtenerUsuarioporId(venta.id_usuario);
    
            res.status(200).json({
                cliente: cliente,
                venta: venta,
                detallesVenta: detallesVenta
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
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
                const medicamento = await medicamentoRepository.obtenerMedicamentoporId(item.idMedicamento);
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
                const medicamento = await medicamentoRepository.obtenerMedicamentoporId(item.idMedicamento);
                const inventario = await inventarioRepository.obtenerLoteProximoCaducar(item.idMedicamento);

                if (!inventario || inventario.cantidadDisponible < item.cantidad) {
                    return res.status(400).json({ message: `Stock insuficiente para el medicamento ${medicamento.nombreMedicamento}` });
                }

                // Guardar los detalles para la respuesta
                detallesRespuesta.push({
                    idMedicamento: item.idMedicamento,
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


}

module.exports = new VentaController();
