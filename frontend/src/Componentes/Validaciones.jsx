export const validateCedula = (cedula) => {
  const cedulaRegex = /^[0-9]{11}$/;
  return cedulaRegex.test(cedula) ? null : "El número de cédula no es válido.";
};

export const validateNombre = (nombre) => {
  const nombreRegex = /^[A-Za-záéíóúüñÁÉÍÓÚÜÑ]+(\s[A-Za-záéíóúüñÁÉÍÓÚÜÑ]+)?$/;
  return nombreRegex.test(nombre)
    ? null
    : "Ingrese un nombre y un apellido, ambos comenzando con mayúscula y sin números ni símbolos.";
};

export const validateDireccion = (direccion) => {
  const direccionRegex = /^.{1,255}$/;
  return direccionRegex.test(direccion) ? null : "La dirección debe tener entre 1 y 255 caracteres.";
};

export const validateTelefono = (telefono) => {
  const telefonoRegex = /^[0-9]{1,10}$/;
  return telefonoRegex.test(telefono) ? null : "El teléfono debe tener un máximo de 10 dígitos numéricos.";
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,6}$/;
  return emailRegex.test(email) ? null : "El correo electrónico no tiene un formato válido.";
};
