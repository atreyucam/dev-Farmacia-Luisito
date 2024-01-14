const DetalleCompraModel = require('../repositories/DetalleCompraRepository');

class DetalleCompraController{
    async crearDetalleCompra(req, res){
        try {
            const detalleCompra = await DetalleCompraModel.crearDetalleCompra(req.body);
            res.status(201).json(detalleCompra);  
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async obtenerAllDetalleCompras(req, res){
        try {
            const detalleCompra = await DetalleCompraModel.obtenerAllDetalleCompras();
            res.status(200).json(detalleCompra);  
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async obtenerDetalleCompraporId(req, res){
        try {
            const detalleCompra = await DetalleCompraModel.obtenerDetalleCompraporId(req.params.id);
            if(detalleCompra){
                res.status(200).json(detalleCompra);  
            } else{
                res.status(404).json({message: 'detalle compra no encontrado'});
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async actualizarDetalleCompra(req, res){
        try {
            const detalleCompra = await DetalleCompraModel.actualzarDetalleCompra(req.params.id, req.body);
            if(detalleCompra){
                res.status(200).json({message: 'detalle compra actualizado'});  
            } else{
                res.status(404).json({message: 'detalle compra no encontrado'});
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async eliminarDetalleCompra(req, res){
        try {
            const detalleCompra = await DetalleCompraModel.eliminarDetalleCompra(req.params.id);
            if(detalleCompra){
                res.status(200).json({message: 'detalle compra eliminado'});  
            } else{
                res.status(404).json({message: 'detalle compra no encontrado'});
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }
}

module.exports = new DetalleCompraController();
