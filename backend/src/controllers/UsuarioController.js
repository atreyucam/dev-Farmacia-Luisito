const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UsuarioModel = require('../repositories/UsuarioRepository');

class UsuarioController{
    // async crearUsuario(req, res){
    //     try {
    //         const usuario = await UsuarioModel.crearUsuario(req.body);
    //         res.status(201).json(usuario);  
    //     } catch (error) {
    //         res.status(500).json({error: error.message});
    //     }
    // }

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

    async register (req, res){
        console.log("Datos recibidos:", req.body);
        try {
            console.log("Validando cédula:", req.body.cedula);
            // verificacion de cedula ecuatoriana
            if (!validarCedulaEcuatoriana(req.body.cedula)) {
                return res.status(400).json({ message: 'Cédula ecuatoriana no válida' });
            }
             // verificacion de email valido
            if (!validarEmail(req.body.emailUser)) {
                return res.status(400).json({ message: 'Email no válido' });
            }
            // verificacion de numero telefonico
            if (!validarTelefono(req.body.telefono)) {
                return res.status(400).json({ message: 'Número de teléfono no válido' });
            }
            // verificacion de password valido
            if(!validarPassword(req.body.passwordUser)){
                return res.status(400).json({message: 'El password debe tener al menos 8 caracteres, incluir un número y una letra mayúscula'});
            }

            // Verificación de campos únicos
            const existingUserCedula = await UsuarioModel.getByCedula(req.body.cedula);
            if (existingUserCedula) {
                return res.status(400).json({ message: 'La cédula ya está registrada' });
            }
            const existingUserEmail = await UsuarioModel.getByEmail(req.body.emailUser);
            if (existingUserEmail) {
                return res.status(400).json({ message: 'El email ya está registrado' });
            }


            // Creacioon del usuario
            const hashedPassword = await bcrypt.hash(req.body.passwordUser, 10);
            const usuario = await UsuarioModel.crearUsuario({ ...req.body, passwordUser: hashedPassword });
            res.status(201).json(usuario);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    // Metodo de login de usuarios
    async login(req, res) {
        try {
            const usuario = await UsuarioModel.getByEmail(req.body.emailUser);
            if (!usuario) return res.status(401).json({ message: 'Autenticación fallida' });

            const match = await bcrypt.compare(req.body.passwordUser, usuario.passwordUser);
            if (!match) return res.status(401).json({ message: 'Autenticación fallida clave' });

            const token = jwt.sign({ userId: usuario.id_usuario, rol: usuario.id_rol, nombre: usuario.nombreUsuario }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

}

// Metodos de validacion
// 
// Funcion para verificar email valido
function validarEmail(email) {
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regexEmail.test(email);
}

// funcion para validar si la cedula ingresada es ecuatoriana
function validarCedulaEcuatoriana(cedula) {
    if (cedula.length !== 10) {
        return false;
    }

    const digitos = cedula.split('').map(Number);
    let tercerDigito = digitos[2];
    if (tercerDigito > 5) {
        return false; // No válido si el tercer dígito es mayor a 5
    }

    // Algoritmo de validación
    const coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
    let suma = 0;
    for (let i = 0; i < coeficientes.length; i++) {
        let valor = coeficientes[i] * digitos[i];
        suma += valor > 9 ? valor - 9 : valor;
    }

    let digitoVerificador = 10 - (suma % 10);
    if (digitoVerificador === 10) {
        digitoVerificador = 0;
    }

    return digitoVerificador === digitos[9];
}

// funcion que valida numero de telefono
// El patrón 0996126404 es un número de teléfono ecuatoriano, que generalmente comienza con 0 y tiene un total de 10 dígitos.
function validarTelefono(telefono) {
    const regexTelefono = /^0[0-9]{9}$/;
    return regexTelefono.test(telefono);
}

// Función para validar la contraseña
function validarPassword(password){
    const regexPassword = /^(?=.*\d)(?=.*[A-Z]).{8,}$/;
    return regexPassword.test(password);
}


module.exports = new UsuarioController();
