const MedicamentoModel = require('../repositories/MedicamentoRepository');

class MedicamentoController{
    async crearMedicamento(req, res){
        try {
            const medicamento = await MedicamentoModel.crearMedicamento(req.body);
            res.status(201).json(medicamento);  
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async obtenerMedicamentos(req, res){
        try {
            const medicamento = await MedicamentoModel.obtenerMedicamentos();
            res.status(200).json(medicamento);  
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async obtenerMedicamentoporId(req, res){
        try {
            const medicamento = await MedicamentoModel.obtenerMedicamentoporId(req.params.id);
            if(medicamento){
                res.status(200).json(medicamento);  
            } else{
                res.status(404).json({message: 'medicamento no encontrado'});
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async actualizarMedicamento(req, res){
        try {
            const medicamento = await MedicamentoModel.actualzarMedicamento(req.params.id, req.body);
            if(medicamento){
                res.status(200).json({message: 'medicamento actualizado'});  
            } else{
                res.status(404).json({message: 'medicamento no encontrado'});
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async eliminarMedicamento(req, res){
        try {
            const medicamento = await MedicamentoModel.eliminarMedicamento(req.params.id);
            if(medicamento){
                res.status(200).json({message: 'medicamento eliminado'});  
            } else{
                res.status(404).json({message: 'medicamento no encontrado'});
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }
}

module.exports = new MedicamentoController();
