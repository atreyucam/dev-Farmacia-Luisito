const express = require('express');

// controladores
const rol = require('../controllers/RolController');
const usuario = require('../controllers/UsuarioController');
const tipoMedicamento = require('../controllers/TipoMedicamentoController');
const medicamento = require('../controllers/MedicamentoController');
const recetaMedica = require('../controllers/RecetaMedicaController');
const pedidoPendiente = require('../controllers/PedidoPendienteController');
const carritoCompra = require('../controllers/CarritoComprasController');
const detalleCarrito = require('../controllers/DetalleCarritoController');
const venta = require('../controllers/VentaController');
const detalleVenta = require('../controllers/DetalleVentaController');
const inventario = require('../controllers/InventarioController');
const proveedor = require('../controllers/ProveedorController');
const compra = require('../controllers/CompraProveedorController');
const detalleCompra = require('../controllers/DetalleCompraController');
const alerta = require('../controllers/AlertaController');

// inicio
const router = express.Router();

// rutas
// 
// 1. Rutas - rol
router.post('/rol', rol.crearRol);
router.get('/rol', rol.obtenerRoles);
router.get('/rol/:id', rol.obtenerRolesporId);
router.put('/rol/:id', rol.actualizarRol);
router.delete('/rol/:id', rol.eliminarRol);

// 2. Rutas - usuario
router.post('/usuario', usuario.crearUsuario);
router.get('/usuario', usuario.obtenerUsuarios);
router.get('/usuario/:id', usuario.obtenerUsuarioporId);
router.put('/usuario/:id', usuario.actualizarUsuario);
router.delete('/usuario/:id', usuario.eliminarUsuario);

// 3. Rutas - tipoMedicamento
router.post('/tipoMedicamento', tipoMedicamento.crearTipoMedicamento);
router.get('/tipoMedicamento', tipoMedicamento.obtenerTipoMedicamentos);
router.get('/tipoMedicamento/:id', tipoMedicamento.obtenerTipoMedicamentoporId);
router.put('/tipoMedicamento/:id', tipoMedicamento.actualizarTipoMedicamento);
router.delete('/tipoMedicamento/:id', tipoMedicamento.eliminarTipoMedicamento);

// 4. Rutas - Medicamento
router.post('/medicamento', medicamento.crearMedicamento);
router.get('/medicamento', medicamento.obtenerMedicamentos);
router.get('/medicamento/:id', medicamento.obtenerMedicamentoporId);
router.put('/medicamento/:id', medicamento.actualizarMedicamento);
router.delete('/medicamento/:id', medicamento.eliminarMedicamento);

// 5. Rutas - recetaMedica
router.post('/recetaMedica', recetaMedica.crearRecetaMedica);
router.get('/recetaMedica', recetaMedica.obtenerRecetasMedicas);
router.get('/recetaMedica/:id', recetaMedica.obtenerRecetaMedicaporId);
router.put('/recetaMedica/:id', recetaMedica.actualizarRecetaMedica);
router.delete('/recetaMedica/:id', recetaMedica.eliminarRecetaMedica);

// 6. Rutas - pedidoPendiente
router.post('/pedidoPendiente', pedidoPendiente.crearPedidoPendiente);
router.get('/pedidoPendiente', pedidoPendiente.obtenerPedidosPendientes);
router.get('/pedidoPendiente/:id', pedidoPendiente.obtenerPedidoPendienteporId);
router.put('/pedidoPendiente/:id', pedidoPendiente.actualizarPedidoPendiente);
router.delete('/pedidoPendiente/:id', pedidoPendiente.eliminarPedidoPendiente);

// 7. Rutas - carritoCompra
router.post('/carritoCompra', carritoCompra.crearCarrito);
router.get('/carritoCompra', carritoCompra.obtenerCarritos);
router.get('/carritoCompra/:id', carritoCompra.obtenerCarritoporId);
router.put('/carritoCompra/:id', carritoCompra.actualzarCarrito);
router.delete('/carritoCompra/:id', carritoCompra.eliminarCarrito);

// 8. Rutas - detalleCarrito
router.post('/detalleCarrito', detalleCarrito.crearDetalleCarrito);
router.get('/detalleCarrito', detalleCarrito.obtenerDetalleCarritos);
router.get('/detalleCarrito/:id', detalleCarrito.obtenerDetalleCarritoporId);
router.put('/detalleCarrito/:id', detalleCarrito.actualzarDetalleCarrito);
router.delete('/detalleCarrito/:id', detalleCarrito.eliminarDetalleCarrito);

// 9. Rutas - venta
router.post('/venta', venta.crearVenta);
router.get('/venta', venta.obtenerVentas);
router.get('/venta/:id', venta.obtenerVentaporId);
router.put('/venta/:id', venta.actualzarVenta);
router.delete('/venta/:id', venta.eliminarVenta);

// 10. Rutas - detalleVenta
router.post('/detalleVenta', detalleVenta.crearDetalleVenta);
router.get('/detalleVenta', detalleVenta.obtenerDetallesVentas);
router.get('/detalleVenta/:id', detalleVenta.obtenerDetalleVentaporId);
router.put('/detalleVenta/:id', detalleVenta.actualzarDetalleVenta);
router.delete('/detalleVenta/:id', detalleVenta.eliminarDetalleVenta);

// 11. Rutas - inventario
router.post('/inventario', inventario.crearInventario);
router.get('/inventario', inventario.listarInventario);
router.get('/inventario/:id', inventario.obtenerInventarioporId);
router.put('/inventario/:id', inventario.actualzarInventario);
router.delete('/inventario/:id', inventario.eliminarInventario);

// 12. Rutas - proveedor
router.post('/proveedor', proveedor.crearProveedor);
router.get('/proveedor', proveedor.obtenerProveedores);
router.get('/proveedor/:id', proveedor.obtenerProveedorporId);
router.put('/proveedor/:id', proveedor.actualizarProveedor);
router.delete('/proveedor/:id', proveedor.eliminarProveedor);

// 13. Rutas - compra
router.post('/compra', compra.crearCompra);
router.get('/compra', compra.obtenerCompras);
router.get('/compra/:id', compra.obtenerCompraporId);
router.put('/compra/:id', compra.actualizarCompra);
router.delete('/compra/:id', compra.eliminarCompra);

// 14. Rutas - detalleCompra
router.post('/detalleCompra', detalleCompra.crearDetalleCompra);
router.get('/detalleCompra', detalleCompra.obtenerAllDetalleCompras);
router.get('/detalleCompra/:id', detalleCompra.obtenerDetalleCompraporId);
router.put('/detalleCompra/:id', detalleCompra.actualizarDetalleCompra);
router.delete('/detalleCompra/:id', detalleCompra.eliminarDetalleCompra);

// 15. Rutas - alerta
router.post('/alerta', alerta.crearAlerta);
router.get('/alerta', alerta.obtenerAlertas);
router.get('/alerta/:id', alerta.obtenerAlertaporId);
router.put('/alerta/:id', alerta.actualizarAlerta);
router.delete('/alerta/:id', alerta.eliminarAlerta);

// export
module.exports = router;