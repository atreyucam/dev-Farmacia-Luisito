
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

    // Nuevo metodo
    async buscarOcrear(data){
        const [tipoMed, creado] = await TipoMedicamento.findOrCreate({
            where:{descripcionTipo: data.descripcionTipo},
            defaults: data
        });
        return tipoMed;
    }
    // Método para buscar un tipo de medicamento por su nombre
    async buscarPorNombre(nombreTipo) {
        return await TipoMedicamento.findOne({
            where: { descripcionTipo: nombreTipo }
    });
}
}

module.exports = new TipoMedicamentoRepository();