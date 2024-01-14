const PedidoPendienteModel = require('../repositories/PedidoPendienteRepository');

class PedidoPendienteController{
    async crearPedidoPendiente(req, res){
        try {
            const pedidoPendiente = await PedidoPendienteModel.crearPedidoPendiente(req.body);
            res.status(201).json(pedidoPendiente);  
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async obtenerPedidosPendientes(req, res){
        try {
            const pedidoPendiente = await PedidoPendienteModel.obtenerPedidosPendientes();
            res.status(200).json(pedidoPendiente);  
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async obtenerPedidoPendienteporId(req, res){
        try {
            const pedidoPendiente = await PedidoPendienteModel.obtenerPedidoPendienteporId(req.params.id);
            if(pedidoPendiente){
                res.status(200).json(pedidoPendiente);  
            } else{
                res.status(404).json({message: 'pedidoPendiente no encontrado'});
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async actualizarPedidoPendiente(req, res){
        try {
            const pedidoPendiente = await PedidoPendienteModel.actualzarPedidoPendiente(req.params.id, req.body);
            if(pedidoPendiente){
                res.status(200).json({message: 'pedidoPendiente actualizado'});  
            } else{
                res.status(404).json({message: 'pedidoPendiente no encontrado'});
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async eliminarPedidoPendiente(req, res){
        try {
            const pedidoPendiente = await PedidoPendienteModel.eliminarPedidoPendiente(req.params.id);
            if(pedidoPendiente){
                res.status(200).json({message: 'pedidoPendiente eliminado'});  
            } else{
                res.status(404).json({message: 'pedidoPendiente no encontrado'});
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }
}

module.exports = new PedidoPendienteController();
