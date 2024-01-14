const TipoMedicamentoModel = require('../repositories/tipoMedicamentoRepository');

class TipoMedicamentoController{
    async crearTipoMedicamento(req, res){
        try {
            const tipoMedicamento = await TipoMedicamentoModel.crearTipoMedicamento(req.body);
            res.status(201).json(tipoMedicamento);  
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async obtenerTipoMedicamentos(req, res){
        try {
            const tipoMedicamento = await TipoMedicamentoModel.obtenerTipoMedicamentos();
            res.status(200).json(tipoMedicamento);  
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async obtenerTipoMedicamentoporId(req, res){
        try {
            const tipoMedicamento = await TipoMedicamentoModel.obtenerTipoMedicamentoporId(req.params.id);
            if(tipoMedicamento){
                res.status(200).json(tipoMedicamento);  
            } else{
                res.status(404).json({message: 'Tipo de medicamento no encontrado'});
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async actualizarTipoMedicamento(req, res){
        try {
            const tipoMedicamento = await TipoMedicamentoModel.actualzarTipoMedicamento(req.params.id, req.body);
            if(tipoMedicamento){
                res.status(200).json({message: 'Tipo de medicamento actualizado'});  
            } else{
                res.status(404).json({message: 'Tipo de medicamento no encontrado'});
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async eliminarTipoMedicamento(req, res){
        try {
            const tipoMedicamento = await RolModel.eliminarTipoMedicamento(req.params.id);
            if(tipoMedicamento){
                res.status(200).json({message: 'Tipo de medicamento eliminado'});  
            } else{
                res.status(404).json({message: 'Tipo de medicamento no encontrado'});
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }
}

module.exports = new TipoMedicamentoController();
