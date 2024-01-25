const ConfiguracionModel = require('../repositories/ConfiguracionRepository');

class ConfiguracionController{
    async crearConfiguracion(req, res){
        try {
            const configuracion = await ConfiguracionModel.crearConfiguracion(req.body);
            res.status(201).json(configuracion);  
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async obtenerConfiguraciones(req, res){
        try {
            const configuracion = await ConfiguracionModel.obtenerConfiguraciones();
            res.status(200).json(configuracion);  
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async obtenerConfiguracionporId(req, res){
        try {
            const configuracion = await ConfiguracionModel.obtenerConfiguracionporId(req.params.id);
            if(configuracion){
                res.status(200).json(configuracion);  
            } else{
                res.status(404).json({message: 'configuracion no encontrado'});
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async actualzarConfiguracion(req, res){
        try {
            const configuracion = await ConfiguracionModel.actualzarConfiguracion(req.params.id, req.body);
            if(configuracion){
                res.status(200).json({message: 'configuracion actualizado'});  
            } else{
                res.status(404).json({message: 'configuracion no encontrado'});
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async eliminarConfiguracion(req, res){
        try {
            const configuracion = await ConfiguracionModel.eliminarConfiguracion(req.params.id);
            if(configuracion){
                res.status(200).json({message: 'configuracion eliminado'});  
            } else{
                res.status(404).json({message: 'configuracion no encontrado'});
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    // Nuevos Metodos
    async obtenerMargenGanancia() {
        const configuracion = await ConfiguracionModel.findOne({nombreConfig: 'margenGanancia' });
        return configuracion ? parseFloat(configuracion.valor) : null;
    }
    
}

module.exports = new ConfiguracionController();
