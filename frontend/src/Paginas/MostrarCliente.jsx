import React, { useState, useEffect } from "react";
import axiosInstance from "../config/configAxios";
import { Button, Modal } from "react-bootstrap";
import NavbarCliente from "../Componentes/NavbarCLiente";
import {
  validateCedula,
  validateNombre,
  validateDireccion,
  validateTelefono,
  validateEmail,
} from "../Componentes/Validaciones";

export default function MostrarCliente() {
  const [usuarios, setUsuarios] = useState([]);
  const [selectedUsuario, setSelectedUsuario] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showNuevoUsuarioModal, setShowNuevoUsuarioModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [nuevoUsuarioData, setNuevoUsuarioData] = useState({
    cedula: "",
    nombreUsuario: "",
    direccion: "",
    telefono: "",
    emailUser: "",
    id_rol: "",
    passwordUser: "",
  });
  const [updatedUserData, setUpdatedUserData] = useState({
    id_usuario: "",
    cedula: "",
    nombreUsuario: "",
    direccion: "",
    telefono: "",
    emailUser: "",
    id_rol: "",
    passwordUser: "",
  });

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCloseNuevoUsuarioModal = () => {
    setShowNuevoUsuarioModal(false);
    setNuevoUsuarioData({
      cedula: "",
      nombreUsuario: "",
      direccion: "",
      telefono: "",
      emailUser: "",
      id_rol: "",
      passwordUser: "",
    });
  };

  const handleMostrarNuevoUsuarioModal = () => {
    setShowNuevoUsuarioModal(true);
  };

  const handleGuardarNuevoUsuario = async () => {
    try {
      if (
        !validateCedula(nuevoUsuarioData.cedula) ||
        !validateNombre(nuevoUsuarioData.nombreUsuario) ||
        !validateDireccion(nuevoUsuarioData.direccion) ||
        !validateTelefono(nuevoUsuarioData.telefono) ||
        !validateEmail(nuevoUsuarioData.emailUser)
      ) {
        console.error("Datos de usuario no válidos");
        return;
      }
      await axiosInstance.post("/registro", nuevoUsuarioData);
      const response = await axiosInstance.get("/usuario");
      setUsuarios(response.data);
      handleCloseNuevoUsuarioModal();
    } catch (error) {
      console.error("Error al crear el nuevo usuario:", error);
    }
  };

  const fetchUsuarios = async () => {
    try {
      const response = await axiosInstance.get("/usuario");
      setUsuarios(response.data);
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleActualizar = (usuario) => {
    setSelectedUsuario(usuario);
    setUpdatedUserData({
      id_usuario: usuario.id_usuario,
      cedula: usuario.cedula,
      nombreUsuario: usuario.nombreUsuario,
      direccion: usuario.direccion,
      telefono: usuario.telefono,
      emailUser: usuario.emailUser,
      id_rol: usuario.id_rol,
      passwordUser: usuario.passwordUser,
    });
    setShowModal(true);
  };

  const handleActualizarClick = async () => {
    try {
      if (
        !validateCedula(updatedUserData.cedula) ||
        !validateNombre(updatedUserData.nombreUsuario) ||
        !validateDireccion(updatedUserData.direccion) ||
        !validateTelefono(updatedUserData.telefono) ||
        !validateEmail(updatedUserData.emailUser)
      ) {
        console.error("Datos de usuario no válidos");
        return;
      }
      await axiosInstance.put(`/usuario/${updatedUserData.id_usuario}`, updatedUserData);
      setShowModal(false);
      fetchUsuarios();
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
    }
  };

  const handleEliminar = async (id) => {
    try {
      await axiosInstance.delete(`/usuario/${id}`);
      fetchUsuarios();
    } catch (error) {
      console.error(`Error al eliminar el usuario con ID ${id}:`, error);
    }
  };

  const getRolString = (id_rol) => {
    switch (id_rol) {
      case 1:
        return "Administrador";
      case 2:
        return "Vendedor";
      case 3:
        return "Cliente";
      default:
        return "Desconocido";
    }
  };

  const filteredUsuarios = usuarios.filter((usuario) =>
    usuario.nombreUsuario.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <NavbarCliente />

      <h1 className="titulolista">LISTA DE USUARIOS</h1>

      <Button variant="success" style={{ margin: "15px 10px" }} onClick={handleMostrarNuevoUsuarioModal}>
        Agregar Nuevo Usuario
      </Button>

      <form className="mb-3">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar usuario..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="button"
            className="btn btn-outline-secondary search-button"
            onClick={() => fetchUsuarios()}
          >
            Buscar
          </button>
        </div>
      </form>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Cedula</th>
            <th>Nombre</th>
            <th>Direccion</th>
            <th>Telefono</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsuarios.map((usuario) => (
            <tr key={usuario.id_usuario}>
              <td>{usuario.id_usuario}</td>
              <td>{usuario.cedula}</td>
              <td>{usuario.nombreUsuario}</td>
              <td>{usuario.direccion}</td>
              <td>{usuario.telefono}</td>
              <td>{usuario.emailUser}</td>
              <td>{getRolString(usuario.id_rol)}</td>
              <td>
                <Button
                  variant="success"
                  onClick={() => handleActualizar(usuario)}
                  style={{
                    backgroundColor: "#a5d6a7",
                    borderColor: "black",
                    color: "black",
                    marginRight: "5px",
                  }}
                >
                  Actualizar
                </Button>
                <Button variant="danger" onClick={() => handleEliminar(usuario.id_usuario)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUsuario && (
            <div>
              <div className="form-group">
                <label>Cedula</label>
                <input
                  type="text"
                  className="form-control"
                  value={updatedUserData.cedula}
                  onChange={(e) =>
                    setUpdatedUserData({
                      ...updatedUserData,
                      cedula: e.target.value,
                    })
                  }
                />
                {!validateCedula(updatedUserData.cedula) && (
                  <span className="error-message">Cédula no válida</span>
                )}
              </div>
              <div className="form-group">
                <label>Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  value={updatedUserData.nombreUsuario}
                  onChange={(e) =>
                    setUpdatedUserData({
                      ...updatedUserData,
                      nombreUsuario: e.target.value,
                    })
                  }
                />
                {!validateNombre(updatedUserData.nombreUsuario) && (
                  <span className="error-message">Nombre no válido</span>
                )}
              </div>
              <div className="form-group">
                <label>Direccion</label>
                <input
                  type="text"
                  className="form-control"
                  value={updatedUserData.direccion}
                  onChange={(e) =>
                    setUpdatedUserData({
                      ...updatedUserData,
                      direccion: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>Telefono</label>
                <input
                  type="text"
                  className="form-control"
                  value={updatedUserData.telefono}
                  onChange={(e) =>
                    setUpdatedUserData({
                      ...updatedUserData,
                      telefono: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="text"
                  className="form-control"
                  value={updatedUserData.emailUser}
                  onChange={(e) =>
                    setUpdatedUserData({
                      ...updatedUserData,
                      emailUser: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>Rol</label>
                <input
                  type="text"
                  className="form-control"
                  value={updatedUserData.id_rol}
                  onChange={(e) =>
                    setUpdatedUserData({
                      ...updatedUserData,
                      id_rol: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleActualizarClick}>
            Actualizar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showNuevoUsuarioModal} onHide={handleCloseNuevoUsuarioModal}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Nuevo Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label>Cedula</label>
            <input
              type="text"
              className="form-control"
              value={nuevoUsuarioData.cedula}
              onChange={(e) =>
                setNuevoUsuarioData({
                  ...nuevoUsuarioData,
                  cedula: e.target.value,
                })
              }
            />
            {!validateCedula(nuevoUsuarioData.cedula) && (
              <span className="error-message">Cédula no válida</span>
            )}
          </div>

          <div className="form-group">
            <label>Nombre</label>
            <input
              type="text"
              className="form-control"
              value={nuevoUsuarioData.nombreUsuario}
              onChange={(e) =>
                setNuevoUsuarioData({
                  ...nuevoUsuarioData,
                  nombreUsuario: e.target.value,
                })
              }
            />
            {!validateNombre(nuevoUsuarioData.nombreUsuario) && (
              <span className="error-message">Nombre no válido</span>
            )}
          </div>

          <div className="form-group">
            <label>Direccion</label>
            <input
              type="text"
              className="form-control"
              value={nuevoUsuarioData.direccion}
              onChange={(e) =>
                setNuevoUsuarioData({
                  ...nuevoUsuarioData,
                  direccion: e.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <label>Telefono</label>
            <input
              type="text"
              className="form-control"
              value={nuevoUsuarioData.telefono}
              onChange={(e) =>
                setNuevoUsuarioData({
                  ...nuevoUsuarioData,
                  telefono: e.target.value,
                })
              }
            />
          </div>
          <div className="form-group">
            <label>Rol</label>
            <input
              type="text"
              className="form-control"
              value={nuevoUsuarioData.id_rol}
              onChange={(e) =>
                setNuevoUsuarioData({
                  ...nuevoUsuarioData,
                  id_rol: e.target.value,
                })
              }
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="text"
              className="form-control"
              value={nuevoUsuarioData.emailUser}
              onChange={(e) =>
                setNuevoUsuarioData({
                  ...nuevoUsuarioData,
                  emailUser: e.target.value,
                })
              }
            />
            {!validateEmail(nuevoUsuarioData.emailUser) && (
              <span className="error-message">Correo electrónico no válido</span>
            )}
          </div>
          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="text"
              className="form-control"
              value={nuevoUsuarioData.passwordUser}
              onChange={(e) =>
                setNuevoUsuarioData({
                  ...nuevoUsuarioData,
                  passwordUser: e.target.value,
                })
              }
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseNuevoUsuarioModal}>
            Cancelar
          </Button>
          <Button variant="success" onClick={handleGuardarNuevoUsuario}>
            Guardar Nuevo Usuario
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
