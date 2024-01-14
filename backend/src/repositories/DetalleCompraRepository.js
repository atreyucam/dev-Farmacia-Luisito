
const {DetalleCompra} = require('../models/db_models');

class DetalleCompraRepository{
    async crearDetalleCompra(usuarioData){
        return await DetalleCompra.create(usuarioData);
    }

    async obtenerAllDetalleCompras(){
        return await DetalleCompra.findAll();
    }

    async obtenerDetalleCompraporId(id){
        return await DetalleCompra.findByPk(id);
    }

    async actualzarDetalleCompra(id, usuarioData){
        return await DetalleCompra.update(usuarioData, {where: {id_detalleCompra: id}});
    }

    async eliminarDetalleCompra(id){
        return await DetalleCompra.destroy({where: {id_detalleCompra:id}});
    }
}

module.exports = new DetalleCompraRepository();