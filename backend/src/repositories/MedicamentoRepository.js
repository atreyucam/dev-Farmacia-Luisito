
const {Medicamento} = require('../models/db_models');

class MedicamentoRepository{
    async crearMedicamento(usuarioData){
        return await Medicamento.create(usuarioData);
    }

    async obtenerMedicamentos(){
        return await Medicamento.findAll();
    }

    async obtenerMedicamentoporId(id){
        return await Medicamento.findByPk(id);
    }

    async actualzarMedicamento(id, usuarioData){
        return await Medicamento.update(usuarioData, {where: {id_medicamento: id}});
    }

    async eliminarMedicamento(id){
        return await Medicamento.destroy({where: {id_medicamento:id}});
    }
}

module.exports = new MedicamentoRepository();