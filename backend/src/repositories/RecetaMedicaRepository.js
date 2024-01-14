
const {RecetaMedica} = require('../models/db_models');

class RecetaMedicaRepository{
    async crearRecetaMedica(usuarioData){
        return await RecetaMedica.create(usuarioData);
    }

    async obtenerRecetasMedicas(){
        return await RecetaMedica.findAll();
    }

    async obtenerRecetaMedicaporId(id){
        return await RecetaMedica.findByPk(id);
    }

    async actualzarRecetaMedica(id, usuarioData){
        return await RecetaMedica.update(usuarioData, {where: {id_receta: id}});
    }

    async eliminarRecetaMedica(id){
        return await RecetaMedica.destroy({where: {id_receta:id}});
    }
}

module.exports = new RecetaMedicaRepository();