import { useState } from 'react';
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';

export default function Dashboard() {
  const [loggedInUser] = useState('Usuario123'); // Reemplaza con la lógica real para obtener el usuario conectado

  return (
    <div>
      <Container fluid>
        <Row>
          <Col xs={2} id="sidebar-wrapper">      
            <Nav
              className="col-md-12 d-none d-md-block bg-light sidebar"
              activeKey="/home"
              onSelect={selectedKey => alert(`selected ${selectedKey}`)}
            >
              <div className="sidebar-sticky"></div>
              <Nav.Item>
                <Nav.Link href="/home">Home</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link-1">Clientes</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link-2">Productos</Nav.Link> 
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link-3">Ventas</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col xs={10} id="page-content-wrapper">
            <Navbar bg="light" expand="lg">
              <Navbar.Brand href="#home">Logo</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  {/* Espacio reservado para elementos adicionales del Navbar si es necesario */}
                </Nav>
                <Navbar.Text>
                  Signed in as: <a href="#login">{loggedInUser}</a>
                </Navbar.Text>
              </Navbar.Collapse>
            </Navbar>
            {/* Espacio reservado para el contenido principal del dashboard */}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

