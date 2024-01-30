// components/Layout.js
import React from 'react';
import { Container, Row, Col, Navbar } from 'react-bootstrap';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <Container fluid>
      <Row>
        <Col xs={2} id="sidebar-wrapper">      
          <Sidebar />
        </Col>
        <Col xs={10} id="page-content-wrapper">
          <Navbar bg="light" expand="lg">
            {/* Tu Navbar aquí */}
          </Navbar>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default Layout;
