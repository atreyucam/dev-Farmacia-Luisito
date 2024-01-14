
const {DetalleCarrito} = require('../models/db_models');

class DetalleCarritoRepository{
    async crearDetalleCarrito(usuarioData){
        return await DetalleCarrito.create(usuarioData);
    }

    async obtenerDetalleCarritos(){
        return await DetalleCarrito.findAll();
    }

    async obtenerDetalleCarritoporId(id){
        return await DetalleCarrito.findByPk(id);
    }

    async actualzarDetalleCarrito(id, usuarioData){
        return await DetalleCarrito.update(usuarioData, {where: {id_detalleCarrito: id}});
    }

    async eliminarDetalleCarrito(id){
        return await DetalleCarrito.destroy({where: {id_detalleCarrito:id}});
    }
}

module.exports = new DetalleCarritoRepository();