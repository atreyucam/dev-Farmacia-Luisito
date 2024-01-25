
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

    // nuevo Metodo
    async findOrCreate(medicamentoProveedorData) {
        const [medicamentoProveedor, created] = await MedicamentoProveedor.findOrCreate({
            where: {
                id_medicamento: medicamentoProveedorData.id_medicamento,
                id_proveedor: medicamentoProveedorData.id_proveedor
            },
            defaults: medicamentoProveedorData
        });
        return medicamentoProveedor; // Retorna el registro encontrado o creado
    }
}

module.exports = new MedProv_Repository();