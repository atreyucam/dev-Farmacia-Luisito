const UsuarioModel = require('../repositories/UsuarioRepository');

class UsuarioController{
    async crearUsuario(req, res){
        try {
            const usuario = await UsuarioModel.crearUsuario(req.body);
            res.status(201).json(usuario);  
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async obtenerUsuarios(req, res){
        try {
            const usuario = await UsuarioModel.obtenerUsuarios();
            res.status(200).json(usuario);  
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async obtenerUsuarioporId(req, res){
        try {
            const usuario = await UsuarioModel.obtenerUsuarioporId(req.params.id);
            if(usuario){
                res.status(200).json(usuario);  
            } else{
                res.status(404).json({message: 'usuario no encontrado'});
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async actualizarUsuario(req, res){
        try {
            const usuario = await UsuarioModel.actualzarUsuario(req.params.id, req.body);
            if(usuario){
                res.status(200).json({message: 'usuario actualizado'});  
            } else{
                res.status(404).json({message: 'usuario no encontrado'});
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async eliminarUsuario(req, res){
        try {
            const usuario = await UsuarioModel.eliminarUsuario(req.params.id);
            if(usuario){
                res.status(200).json({message: 'usuario eliminado'});  
            } else{
                res.status(404).json({message: 'usuario no encontrado'});
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }
}

module.exports = new UsuarioController();
