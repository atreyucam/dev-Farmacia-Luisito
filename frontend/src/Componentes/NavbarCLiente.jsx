import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import NavbarBootstrap from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
export default function NavbarCliente({ handleRegistroClick }) {
  return (
    <div>
      <NavbarBootstrap
        expand="lg"
        className="bg-green"
        style={{ backgroundColor: "#a5d6a7" }}
      >
        <Container fluid>
          <NavbarBootstrap.Brand href="#" style={{ color: "#000000" }}>
            Farmacia Luisito
          </NavbarBootstrap.Brand>

          <Form className="d-flex">
            <Button
              variant="dark"
              onClick={handleRegistroClick}
              style={{ color: "#a5d6a7" }}
            >
              Carrito de compras
            </Button>
          </Form>
        </Container>
      </NavbarBootstrap>
    </div>
  );
}
