// components/Sidebar.js
import React from 'react';
import { Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Nav className="col-md-12 d-none d-md-block bg-light sidebar">
      {/* El resto de tu Nav aquí */}
      <Nav.Link onClick={() => handleNavigation('/home')}>Home</Nav.Link>
      <Nav.Link onClick={() => handleNavigation('/clientes')}>Clientes</Nav.Link>
      <Nav.Link onClick={() => handleNavigation('/medicamentos')}>Medicamentos</Nav.Link>
      <Nav.Link onClick={() => handleNavigation('/ventas')}>Ventas</Nav.Link>
    </Nav>
  );
};

export default Sidebar;
