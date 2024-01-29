import React, { useState } from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { getOrderStatus } from '../lib/helpers';

export default function Products() {
  const [recentOrderData, setRecentOrderData] = useState([
    {
      id: '1',
      product_id: 'Luis',
      customer_id: 'Luis',
      customer_name: '0987456321',
      order_date: '2022-05-17T03:24:00',
      order_total: '$435.50',
      current_order_status: 'PLACED',
      shipment_address: '147828899-0'
    },
    {
        id: '2',
        product_id: 'Ana',
        customer_id: 'Ana',
        customer_name: '0123456789',
        order_date: '2022-05-18T09:15:00',
        order_total: '$120.75',
        current_order_status: 'CONFIRMED',
        shipment_address: '987654321-0'
      },
      {
        id: '3',
        product_id: 'Carlos',
        customer_id: 'Carlos',
        customer_name: '0765432198',
        order_date: '2022-05-19T12:45:00',
        order_total: '$789.99',
        current_order_status: 'SHIPPED',
        shipment_address: '123456789-0'
      },
      {
        id: '4',
        product_id: 'María',
        customer_id: 'María',
        customer_name: '0123456789',
        order_date: '2022-05-20T15:30:00',
        order_total: '$245.30',
        current_order_status: 'OUT_FOR_DELIVERY',
        shipment_address: '147852369-0'
      },
      {
        id: '5',
        product_id: 'Pedro',
        customer_id: 'Pedro',
        customer_name: '0987654321',
        order_date: '2022-05-21T18:20:00',
        order_total: '$560.45',
        current_order_status: 'DELIVERED',
        shipment_address: '987654321-0'
      }
      
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newOrder, setNewOrder] = useState({
    Nombre: '',
    orderDate: '',
    orderTotal: '',
    shippingAddress: ''
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value
    }));
  };

  const handleSaveOrder = () => {
    // Guarda el nuevo pedido en la lista existente
    const updatedOrders = [
      ...recentOrderData,
      {
        id: (recentOrderData.length + 1).toString(),
        product_id: newOrder.product,
        customer_id: '',
        customer_name: '',
        order_date: new Date(newOrder.orderDate), // Convierte la fecha a un objeto Date
        order_total: newOrder.orderTotal,
        current_order_status: 'PLACED',
        shipment_address: newOrder.shippingAddress
      }
    ];

    // Actualiza el estado de la lista de pedidos
    setRecentOrderData(updatedOrders);

    // Luego, cierra la ventana emergente y reinicia los datos del nuevo pedido
    closeModal();
    setNewOrder({
      Nombre: '',
      orderDate: '',
      orderTotal: '',
      shippingAddress: ''
    });
  };

  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
      <strong className="text-2xl text-gray-700 font-medium mb-2">Medicamentos</strong>
      <div className="space-x-2">
        <button onClick={openModal} className="bg-blue-500 text-white px-4 py-2 rounded">
          Agregar
        </button>
        <button className="bg-yellow-500 text-white px-4 py-2 rounded">Editar</button>
        <button className="bg-red-500 text-white px-4 py-2 rounded">Eliminar</button>
        {/* Otros botones */}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-gray-800 bg-opacity-75 absolute inset-0" onClick={closeModal}></div>
          <div className="bg-white p-6 rounded-lg z-10">
            <div>
              <label htmlFor="product">Nombre:</label>
              <input
                type="text"
                id="product"
                name="product"
                value={newOrder.product}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="orderDate">Order Date:</label>
              <input
                type="date"  
                id="orderDate"
                name="orderDate"
                value={newOrder.orderDate}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="orderTotal">Order Total:</label>
              <input
                type="text"
                id="orderTotal"
                name="orderTotal"
                value={newOrder.orderTotal}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="shippingAddress">Shipping Address:</label>
              <input
                type="text"
                id="shippingAddress"
                name="shippingAddress"
                value={newOrder.shippingAddress}
                onChange={handleInputChange}
              />
            </div>
            <button
              onClick={handleSaveOrder}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
            >
              Guardar Pedido
            </button>
          </div>
        </div>
      )}

      <div className="border-x border-gray-200 rounded-sm mt-3">
        <table className="w-full text-gray-700">
          <thead>
            <tr>
              <th>ID Proveedores</th>
              <th>Nombre</th>
              <th>Telefono</th>
              <th>Fecha Inicio</th>
              <th>Total</th>
              <th>RUC</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {recentOrderData.map((order) => (
              <tr key={order.id}>
                <td>
                  <Link to={`/order/${order.id}`}>#{order.id}</Link>
                </td>
                <td>
                  <Link to={`/product/${order.product_id}`}>#{order.product_id}</Link>
                </td>
                <td>
                  <Link to={`/customer/${order.customer_id}`}>{order.customer_name}</Link>
                </td>
                <td>{format(new Date(order.order_date), 'dd MMM yyyy')}</td>
                <td>{order.order_total}</td>
                <td>{order.shipment_address}</td>
                <td>{getOrderStatus(order.current_order_status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
