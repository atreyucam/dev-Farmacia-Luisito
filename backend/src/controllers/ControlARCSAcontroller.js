const ARCSAmodel = require('../repositories/ControlARCSArepository');

class ControlARCSAController{
    async crearControl(req, res){
        try {
            const control = await ARCSAmodel.crearControl(req.body);
            res.status(201).json(control);  
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async obtenerControles(req, res){
        try {
            const control = await ARCSAmodel.obtenerControles();
            res.status(200).json(control);  
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async obtenerControlporId(req, res){
        try {
            const control = await ARCSAmodel.obtenerControlporId(req.params.id);
            if(control){
                res.status(200).json(control);  
            } else{
                res.status(404).json({message: 'control no encontrado'});
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async actualizarControl(req, res){
        try {
            const control = await ARCSAmodel.actualizarControl(req.params.id, req.body);
            if(control){
                res.status(200).json({message: 'control actualizado'});  
            } else{
                res.status(404).json({message: 'control no encontrado'});
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async eliminarControl(req, res){
        try {
            const control = await ARCSAmodel.eliminarControl(req.params.id);
            if(control){
                res.status(200).json({message: 'control eliminado'});  
            } else{
                res.status(404).json({message: 'control no encontrado'});
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }
}

module.exports = new ControlARCSAController();
