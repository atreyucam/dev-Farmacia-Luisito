import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { Container, Row, Col, Navbar, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../css/Dashboard.css";

// Obtener medicamentos
const obtenerMedicamentos = async () => {
  try {
    const response = await axios.get("http://localhost:4000/api/medicamento");
    return response.data;
  } catch (error) {
    console.error("Error al obtener medicamentos", error);
    return [];
  }
};

// Obtener alertas
const obtenerAlertas = async () => {
  try {
    const response = await axios.get("http://localhost:4000/api/alerta");
    return response.data;
  } catch (error) {
    console.error("Error al obtener alertas", error);
    return [];
  }
};

// Obtener proveedores
const obtenerProveedores = async () => {
  try {
    const response = await axios.get("http://localhost:4000/api/proveedor");
    return response.data;
  } catch (error) {
    console.error("Error al obtener proveedores", error);
    return [];
  }
};

// Lógica de conexión al backend para importar datos desde Excel
const importarDatosDesdeExcel = async (file, selectedOption) => {
  const importRoute =
    selectedOption === 'Proveedores' ? 'http://localhost:4000/api/importarDatos' : 'http://localhost:4000/api/importarTipos';

  const formData = new FormData();
  formData.append('archivo', file);

  try {
    const response = await axios.post(importRoute, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return { success: true, message: response.data.message };
  } catch (error) {
    console.error('Error al subir el archivo:', error);
    console.error('Detalles del error:', error.response.data);

    return { success: false, error: 'Error al subir el archivo' };
  }
};


export default function Dashboard() {
  const [selectedFileType, setSelectedFileType] = useState("");

  const navigate = useNavigate();

  const irAVentas = () => {
    navigate("/ventas");
  };

  const [loggedInUser, setLoggedInUser] = useState("");
  const [medicamentos, setMedicamentos] = useState([]);
  const [mostrarProductos, setMostrarProductos] = useState(false);
  const [filtro, setFiltro] = useState("");
  const [alertas, setAlertas] = useState([]);
  const [mostrarAlertas, setMostrarAlertas] = useState(false);
  const [proveedores, setProveedores] = useState([]);
  const [mostrarProveedores, setMostrarProveedores] = useState(false);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setLoggedInUser(decodedToken.nombre);
    }
  }, []);

  const handleMostrarProductos = async () => {
    setMostrarProductos(true);
    const medicamentosObtenidos = await obtenerMedicamentos();
    setMedicamentos(medicamentosObtenidos);
  };

  const handleMostrarAlertas = async () => {
    setMostrarAlertas(true);
    const alertasObtenidas = await obtenerAlertas();
    setAlertas(alertasObtenidas);
  };

  const handleMostrarProveedores = async () => {
    setMostrarProductos(false);
    setMostrarAlertas(false);
    setMostrarProveedores(true);

    const proveedoresObtenidos = await obtenerProveedores();
    setProveedores(proveedoresObtenidos);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = async (selectedOption) => {
    if (file && selectedOption) {
      const result = await importarDatosDesdeExcel(file, selectedOption);

      if (result.success) {
        console.log('Archivo subido con éxito:', result.message);       

        // Actualizar la lista correspondiente después de la carga
        if (selectedOption === 'Proveedores') {
          const proveedoresObtenidos = await obtenerProveedores();
          setProveedores(proveedoresObtenidos);
        }
      } else {
        console.error(result.error);
      }
    } else {
      console.error('No hay archivo seleccionado para subir');
    }
  };

  const medicamentosFiltrados = medicamentos.filter((medicamento) =>
    medicamento.nombreMedicamento.toLowerCase().includes(filtro.toLowerCase())
  );

  const getTipoClass = (tipo) => {
    return tipo === "RX" ? "rx-background" : tipo === "OTC" ? "otc-background" : "";
  };

  return (
    <div>
      <Container fluid>
        <Row>
          <Col xs={2} id="sidebar-wrapper">
            <p>Farmacia Luisito</p>
            <Nav
              className="col-md-12 d-none d-md-block menu-User"
              activeKey="/home"
            >
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
              <Nav.Item onClick={handleMostrarAlertas}>
                <Nav.Link eventKey="link-4">Alertas</Nav.Link>
              </Nav.Item>
              <Nav.Item onClick={handleMostrarProveedores}>
                <Nav.Link eventKey="link-5">Proveedores</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col xs={10} id="page-content-wrapper">
            <Navbar bg="light" expand="lg">
              <Navbar.Brand href="#home">Logo</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto"></Nav>
                <Navbar.Text>
                  Signed in as: <a href="#login">{loggedInUser}</a>
                </Navbar.Text>
              </Navbar.Collapse>
            </Navbar>

            {mostrarProductos && (
              <div className="tablaDatos">
                <h2>Medicamentos Disponibles</h2>
                <div className="barraUser">
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
                          <td className={getTipoClass(medicamento.tipo)}>
                            {medicamento.tipo}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {mostrarAlertas && (
              <div className="tablaDatos">
                <h2>Alertas</h2>
                <div className="table-responsive">
                  <table className="table table-bordered mt-3">
                    <thead className="thead-darkUser">
                      <tr>
                        <th>ID</th>
                        <th>Tipo de alerta</th>
                        <th>Descripción</th>
                        <th>Fecha de alerta</th>
                        <th>Estado</th>
                        <th>ID de inventario</th>
                      </tr>
                    </thead>
                    <tbody>
                      {alertas.map((alerta, index) => (
                        <tr key={index}>
                          <td>{alerta.id_alerta}</td>
                          <td>{alerta.tipoAlerta}</td>
                          <td>{alerta.descripcion}</td>
                          <td>{alerta.fechaAlerta}</td>
                          <td>{alerta.estado}</td>
                          <td>{alerta.id_inventario}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

{mostrarProveedores && (
  <div className="tablaDatos">
    <h2>Subir Archivo</h2>
    <div className="barraUser">
      <div className="row">
        <div className="col-md-6">
          <select
            className="form-control"
            onChange={(e) => setSelectedFileType(e.target.value)}
          >
            <option value="" disabled selected>
              Selecciona una opción
            </option>
            <option value="Proveedores">Proveedores</option>
            <option value="TiposMedicamentos">Tipo de medicamentos</option>
          </select>
        </div>
        <div className="col-md-6">
          <input
            type="file"
            className="form-control"
            name="file1"
            onChange={handleFileChange}
          />
        </div>
      </div>
    </div>

    <div className="row mt-3">
      <div className="col-md-6">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => handleFileUpload(selectedFileType)}
          disabled={!selectedFileType || !file}
        >
          Subir Archivo
        </button>
      </div>
    </div>

                {/* Mostrar la tabla de proveedores después de la carga */}
                {proveedores.length > 0 && (
                  <div className="table-responsive">
                    <table className="table table-bordered mt-3">
                      <thead className="thead-darkUser">
                        <tr>
                          <th>ID</th>
                          <th>Nombre del Proveedor</th>
                          <th>Dirección</th>
                          {/* Agrega más columnas según la estructura de tus proveedores */}
                        </tr>
                      </thead>
                      <tbody>
                        {proveedores.map((proveedor, index) => (
                          <tr key={index}>
                            <td>{proveedor.id_proveedor}</td>
                            <td>{proveedor.nombreProveedor}</td>
                            <td>{proveedor.direccion}</td>
                            {/* Agrega más celdas según la estructura de tus proveedores */}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
