const CompraModel = require('../repositories/CompraProveedoresRepository');

class CompraProveedorController{
    async crearCompra(req, res){
        try {
            const compra = await CompraModel.crearCompra(req.body);
            res.status(201).json(compra);  
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async obtenerCompras(req, res){
        try {
            const compra = await CompraModel.obtenerCompras();
            res.status(200).json(compra);  
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async obtenerCompraporId(req, res){
        try {
            const compra = await CompraModel.obtenerCompraporId(req.params.id);
            if(compra){
                res.status(200).json(compra);  
            } else{
                res.status(404).json({message: 'compra no encontrado'});
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async actualizarCompra(req, res){
        try {
            const compra = await CompraModel.actualzarCompra(req.params.id, req.body);
            if(compra){
                res.status(200).json({message: 'compra actualizado'});  
            } else{
                res.status(404).json({message: 'compra no encontrado'});
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async eliminarCompra(req, res){
        try {
            const compra = await CompraModel.eliminarCompra(req.params.id);
            if(compra){
                res.status(200).json({message: 'compra eliminado'});  
            } else{
                res.status(404).json({message: 'compra no encontrado'});
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }
}

module.exports = new CompraProveedorController();
