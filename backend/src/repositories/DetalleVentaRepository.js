
const {DetalleVenta} = require('../models/db_models');

class DetalleVentaRepository{
    async crearDetalleVenta(usuarioData){
        return await DetalleVenta.create(usuarioData);
    }

    async obtenerDetallesVentas(){
        return await DetalleVenta.findAll();
    }

    async obtenerDetalleVentaporId(idVenta) {
        try {
            const detallesVenta = await DetalleVenta.findAll({
                where: { id_venta: idVenta }
            });
    
            return detallesVenta; // Esto será un arreglo de objetos DetalleVenta
        } catch (error) {
            console.error(error);
            throw new Error('Error al obtener detalles de venta');
        }
    }
    
    

    async actualzarDetalleVenta(id, usuarioData){
        return await DetalleVenta.update(usuarioData, {where: {id_detalleVenta: id}});
    }

    async eliminarDetalleVenta(id){
        return await DetalleVenta.destroy({where: {id_detalleVenta:id}});
    }
}

module.exports = new DetalleVentaRepository();