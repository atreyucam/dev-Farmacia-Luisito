
const {ControlARCSA} = require('../models/db_models');

class ControlARCSARepository{
    async crearControl(usuarioData){
        return await ControlARCSA.create(usuarioData);
    }

    async obtenerControles(){
        return await ControlARCSA.findAll();
    }

    async obtenerControlporId(id){
        return await ControlARCSA.findByPk(id);
    }

    async actualizarControl(id, usuarioData){
        return await ControlARCSA.update(usuarioData, {where: {id_controlARCSA: id}});
    }

    async eliminarControl(id){
        return await ControlARCSA.destroy({where: {id_controlARCSA:id}});
    }
}

module.exports = new ControlARCSARepository();