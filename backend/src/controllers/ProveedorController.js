const ProveedorModel = require('../repositories/ProveedorRepository');

class ProveedorController{
    async crearProveedor(req, res){
        try {
            const proveedor = await ProveedorModel.crearProveedor(req.body);
            res.status(201).json(proveedor);  
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async obtenerProveedores(req, res){
        try {
            const proveedor = await ProveedorModel.obtenerProveedores();
            res.status(200).json(proveedor);  
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async obtenerProveedorporId(req, res){
        try {
            const proveedor = await ProveedorModel.obtenerProveedorporId(req.params.id);
            if(proveedor){
                res.status(200).json(proveedor);  
            } else{
                res.status(404).json({message: 'proveedor no encontrado'});
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async actualizarProveedor(req, res){
        try {
            const proveedor = await ProveedorModel.actualizarProveedor(req.params.id, req.body);
            if(proveedor){
                res.status(200).json({message: 'proveedor actualizado'});  
            } else{
                res.status(404).json({message: 'proveedor no encontrado'});
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async eliminarProveedor(req, res){
        try {
            const proveedor = await ProveedorModel.eliminarProveedor(req.params.id);
            if(proveedor){
                res.status(200).json({message: 'proveedor eliminado'});  
            } else{
                res.status(404).json({message: 'proveedor no encontrado'});
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }
}

module.exports = new ProveedorController();
