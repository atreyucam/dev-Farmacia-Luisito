
const {Proveedor} = require('../models/db_models');

class ProveedorRepository{
    async crearProveedor(usuarioData){
        return await Proveedor.create(usuarioData);
    }

    async obtenerProveedores(){
        return await Proveedor.findAll();
    }

    async obtenerProveedorporId(id){
        return await Proveedor.findByPk(id);
    }

    async actualizarProveedor(id, usuarioData){
        return await Proveedor.update(usuarioData, {where: {id_proveedor: id}});
    }

    async eliminarProveedor(id){
        return await Proveedor.destroy({where: {id_proveedor:id}});
    }

    // Metodo nuevo
    async buscarOcrear(data){
        const [proveedor, creado] = await Proveedor.findOrCreate({
            where:{ruc: data.ruc},
            defaults: data
        });

        if(creado){
            console.log('Se creado un nuevo proveedor: ', proveedor);
        }
        return proveedor;
    }
}

module.exports = new ProveedorRepository();