import { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../css/Dashboard.css';

// obtener medicamentos
const obtenerMedicamentos = async () => {
  try {
    const response = await axios.get('http://localhost:4000/api/medicamento');
    return response.data;
  } catch (error) {
    console.error('Error al obtener medicamentos', error);
    return [];
  }
};

export default function Dashboard() {
  const navigate = useNavigate();

  const irAVentas = () => {
    navigate('/ventas'); // Ruta que corresponde al componente Ventas
};

  const [loggedInUser, setLoggedInUser] = useState('');
  const [medicamentos, setMedicamentos] = useState([]);
  const [mostrarProductos, setMostrarProductos] = useState(false); 
  const [filtro, setFiltro] = useState(""); 

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setLoggedInUser(decodedToken.nombre); // Usa la clave correcta del token
      // console.log(loggedInUser);
    }
  }, []);

  // Llamada para obtener los medicamentos
  const handleMostrarProductos = async () => { // Nueva función
    setMostrarProductos(true);
    const medicamentosObtenidos = await obtenerMedicamentos();
    setMedicamentos(medicamentosObtenidos);
  };

// Función para filtrar los medicamentos por nombre
  const medicamentosFiltrados = medicamentos.filter(medicamento =>
    medicamento.nombreMedicamento.toLowerCase().includes(filtro.toLowerCase())
  );

  const getTipoClass = (tipo) => {
    return tipo === 'RX' ? 'rx-background' : tipo === 'OTC' ? 'otc-background' : '';
  };
  

  return (
    <div>
      <Container fluid>
        <Row>
          <Col xs={2} id="sidebar-wrapper">      
            <Nav
              className="col-md-12 d-none d-md-block bg-light sidebar"
              activeKey="/home"
              // onSelect={selectedKey => alert(`selected ${selectedKey}`)}
            >
              {/* <div className="sidebar-sticky">
                
              </div> */}
              <Nav.Item>
                <Nav.Link href="/home">Home</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link-1">Clientes</Nav.Link>
              </Nav.Item>
              <Nav.Item onClick={handleMostrarProductos}>
                <Nav.Link eventKey="link-2">Medicamentos</Nav.Link> 
              </Nav.Item>
              <Nav.Item onClick={irAVentas}>
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
            {mostrarProductos && (
            <div>
              <h2>Medicamentos Disponibles</h2>
              {/* Barra de búsqueda */}
              <div className='barraUser'>
              <input
                type="text"
                className="form-control my-3 "
                placeholder="Buscar medicamento..."
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
              />

              </div>

              <div className="table-responsive">
              
                <table className="table table-bordered mt-3">
                  <thead className="thead-darkUser">
                    <tr>
                      <th>ID</th>
                      <th>Nombre del Medicamento</th>
                      <th>Cantidad</th>
                      <th>Precio</th>
                      <th>Descripción</th>
                      <th>Tipo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {medicamentosFiltrados.map((medicamento, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{medicamento.nombreMedicamento}</td>
                        <td>{medicamento.cantidad}</td>
                        <td>{medicamento.precioVenta}</td>
                        <td>{medicamento.descripcion}</td>
                        <td className={getTipoClass(medicamento.tipo)}>{medicamento.tipo}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

