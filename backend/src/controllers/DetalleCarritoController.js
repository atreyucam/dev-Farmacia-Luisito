const DetalleCarritoModel = require('../repositories/DetalleCarritoRepository');

class DetalleCarritoCompraController{
    async crearDetalleCarrito(req, res){
        try {
            const carrito = await DetalleCarritoModel.crearDetalleCarrito(req.body);
            res.status(201).json(carrito);  
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async obtenerDetalleCarritos(req, res){
        try {
            const carrito = await DetalleCarritoModel.obtenerDetalleCarritos();
            res.status(200).json(carrito);  
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async obtenerDetalleCarritoporId(req, res){
        try {
            const carrito = await DetalleCarritoModel.obtenerDetalleCarritoporId(req.params.id);
            if(carrito){
                res.status(200).json(carrito);  
            } else{
                res.status(404).json({message: 'detalle carrito no encontrado'});
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async actualzarDetalleCarrito(req, res){
        try {
            const carrito = await DetalleCarritoModel.actualzarDetalleCarrito(req.params.id, req.body);
            if(carrito){
                res.status(200).json({message: 'detalle carrito actualizado'});  
            } else{
                res.status(404).json({message: 'detalle carrito no encontrado'});
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async eliminarDetalleCarrito(req, res){
        try {
            const carrito = await DetalleCarritoModel.eliminarDetalleCarrito(req.params.id);
            if(carrito){
                res.status(200).json({message: 'detalle carrito eliminado'});  
            } else{
                res.status(404).json({message: 'detalle carrito no encontrado'});
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }
}

module.exports = new DetalleCarritoCompraController();
