import React from "react";
import NavbarCliente from "../Componentes/NavbarCLiente";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Cliente1() {
  return (
    <div>
      <NavbarCliente></NavbarCliente>
      {/*  Categorias de productos 
        Primera categoria  */}
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>PRODCUTOS GENERALES </Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Link to="/produGenerales"><Button variant="primary">Ir a...</Button></Link>          
        </Card.Body>
      </Card>

      {/* Segunda categoria  */}

      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>PRODUCTOS CON CERTIFICADO MEDICO</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Link to="/bajoReceta"><Button variant="primary">Ir a...</Button></Link>  
        </Card.Body>
      </Card>
    </div>
  );
}
