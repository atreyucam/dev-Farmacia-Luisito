const InventarioModel = require('../repositories/InventarioRepository');

class InventarioController{
    async crearInventario(req, res){
        try {
            const inventario = await InventarioModel.crearInventario(req.body);
            res.status(201).json(inventario);  
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async listarInventario(req, res){
        try {
            const inventario = await InventarioModel.obtenerTodoInventario();
            res.status(200).json(inventario);  
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async obtenerInventarioporId(req, res){
        try {
            const inventario = await InventarioModel.obtenerInventarioporId(req.params.id);
            if(inventario){
                res.status(200).json(inventario);  
            } else{
                res.status(404).json({message: 'inventario no encontrado'});
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async actualzarInventario(req, res){
        try {
            const inventario = await InventarioModel.actualzarInventario(req.params.id, req.body);
            if(inventario){
                res.status(200).json({message: 'inventario actualizado'});  
            } else{
                res.status(404).json({message: 'inventario no encontrado'});
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async eliminarInventario(req, res){
        try {
            const inventario = await InventarioModel.eliminarInventario(req.params.id);
            if(inventario){
                res.status(200).json({message: 'inventario eliminado'});  
            } else{
                res.status(404).json({message: 'inventario no encontrado'});
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }
}

module.exports = new InventarioController();
