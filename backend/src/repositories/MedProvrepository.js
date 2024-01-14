
const {MedicamentoProveedor} = require('../models/db_models');

class MedProv_Repository{
    async crearMedProv(usuarioData){
        return await MedicamentoProveedor.create(usuarioData);
    }

    async obtenerAll_MedProv(){
        return await MedicamentoProveedor.findAll();
    }

    async obtenerMedProvporId(id){
        return await MedicamentoProveedor.findByPk(id);
    }

    async actualizarMedProv(id, usuarioData){
        return await MedicamentoProveedor.update(usuarioData, {where: {id_medicamentoProveedor: id}});
    }

    async eliminarMedProv(id){
        return await MedicamentoProveedor.destroy({where: {id_medicamentoProveedor:id}});
    }
}

module.exports = new MedProv_Repository();