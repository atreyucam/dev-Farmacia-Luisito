// Componente Ventas.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert, ListGroup, Row, Col, InputGroup } from 'react-bootstrap';


const Ventas = () => {
    const [cedulaCliente, setCedulaCliente] = useState('');
    const [cliente, setCliente] = useState(null);
    const [medicamentos, setMedicamentos] = useState([]);
    const [error, setError] = useState('');
    const [venta, setVenta] = useState({
        id_usuario: null,
        detallesVenta: []
    });
    const [cantidad, setCantidad] = useState({});

    const buscarCliente = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/usuarioCedula/${cedulaCliente}`);
            setCliente(response.data);
            setVenta({ ...venta, id_usuario: response.data.id_usuario });
            setError('');
        } catch (error) {
            setError('Cliente no encontrado');
            console.error('Error al buscar cliente:', error);
        }
    };

    const handleCantidadChange = (idMedicamento, value) => {
        setCantidad({ ...cantidad, [idMedicamento]: value });
    };

    const obtenerMedicamentos = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/medicamento');
            setMedicamentos(response.data);
            console.log(response);
        } catch (error) {
            console.error('Error al obtener medicamentos', error);
        }
    };

    const agregarMedicamentoVenta = (medicamento) => {
        const cantidadMedicamento = cantidad[medicamento.id_medicamento] || 1;
        setVenta({
            ...venta,
            detallesVenta: [...venta.detallesVenta, { id_medicamento: medicamento.id_medicamento, cantidad: cantidadMedicamento }]
        });
    };

    const realizarVenta = async () => {
        try {
            console.log("Datos de la venta a realizar:", venta);    
            await axios.post('http://localhost:4000/api/realizarVenta', venta);
            alert('Venta realizada con éxito');
            // Resetear el estado para una nueva venta
            setVenta({ id_usuario: null, detallesVenta: [] });
        } catch (error) {
            console.error('Error al realizar la venta:', error);
        }
    };

    return (
        <Container>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Cédula del Cliente</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingrese la cédula del cliente"
                        value={cedulaCliente}
                        onChange={(e) => setCedulaCliente(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" onClick={buscarCliente}>Buscar Cliente</Button>
            </Form>
            {error && <Alert variant="danger">{error}</Alert>}
            {cliente && <div>Cliente: {cliente.nombreUsuario}</div>}
            <Button variant="secondary" onClick={obtenerMedicamentos}>Cargar Medicamentos</Button>
            <ListGroup>
                {medicamentos.map((medicamento, index) => (
                    <ListGroup.Item key={index}>
                        {medicamento.nombreMedicamento} - {medicamento.precioVenta}
                        <Row className="align-items-center">
                            <Col md={4}>
                                <InputGroup>
                                    <Form.Control
                                        type="number"
                                        value={cantidad[medicamento.id_medicamento] || 1}
                                        onChange={(e) => handleCantidadChange(medicamento.id_medicamento, e.target.value)}
                                        min={1}
                                    />
                                    <Button variant="success" onClick={() => agregarMedicamentoVenta(medicamento)}>
                                        Agregar a la Venta
                                    </Button>
                                </InputGroup>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                ))}
            </ListGroup>
            <Button variant="success" onClick={realizarVenta}>Realizar Venta</Button>
        </Container>
    );
};

export default Ventas;
