
const {Configuracion} = require('../models/db_models');

class ConfiguracionRepository{
    async crearConfiguracion(usuarioData){
        return await Configuracion.create(usuarioData);
    }

    async obtenerConfiguraciones(){
        return await Configuracion.findAll();
    }

    async obtenerConfiguracionporId(id){
        return await Configuracion.findByPk(id);
    }

    async actualzarConfiguracion(id, usuarioData){
        return await Configuracion.update(usuarioData, {where: {id_configuracion: id}});
    }

    async eliminarConfiguracion(id){
        return await Configuracion.destroy({where: {id_configuracion:id}});
    }
}

module.exports = new ConfiguracionRepository();