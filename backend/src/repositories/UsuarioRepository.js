
const {Usuario} = require('../models/db_models');

class UsuarioRepository{
    async crearUsuario(usuarioData){
        return await Usuario.create(usuarioData);
    }

    async obtenerUsuarios(){
        return await Usuario.findAll();
    }

    async obtenerUsuarioporId(id){
        return await Usuario.findByPk(id);
    }

    async actualzarUsuario(id, usuarioData){
        return await Usuario.update(usuarioData, {where: {id_usuario: id}});
    }

    async eliminarUsuario(id){
        return await Usuario.destroy({where: {id_usuario:id}});
    }
}

module.exports = new UsuarioRepository();