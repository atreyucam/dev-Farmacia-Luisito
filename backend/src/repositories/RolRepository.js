
const {Rol} = require('../models/db_models');

class RolRepository{
    async crearRol(usuarioData){
        return await Rol.create(usuarioData);
    }

    async obtenerRoles(){
        return await Rol.findAll();
    }

    async obtenerRolporId(id){
        return await Rol.findByPk(id);
    }

    async actualzarRol(id, usuarioData){
        return await Rol.update(usuarioData, {where: {id_rol: id}});
    }

    async eliminarRol(id){
        return await Rol.destroy({where: {id_rol:id}});
    }
}

module.exports = new RolRepository();