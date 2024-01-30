import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Card } from "react-bootstrap";
import NavbarCliente from "../Componentes/NavbarCLiente";

export default function ProductosGeneral() {
  /* Inicio de la lógica */

  const [medicamentos, setMedicamentos] = useState([]);

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

  /* Fin de la lógica */

  return (
    <div>
        <NavbarCliente></NavbarCliente>
      {medicamentos.map((medicamento, index) => (
        <Card key={index} style={{ width: '18rem', margin: '1rem' }}>
          <Card.Img variant="top" src={medicamento.urlImagen} />
          <Card.Body>
            <Card.Title>{medicamento.nombreMedicamento}</Card.Title>
            <Card.Text>
              Precio: ${medicamento.precioVenta}
            </Card.Text>
            <Button variant="primary">Comprar</Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}
