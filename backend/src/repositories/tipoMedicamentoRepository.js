
const {TipoMedicamento} = require('../models/db_models');

class TipoMedicamentoRepository{
    async crearTipoMedicamento(usuarioData){
        return await TipoMedicamento.create(usuarioData);
    }

    async obtenerTipoMedicamentos(){
        return await TipoMedicamento.findAll();
    }

    async obtenerTipoMedicamentoporId(id){
        return await TipoMedicamento.findByPk(id);
    }

    async actualzarTipoMedicamento(id, usuarioData){
        return await TipoMedicamento.update(usuarioData, {where: {id_tipoMedicamento: id}});
    }

    async eliminarTipoMedicamento(id){
        return await TipoMedicamento.destroy({where: {id_tipoMedicamento:id}});
    }
}

module.exports = new TipoMedicamentoRepository();