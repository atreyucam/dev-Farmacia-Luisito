import React from "react";
import Container from "react-bootstrap/Container";
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
          <span
            style={{ color: "#000000", cursor: "pointer",textSizeAdjust:"14px" }}
            onClick={handleRegistroClick}
          >
            Carrito de compras
          </span>
        </Container>
      </NavbarBootstrap>
    </div>
  );
}
