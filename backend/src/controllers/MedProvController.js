const medProv_model = require('../repositories/MedProvrepository');

class MedProv_Controller{
    async crearMedProv(req, res){
        try {
            const medProv = await medProv_model.crearMedProv(req.body);
            res.status(201).json(medProv);  
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async obtenerAll_MedProv(req, res){
        try {
            const medProv = await medProv_model.obtenerAll_MedProv();
            res.status(200).json(medProv);  
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async obtenerMedProvporId(req, res){
        try {
            const medProv = await medProv_model.obtenerMedProvporId(req.params.id);
            if(medProv){
                res.status(200).json(medProv);  
            } else{
                res.status(404).json({message: 'medProv no encontrado'});
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async actualizarMedProv(req, res){
        try {
            const medProv = await medProv_model.actualizarMedProv(req.params.id, req.body);
            if(medProv){
                res.status(200).json({message: 'medProv actualizado'});  
            } else{
                res.status(404).json({message: 'medProv no encontrado'});
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async eliminarMedProv(req, res){
        try {
            const medProv = await medProv_model.eliminarMedProv(req.params.id);
            if(medProv){
                res.status(200).json({message: 'medProv eliminado'});  
            } else{
                res.status(404).json({message: 'medProv no encontrado'});
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }
}

module.exports = new MedProv_Controller();
