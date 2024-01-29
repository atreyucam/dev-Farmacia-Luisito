import React, { useState } from "react";
import MyNavbar from "../Componentes/Navbar";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ModalRegistro from "./Registro";
import ImagenLogo from "../Imagenes/logo.jpg";
import FondoImagen from "../Imagenes/farmacia.jpg";
import axios from "axios";
import { Alert } from "react-bootstrap";
import {  useNavigate } from "react-router-dom";

export default function Pagina_General() {
  const navigate = useNavigate();  
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);

  const [usuario, setUsuario] = useState({
    emailUser: "",
    passwordUser: "",
  });

  const [loginError, setLoginError] = useState("");

  const handleLoginChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/login",
        usuario
      );
      console.log("Login exitoso:", response.data);
      alert("Login exitoso");
      // Aquí podrías guardar el token en localStorage y redirigir al usuario
      // localStorage.setItem('token', response.data.token);
      // history.push('/rutaLuegoDelLogin');
      navigate("/dashboard");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setLoginError("Usuario o contraseña incorrectos.");
        /* alert("Usuario o contraseña incorrectos."); */
      } else {
        console.error("Error durante el login:", error);
        setLoginError("Error al intentar iniciar sesión.");
      }
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${FondoImagen})`,
        backgroundSize: "cover",
        height: "100vh",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      <MyNavbar handleRegistroClick={() => setShowModal(true)} />

      <div
        className="d-flex align-items-center justify-content-center vh-100"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          width: "100%",
          position: "absolute",
        }}
      >
        <Card
          style={{
            width: "450px",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
          }}
        >
          <Card.Body>
            <div className="d-flex align-items-center mb-4">
              <img
                src={ImagenLogo}
                alt="Logo"
                style={{
                  width: "200px",
                  height: "200px",
                  marginTop: "50px",
                  marginRight: "40px",
                }}
              />
              <Form className="w-100" onSubmit={handleLoginSubmit}>
                <Form.Group className="mb-3" controlId="formHorizontalEmail">
                  <Form.Label>Correo Electrónico</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Ingrese su correo"
                    name="emailUser"
                    value={usuario.emailUser}
                    onChange={handleLoginChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formHorizontalPassword">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Ingrese su contraseña"
                    name="passwordUser"
                    value={usuario.passwordUser}
                    onChange={handleLoginChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3" style={{ textAlign: "center" }}>
                  {loginError && (
                    <Alert
                      variant="danger"
                      onClose={() => setLoginError("")}
                      dismissible
                    >
                      {loginError}
                    </Alert>
                  )}
                  <Button
                    type="submit"
                    style={{
                      marginTop: "10px",
                      backgroundColor: "#a5d6a7",
                      color: "#000000",
                      border: "none",
                      transition: "background-color 0.3s, color 0.3s",
                      ":hover": {
                        backgroundColor: "#388e3c",
                        color: "#ffffff",
                      },
                    }}
                  >
                    Iniciar Sesión
                  </Button>
                </Form.Group>
              </Form>
            </div>
          </Card.Body>
        </Card>

        {showModal && (
          <ModalRegistro show={showModal} handleClose={handleClose} />
        )}
      </div>
    </div>
  );
}
