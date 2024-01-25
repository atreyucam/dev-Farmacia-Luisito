import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import NavbarBootstrap from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

export default function MyNavbar({ handleRegistroClick }) {
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
              Registrarse
            </Button>
          </Form>
        </Container>
      </NavbarBootstrap>
    </div>
  );
}
