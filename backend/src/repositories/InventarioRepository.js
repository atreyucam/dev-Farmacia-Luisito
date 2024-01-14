
const {Inventario} = require('../models/db_models');

class InventarioRepository{
    async crearInventario(usuarioData){
        return await Inventario.create(usuarioData);
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
}

module.exports = new InventarioRepository();