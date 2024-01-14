const VentaModel = require('../repositories/ventasRepository');

class VentaController{
    async crearVenta(req, res){
        try {
            const venta = await VentaModel.crearVenta(req.body);
            res.status(201).json(venta);  
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async obtenerVentas(req, res){
        try {
            const venta = await VentaModel.obtenerVentas();
            res.status(200).json(venta);  
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async obtenerVentaporId(req, res){
        try {
            const venta = await VentaModel.obtenerVentaporId(req.params.id);
            if(venta){
                res.status(200).json(venta);  
            } else{
                res.status(404).json({message: 'venta no encontrado'});
            }
        } catch (error) {
            res.status(500).json({error: error.message});
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
}

module.exports = new VentaController();
