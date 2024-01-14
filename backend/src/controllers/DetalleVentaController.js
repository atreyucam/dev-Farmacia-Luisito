const DetalleVentaModel = require('../repositories/DetalleVentaRepository');

class DetalleVentaController{
    async crearDetalleVenta(req, res){
        try {
            const venta = await DetalleVentaModel.crearDetalleVenta(req.body);
            res.status(201).json(venta);  
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async obtenerDetallesVentas(req, res){
        try {
            const venta = await DetalleVentaModel.obtenerDetallesVentas();
            res.status(200).json(venta);  
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async obtenerDetalleVentaporId(req, res){
        try {
            const venta = await DetalleVentaModel.obtenerDetalleVentaporId(req.params.id);
            if(venta){
                res.status(200).json(venta);  
            } else{
                res.status(404).json({message: 'detalle venta no encontrado'});
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async actualzarDetalleVenta(req, res){
        try {
            const venta = await DetalleVentaModel.actualzarDetalleVenta(req.params.id, req.body);
            if(venta){
                res.status(200).json({message: 'detalle venta actualizado'});  
            } else{
                res.status(404).json({message: 'detalle venta no encontrado'});
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async eliminarDetalleVenta(req, res){
        try {
            const venta = await DetalleVentaModel.eliminarDetalleVenta(req.params.id);
            if(venta){
                res.status(200).json({message: 'detalle venta eliminado'});  
            } else{
                res.status(404).json({message: 'detalle venta no encontrado'});
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }
}

module.exports = new DetalleVentaController();
