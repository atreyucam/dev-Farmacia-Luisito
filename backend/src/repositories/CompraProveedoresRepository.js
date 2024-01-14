
const {CompraProveedor} = require('../models/db_models');

class CompraProveedorRepository{
    async crearCompra(usuarioData){
        return await CompraProveedor.create(usuarioData);
    }

    async obtenerCompras(){
        return await CompraProveedor.findAll();
    }

    async obtenerCompraporId(id){
        return await CompraProveedor.findByPk(id);
    }

    async actualzarCompra(id, usuarioData){
        return await CompraProveedor.update(usuarioData, {where: {id_compraProveedor: id}});
    }

    async eliminarCompra(id){
        return await CompraProveedor.destroy({where: {id_compraProveedor:id}});
    }
}

module.exports = new CompraProveedorRepository();