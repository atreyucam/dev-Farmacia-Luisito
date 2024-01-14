
const {Alerta} = require('../models/db_models');

class AlertaRepository{
    async crearAlerta(usuarioData){
        return await Alerta.create(usuarioData);
    }

    async obtenerAlertas(){
        return await Alerta.findAll();
    }

    async obtenerAlertaporId(id){
        return await Alerta.findByPk(id);
    }

    async actualzarAlerta(id, usuarioData){
        return await Alerta.update(usuarioData, {where: {id_alerta: id}});
    }

    async eliminarAlerta(id){
        return await Alerta.destroy({where: {id_alerta:id}});
    }
}

module.exports = new AlertaRepository();