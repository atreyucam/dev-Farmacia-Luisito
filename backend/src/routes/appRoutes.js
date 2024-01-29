const express = require('express');
const upload = require('../config/multerConfig');

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
const configuracion = require('../controllers/ConfiguracionController');
const sesionChat = require('../controllers/SesionesChatbotController');
const mensajeChat = require('../controllers/MensajesChatController');
const arcsa = require('../controllers/ControlARCSAcontroller');
const medProv = require('../controllers/MedProvController');
// Para importaciones de archivos excel.
const uploadTipos = require('../controllers/Importaciones/uploadTipoMedicamentos');
const uploadExcel = require('../controllers/uploadController');

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
router.post('/registro', usuario.register);
router.post('/login', usuario.login);
// 
router.get('/usuario', usuario.obtenerUsuarios);
router.get('/usuario/:id', usuario.obtenerUsuarioporId);
router.get('/usuarioCedula/:cedula', usuario.buscarPorCedula);
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
router.post('/realizarVenta', venta.realizarVenta);
router.get('/venta', venta.obtenerVentas);
router.get('/obtenerVenta/:id', venta.obtenerVentaporId);
router.put('/venta/:id', venta.actualzarVenta);
router.delete('/venta/:id', venta.eliminarVenta);
router.get('/venta/:id/factura', venta.generarFacturaPDF);

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

// 16. Rutas - configuracion
router.post('/configuracion', configuracion.crearConfiguracion);
router.get('/configuracion', configuracion.obtenerConfiguraciones);
router.get('/configuracion/:id', configuracion.obtenerConfiguracionporId);
router.put('/configuracion/:id', configuracion.actualzarConfiguracion);
router.delete('/configuracion/:id', configuracion.eliminarConfiguracion);

// 17. Rutas - sesionesChat
router.post('/sesionChat', sesionChat.crearSesion);
router.get('/sesionChat', sesionChat.obtenerSesiones);
router.get('/sesionChat/:id', sesionChat.obtenerSesionesporId);
router.put('/sesionChat/:id', sesionChat.actualizarSesion);
router.delete('/sesionChat/:id', sesionChat.eliminarSesion);

// 18. Rutas - mensajeChat
router.post('/mensajeChat', mensajeChat.crearMensaje);
router.get('/mensajeChat', mensajeChat.obtenerMensajes);
router.get('/mensajeChat/:id', mensajeChat.obtenerMensajesporId);
router.put('/mensajeChat/:id', mensajeChat.actualizarMensaje);
router.delete('/mensajeChat/:id', mensajeChat.eliminarMensaje);

// 19. Rutas - ControlARCSA
router.post('/arcsa', arcsa.crearControl);
router.get('/arcsa', arcsa.obtenerControles);
router.get('/arcsa/:id', arcsa.obtenerControlporId);
router.put('/arcsa/:id', arcsa.actualizarControl);
router.delete('/arcsa/:id', arcsa.eliminarControl);

// 20. Rutas - medProv
router.post('/medProv', medProv.crearMedProv);
router.get('/medProv', medProv.obtenerAll_MedProv);
router.get('/medProv/:id', medProv.obtenerMedProvporId);
router.put('/medProv/:id', medProv.actualizarMedProv);
router.delete('/medProv/:id', medProv.eliminarMedProv);

// 
// Ruta para importaciones de archivos excel
router.post('/importarTipos', upload.single('archivo'), uploadTipos.importarTipos);
router.post('/importarDatos', upload.single('archivo'), uploadExcel.importarDatos);

// export
module.exports = router;