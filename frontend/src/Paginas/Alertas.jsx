import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

// Importa tu logo aquí

const Alertas = () => {
  const [alertas, setAlertas] = useState([]);

  useEffect(() => {
    const fetchAlertas = async () => {
      // Simulate API call
      setTimeout(async () => {
        try {
          const response = await axios.get("http://localhost:4000/api/alerta");
          setAlertas(response.data);
        } catch (error) {
          console.error("Error al obtener las alertas:", error);
        }
      }, 1000);
    };

    fetchAlertas();
  }, []);

  const getCellStyle = (tipoAlerta) => {
    switch (tipoAlerta) {
      case "Caducidad":
        return { backgroundColor: "#CB515D" };
      case "Próximo a caducar":
        return { backgroundColor: "#EAC454" };
      default:
        return {};
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 text-center">
          <h1>Informe de alertas</h1>
        </div>
      </div>
      {/* Botón para descargar PDF */}
      <div className="row">
        <div className="col-12 text-center mb-3">
          {/* <button className="btn btn-primary" onClick={handleDownloadPDF}>
            Descargar PDF
          </button> */}
        </div>
      </div>
      {/* Tabla de alertas */}
      <div className="row">
        <div className="col-12">
          <table
            id="alertasTable"
            className="table table-bordered table-striped"
          >
            <thead>
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
              {alertas && alertas.length > 0 ? (
                alertas.map((alerta) => (
                  <tr key={alerta.id_alerta}>
                    <td>{alerta.id_alerta}</td>
                    <td style={getCellStyle(alerta.tipoAlerta)}>
                      {alerta.tipoAlerta}
                    </td>
                    <td style={getCellStyle(alerta.tipoAlerta)}>
                      {alerta.descripcion}
                    </td>
                    <td style={getCellStyle(alerta.tipoAlerta)}>
                      {alerta.fechaAlerta}
                    </td>
                    <td style={getCellStyle(alerta.tipoAlerta)}>
                      {alerta.estado}
                    </td>
                    <td style={getCellStyle(alerta.tipoAlerta)}>
                      {alerta.id_inventario}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No hay medicamentos próximos a caducar.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Alertas;
