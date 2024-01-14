
const {CarritoCompra} = require('../models/db_models');

class CarritoCompraRepository{
    async crearCarrito(usuarioData){
        return await CarritoCompra.create(usuarioData);
    }

    async obtenerCarritos(){
        return await CarritoCompra.findAll();
    }

    async obtenerCarritoporId(id){
        return await CarritoCompra.findByPk(id);
    }

    async actualzarCarrito(id, usuarioData){
        return await CarritoCompra.update(usuarioData, {where: {id_carrito: id}});
    }

    async eliminarCarrito(id){
        return await CarritoCompra.destroy({where: {id_carrito:id}});
    }
}

module.exports = new CarritoCompraRepository();