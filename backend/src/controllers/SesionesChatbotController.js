const SesionModel = require('../repositories/SesionChatRepository');

class SesionController{
    async crearSesion(req, res){
        try {
            const sesion = await SesionModel.crearSesion(req.body);
            res.status(201).json(sesion);  
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async obtenerSesiones(req, res){
        try {
            const sesion = await SesionModel.obtenerSesiones();
            res.status(200).json(sesion);  
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async obtenerSesionesporId(req, res){
        try {
            const sesion = await SesionModel.obtenerSesionesporId(req.params.id);
            if(sesion){
                res.status(200).json(sesion);  
            } else{
                res.status(404).json({message: 'sesion no encontrado'});
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async actualizarSesion(req, res){
        try {
            const sesion = await SesionModel.actualzarSesion(req.params.id, req.body);
            if(sesion){
                res.status(200).json({message: 'sesion actualizado'});  
            } else{
                res.status(404).json({message: 'sesion no encontrado'});
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async eliminarSesion(req, res){
        try {
            const sesion = await SesionModel.eliminarSesion(req.params.id);
            if(sesion){
                res.status(200).json({message: 'sesion eliminado'});  
            } else{
                res.status(404).json({message: 'sesion no encontrado'});
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }
}

module.exports = new SesionController();
