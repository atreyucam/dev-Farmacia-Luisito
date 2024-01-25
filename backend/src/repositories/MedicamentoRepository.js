
const {Medicamento} = require('../models/db_models');
const configuracion = require('../controllers/ConfiguracionController');

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
            where: { nombreMedicamento: data.nombreMedicamento },
            defaults: data
        });
        return medicamento; // Retorna el medicamento encontrado o creado
    }

    async calcularPrecioVenta(precioCompra) {
        const margenGanancia = await configuracion.obtenerMargenGanancia();
        if (margenGanancia !== null) {
            return precioCompra + (precioCompra * margenGanancia / 100);
        }
        return precioCompra;
    }

    async actualizarPrecioVentaMedicamento(idMedicamento, precioCompra) {
        const precioVenta = await this.calcularPrecioVenta(precioCompra);
        await Medicamento.update({ precioVenta }, { where: { id_medicamento: idMedicamento }});
    }
    
    
}

module.exports = new MedicamentoRepository();