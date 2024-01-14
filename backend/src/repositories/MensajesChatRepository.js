
const {MensajesChatbot} = require('../models/db_models');

class MensajesChatRepository{
    async crearMensaje(usuarioData){
        return await MensajesChatbot.create(usuarioData);
    }

    async obtenerMensajes(){
        return await MensajesChatbot.findAll();
    }

    async obtenerMensajesporId(id){
        return await MensajesChatbot.findByPk(id);
    }

    async actualizarMensaje(id, usuarioData){
        return await MensajesChatbot.update(usuarioData, {where: {id_mensaje: id}});
    }

    async eliminarMensaje(id){
        return await MensajesChatbot.destroy({where: {id_mensaje:id}});
    }
}

module.exports = new MensajesChatRepository();