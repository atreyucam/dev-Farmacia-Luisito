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
        const cantidadMedicamento = cantidad[medicamento.id_medicamento] || 0;
        setVenta({
            ...venta,
            detallesVenta: [...venta.detallesVenta, { id_medicamento: medicamento.id_medicamento, cantidad: cantidadMedicamento }]
        });
    };

    // const realizarVenta = async () => {
    //     try {
    //         console.log("Datos de la venta a realizar:", venta);    
    //         await axios.post('http://localhost:4000/api/realizarVenta', venta);
    //         alert('Venta realizada con éxito');
    //         // Resetear el estado para una nueva venta
    //         setVenta({ id_usuario: null, detallesVenta: [] });
    //     } catch (error) {
    //         console.error('Error al realizar la venta:', error);
    //     }
    // };
    const realizarVentaYDescargarFactura = async () => {
        try {
            // Realizar la venta
            const ventaResponse = await axios.post('http://localhost:4000/api/realizarVenta', venta);
            const idVenta = ventaResponse.data.datosVenta.venta.id_venta; 
            // console.log(ventaResponse);

            // Solicitar la generación de la factura
            const facturaResponse = await axios.get(`http://localhost:4000/api/venta/${idVenta}/factura`, { responseType: 'blob' });
            
            // // Crear un enlace para descargar la factura
            const url = window.URL.createObjectURL(new Blob([facturaResponse.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `factura-${idVenta}.pdf`);
            document.body.appendChild(link);
            link.click();
    
            // // Limpiar
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
    
            // // Restablecer el estado para una nueva venta
            // setCedulaCliente(''); // Limpia la cédula del cliente
            // setCliente(null); // Restablece el cliente a null
            // setVenta({ id_usuario: null, detallesVenta: [] }); // Restablece los detalles de la venta
            // setCantidad({}); // Limpia las cantidades seleccionadas
        } catch (error) {
            console.error('Error al realizar la venta o al descargar la factura:', error);
        }
    };
    

    return (
        <Container fluid>
            
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
                                        value={cantidad[medicamento.id_medicamento] || 0}
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
            <Button variant="success" onClick={realizarVentaYDescargarFactura}>Realizar Venta</Button>
        </Container>
    );
};

export default Ventas;
