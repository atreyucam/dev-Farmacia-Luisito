const MensajeModel = require('../repositories/MensajesChatRepository');

class MensajeChatController{
    async crearMensaje(req, res){
        try {
            const mesnsaje = await MensajeModel.crearMensaje(req.body);
            res.status(201).json(mesnsaje);  
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async obtenerMensajes(req, res){
        try {
            const mesnsaje = await MensajeModel.obtenerMensajes();
            res.status(200).json(mesnsaje);  
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async obtenerMensajesporId(req, res){
        try {
            const mesnsaje = await MensajeModel.obtenerMensajesporId(req.params.id);
            if(mesnsaje){
                res.status(200).json(mesnsaje);  
            } else{
                res.status(404).json({message: 'mesnsaje no encontrado'});
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async actualizarMensaje(req, res){
        try {
            const mesnsaje = await MensajeModel.actualizarMensaje(req.params.id, req.body);
            if(mesnsaje){
                res.status(200).json({message: 'mesnsaje actualizado'});  
            } else{
                res.status(404).json({message: 'mesnsaje no encontrado'});
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async eliminarMensaje(req, res){
        try {
            const mesnsaje = await MensajeModel.eliminarMensaje(req.params.id);
            if(mesnsaje){
                res.status(200).json({message: 'mesnsaje eliminado'});  
            } else{
                res.status(404).json({message: 'mesnsaje no encontrado'});
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }
}

module.exports = new MensajeChatController();
