import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Card, Col, Container, Row, Form } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import NavbarCliente from "../Componentes/NavbarCLiente";

export default function ProductosGeneral() {
  const [medicamentos, setMedicamentos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchMedicamentos = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/medicamento');
        const datosMedicamentos = response.data.map(({ urlImagen, nombreMedicamento, precioVenta }) => ({
          urlImagen,
          nombreMedicamento,
          precioVenta
        }));
        setMedicamentos(datosMedicamentos);
      } catch (error) {
        console.error('Error al obtener los medicamentos', error);
      }
    };

    fetchMedicamentos();
  }, []);

  const filteredMedicamentos = medicamentos.filter(medicamento =>
    medicamento.nombreMedicamento.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <NavbarCliente />
      <Container>
        <Row className="justify-content-md-center">
          <Col md={6} style={{ marginBottom: '1rem' }}>
            <Form.Group>
              <div className="input-group">
                <Form.Control
                  type="text"
                  placeholder="Buscar medicamento..."
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button className="search-button" style={{ marginLeft: '5px' }}>
  <FaSearch className="fa-search" />
                </Button> 
              </div>
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          {filteredMedicamentos.map((medicamento, index) => (
            <Col key={index} md={4} style={{ marginBottom: '1rem' }}>
              <Card>
                <Card.Img variant="top" src={medicamento.urlImagen} />
                <Card.Body>
                  <Card.Title>{medicamento.nombreMedicamento}</Card.Title>
                  <Card.Text>
                    Precio: ${medicamento.precioVenta}
                  </Card.Text>
                  <Button variant="success">Comprar</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
