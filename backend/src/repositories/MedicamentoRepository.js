
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

    // Metodo nuevo
    async findOrCreate(data) {
        const [medicamento, created] = await Medicamento.findOrCreate({
            where: { nombreMedicamento: data.nombre },
            defaults: { 
                nombreMedicamento: data.nombre,
                // descripcion: data.descripcion, no le veo util para tu app. se te simplifica ♥
                precioVenta: data.precioVenta,
                exentoIVA: data.exentoIVA,
                // otros campos si quieres.
            }
        });
        return medicamento; // Retorna el medicamento encontrado o creado
    }
}

module.exports = new MedicamentoRepository();