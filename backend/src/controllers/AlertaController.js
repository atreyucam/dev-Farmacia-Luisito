const AlertaModel = require('../repositories/AlertasRepository');

class AlertaController{
    async crearAlerta(req, res){
        try {
            const alerta = await AlertaModel.crearAlerta(req.body);
            res.status(201).json(alerta);  
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async obtenerAlertas(req, res){
        try {
            const alerta = await AlertaModel.obtenerAlertas();
            res.status(200).json(alerta);  
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async obtenerAlertaporId(req, res){
        try {
            const alerta = await AlertaModel.obtenerAlertaporId(req.params.id);
            if(alerta){
                res.status(200).json(alerta);  
            } else{
                res.status(404).json({message: 'alerta no encontrado'});
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async actualizarAlerta(req, res){
        try {
            const alerta = await AlertaModel.actualzarAlerta(req.params.id, req.body);
            if(alerta){
                res.status(200).json({message: 'alerta actualizado'});  
            } else{
                res.status(404).json({message: 'alerta no encontrado'});
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async eliminarAlerta(req, res){
        try {
            const alerta = await AlertaModel.eliminarAlerta(req.params.id);
            if(alerta){
                res.status(200).json({message: 'alerta eliminado'});  
            } else{
                res.status(404).json({message: 'alerta no encontrado'});
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }
}

module.exports = new AlertaController();
