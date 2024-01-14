const RolModel = require('../repositories/RolRepository');

class RolController{
    async crearRol(req, res){
        try {
            const rol = await RolModel.crearRol(req.body);
            res.status(201).json(rol);  
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async obtenerRoles(req, res){
        try {
            const rol = await RolModel.obtenerRoles();
            res.status(200).json(rol);  
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async obtenerRolesporId(req, res){
        try {
            const rol = await RolModel.obtenerRolporId(req.params.id);
            if(rol){
                res.status(200).json(rol);  
            } else{
                res.status(404).json({message: 'Rol no encontrado'});
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async actualizarRol(req, res){
        try {
            const rol = await RolModel.actualzarRol(req.params.id, req.body);
            if(rol){
                res.status(200).json({message: 'Rol actualizado'});  
            } else{
                res.status(404).json({message: 'Rol no encontrado'});
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async eliminarRol(req, res){
        try {
            const rol = await RolModel.eliminarRol(req.params.id);
            if(rol){
                res.status(200).json({message: 'Rol eliminado'});  
            } else{
                res.status(404).json({message: 'Rol no encontrado'});
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }
}

module.exports = new RolController();
