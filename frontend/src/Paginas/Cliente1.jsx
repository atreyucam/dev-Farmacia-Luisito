import React from "react";
import NavbarCliente from "../Componentes/NavbarCLiente";
import { Button, Card, Container, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import ImagenGenerales from "../Imagenes/generales.jpg";
import ImagenCertificado from "../Imagenes/certificado.jpg";
import FondoImagen from "../Imagenes/farmacia.jpg"; 

export default function Cliente1() {
  return (
    <div style={{ background: `url(${FondoImagen}) center center/cover no-repeat fixed rgba(255, 255, 255, 0.1)`, backgroundSize: 'cover', height: '100vh', position: 'relative', overflowX: 'hidden'}}>
      <NavbarCliente></NavbarCliente>

      <Container className="d-flex align-items-center justify-content-center vh-100">
        <Row>
          <Col>
            <Card style={{ width: "22rem", borderRadius: '15px', boxShadow: '0 4px 8px rgba(165, 214, 167, 0.5)', backgroundColor: 'rgba(255, 255, 255, 0.9)', height: "100%" }}>
              <Card.Img variant="top" src={ImagenGenerales} alt="Logo" style={{ width: "100%", height: "200px", borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }} />
              <Card.Body>
                <Card.Title>PRODUCTOS GENERALES</Card.Title>
                <Card.Text>
                  Descubre nuestra amplia gama de productos de farmacia general. Desde medicamentos comunes hasta productos de cuidado personal, ¡todo lo que necesitas en un solo lugar!
                </Card.Text>
                <Link to="/produGenerales">
                  <Button variant="primary" style={{ backgroundColor: "#a5d6a7", border: "1px solid #000000", color: "#000000", transition: "background-color 0.3s", marginTop: "48px" }}>Ir a...</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card style={{ width: "22rem", borderRadius: '15px', boxShadow: '0 4px 8px rgba(165, 214, 167, 0.5)', backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
              <Card.Img variant="top" src={ImagenCertificado} alt="Logo" style={{ width: "100%", height: "200px", borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }} />
              <Card.Body>
                <Card.Title>PRODUCTOS CON CERTIFICADO MÉDICO</Card.Title>
                <Card.Text>
                  Explora nuestra selección de productos con certificación médica. Estos productos están destinados para situaciones que requieren la supervisión de un profesional de la salud, ¡siempre con receta médica!
                </Card.Text>
                <Link to="/bajoReceta">
                  <Button variant="primary" style={{ backgroundColor: "#a5d6a7", border: "1px solid #000000", color: "#000000", transition: "background-color 0.3s" }}>Ir a...</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
