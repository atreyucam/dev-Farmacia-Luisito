
const {Venta} = require('../models/db_models');

class VentaRepository{
    async crearVenta(usuarioData){
        return await Venta.create(usuarioData);
    }

    async obtenerVentas(){
        return await Venta.findAll();
    }

    async obtenerVentaporId(id){
        return await Venta.findByPk(id);
    }

    async actualzarVenta(id, usuarioData){
        return await Venta.update(usuarioData, {where: {id_venta: id}});
    }

    async eliminarVenta(id){
        return await Venta.destroy({where: {id_venta:id}});
    }
}

module.exports = new VentaRepository();