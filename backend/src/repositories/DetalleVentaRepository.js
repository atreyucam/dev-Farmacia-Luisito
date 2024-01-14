
const {DetalleVenta} = require('../models/db_models');

class DetalleVentaRepository{
    async crearDetalleVenta(usuarioData){
        return await DetalleVenta.create(usuarioData);
    }

    async obtenerDetallesVentas(){
        return await DetalleVenta.findAll();
    }

    async obtenerDetalleVentaporId(id){
        return await DetalleVenta.findByPk(id);
    }

    async actualzarDetalleVenta(id, usuarioData){
        return await DetalleVenta.update(usuarioData, {where: {id_detalleVenta: id}});
    }

    async eliminarDetalleVenta(id){
        return await DetalleVenta.destroy({where: {id_detalleVenta:id}});
    }
}

module.exports = new DetalleVentaRepository();