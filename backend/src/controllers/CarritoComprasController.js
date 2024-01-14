const CarritoModel = require('../repositories/CarritoComprasRepository');

class CarritoCompraController{
    async crearCarrito(req, res){
        try {
            const carrito = await CarritoModel.crearCarrito(req.body);
            res.status(201).json(carrito);  
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async obtenerCarritos(req, res){
        try {
            const carrito = await CarritoModel.obtenerCarritos();
            res.status(200).json(carrito);  
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async obtenerCarritoporId(req, res){
        try {
            const carrito = await CarritoModel.obtenerCarritoporId(req.params.id);
            if(carrito){
                res.status(200).json(carrito);  
            } else{
                res.status(404).json({message: 'carrito no encontrado'});
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async actualzarCarrito(req, res){
        try {
            const carrito = await CarritoModel.actualzarCarrito(req.params.id, req.body);
            if(carrito){
                res.status(200).json({message: 'carrito actualizado'});  
            } else{
                res.status(404).json({message: 'carrito no encontrado'});
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async eliminarCarrito(req, res){
        try {
            const carrito = await CarritoModel.eliminarCarrito(req.params.id);
            if(carrito){
                res.status(200).json({message: 'carrito eliminado'});  
            } else{
                res.status(404).json({message: 'carrito no encontrado'});
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }
}

module.exports = new CarritoCompraController();
