
const {SesionChatbot} = require('../models/db_models');

class SesionChatRepository{
    async crearSesion(usuarioData){
        return await SesionChatbot.create(usuarioData);
    }

    async obtenerSesiones(){
        return await SesionChatbot.findAll();
    }

    async obtenerSesionesporId(id){
        return await SesionChatbot.findByPk(id);
    }

    async actualzarSesion(id, usuarioData){
        return await SesionChatbot.update(usuarioData, {where: {id_sesionChatbot: id}});
    }

    async eliminarSesion(id){
        return await SesionChatbot.destroy({where: {id_sesionChatbot:id}});
    }
}

module.exports = new SesionChatRepository();