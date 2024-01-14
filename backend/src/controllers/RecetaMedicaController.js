const RecetaMedicaModel = require('../repositories/RecetaMedicaRepository');

class RecetaMedicaController{
    async crearRecetaMedica(req, res){
        try {
            const recetaMedica = await RecetaMedicaModel.crearRecetaMedica(req.body);
            res.status(201).json(recetaMedica);  
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async obtenerRecetasMedicas(req, res){
        try {
            const recetaMedica = await RecetaMedicaModel.obtenerRecetasMedicas();
            res.status(200).json(recetaMedica);  
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async obtenerRecetaMedicaporId(req, res){
        try {
            const recetaMedica = await RecetaMedicaModel.obtenerRecetaMedicaporId(req.params.id);
            if(recetaMedica){
                res.status(200).json(recetaMedica);  
            } else{
                res.status(404).json({message: 'receta medica no encontrado'});
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async actualizarRecetaMedica(req, res){
        try {
            const recetaMedica = await RecetaMedicaModel.actualzarRecetaMedica(req.params.id, req.body);
            if(recetaMedica){
                res.status(200).json({message: 'receta medica actualizado'});  
            } else{
                res.status(404).json({message: 'receta medica no encontrado'});
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async eliminarRecetaMedica(req, res){
        try {
            const recetaMedica = await RecetaMedicaModel.eliminarRecetaMedica(req.params.id);
            if(recetaMedica){
                res.status(200).json({message: 'receta medica eliminado'});  
            } else{
                res.status(404).json({message: 'receta medica no encontrado'});
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }
}

module.exports = new RecetaMedicaController();
