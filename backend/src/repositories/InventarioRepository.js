
const {Inventario} = require('../models/db_models');

class InventarioRepository{
    async crearInventario(data){
        // Verificar si ya existe un lote con el mismo número
        const loteExistente = await Inventario.findOne({ where: { numeroLote: data.numeroLote } });
        if (loteExistente) {
            throw new Error(`Lote con número ${data.numeroLote} ya existe`);
        }

        return await Inventario.create(data);
    }

    async obtenerTodoInventario(){
        return await Inventario.findAll();
    }

    async obtenerInventarioporId(id){
        return await Inventario.findByPk(id);
    }

    async actualzarInventario(id, usuarioData){
        return await Inventario.update(usuarioData, {where: {id_inventario: id}});
    }

    async eliminarInventario(id){
        return await Inventario.destroy({where: {id_inventario:id}});
    }

    // Nuevo metodo
    async obtenerLoteProximoCaducar(idMedicamento) {
        return await Inventario.findOne({
            where: { id_medicamento: idMedicamento },
            order: [['fechaCaducidad', 'ASC']],
            limit: 1
        });
    }

    async actualizarCantidadDisponible(id, cantidad) {
        return await Inventario.update({ cantidadDisponible: cantidad }, { where: { id_inventario: id } });
    }
}

module.exports = new InventarioRepository();