// Registro.js
import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

export default function Registro({ show, handleClose }) {
  const [error, setError] = useState({
    cedula: "",
    nombreUsuario: "",
    telefono: "",
    emailUser: "",
    passwordUser: "",
  });

  const [usuario, setUsuario] = useState({
    cedula: "",
    nombreUsuario: "",
    direccion: "",
    telefono: "",
    emailUser: "",
    passwordUser: "",
    id_rol: "3",
  });

  const [showAlert, setShowAlert] = useState(false);

  const handleSuccessfulRegistration = () => {
    setShowAlert(true);
    // Puedes realizar acciones adicionales si es necesario
  };

  const handleChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (usuario.cedula.length !== 10) {
      newErrors.cedula = "La cédula debe tener exactamente 10 dígitos.";
    }

    if (!/^[a-zA-Z\s]*$/.test(usuario.nombreUsuario)) {
      newErrors.nombreUsuario = "El nombre solo puede contener letras.";
    }
    if (!/^09\d{8}$/.test(usuario.telefono)) {
      newErrors.telefono =
        "El número de teléfono debe empezar con 09 y tener 10 dígitos en total.";
    }

    if (
      !/^[^\s@]+@[^\s@]+\.(?:gmail\.com|hotmail\.com|yahoo\.com|[a-zA-Z]{2,})$/.test(
        usuario.emailUser
      )
    ) {
      newErrors.emailUser =
        "El correo electrónico debe ser de los dominios gmail.com, hotmail.com, yahoo.com, o de un dominio genérico válido.";
    }

    if (
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,20}$/.test(
        usuario.passwordUser
      )
    ) {
      newErrors.passwordUser =
        "La contraseña debe tener entre 8 y 20 caracteres, incluir números, letras mayúsculas, minúsculas y caracteres especiales.";
    }
    setError(newErrors);

    // Detener el envío del formulario si hay errores
    if (Object.values(newErrors).some((error) => error !== "")) {
      return;
    }

    try {
      // Resto del código para enviar el formulario
      const response = await axios.post(
        "http://localhost:4000/api/registro",
        usuario
      );
      console.log("Usuario creado:", response.data);
      handleSuccessfulRegistration();

      // Aquí podrías redirigir al usuario o mostrar un mensaje de éxito
      history.push("/regreso");
    } catch (error) {
      console.error("Error al crear el usuario:", error);
      console.log(
        "Detalles del error:",
        error.response?.data || "No hay detalles disponibles"
      );
      // Muestra detalles del error al usuario o realiza acciones adicionales
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title style={{ color: "#8fc192" }}>
          Ingresa tus datos
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="cedula">Cedula</Form.Label>
            <Form.Control
              type="number"
              name="cedula"
              value={usuario.cedula}
              onChange={handleChange}
            />
            {error.cedula && <Alert variant="danger">{error.cedula}</Alert>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Nombre y Apellido</Form.Label>
            <Form.Control
              type="text"
              name="nombreUsuario"
              value={usuario.nombreUsuario}
              onChange={handleChange}
            />
            {error.nombreUsuario && (
              <Alert variant="danger">{error.nombreUsuario}</Alert>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Direccion</Form.Label>
            <Form.Control
              type="text"
              name="direccion"
              value={usuario.direccion}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Telefono / Celular</Form.Label>
            <Form.Control
              type="number"
              name="telefono"
              value={usuario.telefono}
              onChange={handleChange}
            />
            {error.telefono && <Alert variant="danger">{error.telefono}</Alert>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Correo Electronico</Form.Label>
            <Form.Control
              type="email"
              name="emailUser"
              value={usuario.emailUser}
              onChange={handleChange}
            />
            {error.emailUser && (
              <Alert variant="danger">{error.emailUser}</Alert>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              name="passwordUser"
              value={usuario.passwordUser}
              onChange={handleChange}
            />
            {error.passwordUser && (
              <Alert variant="danger">{error.passwordUser}</Alert>
            )}
          </Form.Group>
          <Alert
            variant="success"
            show={showAlert}
            onClose={() => setShowAlert(false)}
            dismissible
          >
            Usuario creado con éxito.
          </Alert>
          <Button
            variant="dark"
            size="lg"
            className="mb-3"
            type="submit"
            style={{ color: "#8fc192" }}
          >
            Registrarse
          </Button>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="dark"
          onClick={handleClose}
          style={{ color: "#a5d6a7" }}
        >
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
