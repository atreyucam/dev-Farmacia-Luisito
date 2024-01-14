
const {PedidoPendiente} = require('../models/db_models');

class PedidoPendienteRepository{
    async crearPedidoPendiente(usuarioData){
        return await PedidoPendiente.create(usuarioData);
    }

    async obtenerPedidosPendientes(){
        return await PedidoPendiente.findAll();
    }

    async obtenerPedidoPendienteporId(id){
        return await PedidoPendiente.findByPk(id);
    }

    async actualzarPedidoPendiente(id, usuarioData){
        return await PedidoPendiente.update(usuarioData, {where: {id_pedido: id}});
    }

    async eliminarPedidoPendiente(id){
        return await PedidoPendiente.destroy({where: {id_pedido:id}});
    }
}

module.exports = new PedidoPendienteRepository();