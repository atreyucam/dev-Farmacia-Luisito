const {DataTypes} = require('sequelize');
const {sequelize} = require('../config/database');

// 1. Tabla roles
const Rol = sequelize.define('Rol',{
    id_rol:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombreRol: {type: DataTypes.STRING(20), allowNull: false},
},{tableName: "Roles"});

// 2. Tabla Usuarios
const Usuario = sequelize.define('Usuario',{
    id_usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    cedula: {type: DataTypes.STRING, allowNull: false, unique: true},
    nombreUsuario: {type: DataTypes.STRING(50), allowNull: false},
    direccion: {type: DataTypes.STRING(100), allowNull: false},
    telefono: {type: DataTypes.STRING, allowNull: false},
    emailUser: {type: DataTypes.STRING(50), allowNull:false, unique: true},
    passwordUser: {type: DataTypes.STRING(60), allowNull: false},
},{tableName: 'Usuarios'});

// 3. Tabla TipoMedicamento
const TipoMedicamento = sequelize.define('TipoMedicamento',{
    id_tipoMedicamento:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    categoria: {type: DataTypes.STRING(15), allowNull:false},
    descripcionTipo: {type: DataTypes.STRING(50), allowNull: false},
    requiereReceta: { type: DataTypes.BOOLEAN, allowNull: false},
},{tableName: 'TipoMedicamentos'});

// 4. Tabla Medicamentos
const Medicamento = sequelize.define('Medicamentos',{
    id_medicamento:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombreMedicamento: {type: DataTypes.STRING(50), allowNull: false},
    // descripcion: {type: DataTypes.STRING, allowNull: false},
    precioVenta: {type: DataTypes.DECIMAL, allowNull: true},
    exentoIVA: {type: DataTypes.BOOLEAN, allowNull: true},
    urlImagen : {type: DataTypes.STRING, allowNull: true}
},{tableName:'Medicamentos'});

// 5. Tabla RecetaMedica
const RecetaMedica = sequelize.define('RecetaMedica',{
    id_receta:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    nombreMedico: { type: DataTypes.STRING(50), allowNull: false},
    fechaEmision: { type: DataTypes.DATEONLY, allowNull: false},
},{tableName: "RecetasMedicas"});

// 6. Tabla PedidosPendientes
const PedidoPendiente = sequelize.define('PedidoPendiente',{
    id_pedido:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    detallePedido: {type: DataTypes.STRING(80), allowNull: false},
    estadoPedido: {type: DataTypes.STRING(30), allowNull: false},
    fechaPedido: {type: DataTypes.DATEONLY, allowNull: false},
},{tableName: 'PedidosPendientes'});

// 7 Tabla CarritoCompras
const CarritoCompra = sequelize.define('CarritoCompra',{
    id_carrito:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    fechaCreacion: {type: DataTypes.DATEONLY, allowNull: false},
    estado: {type: DataTypes.STRING(30), allowNull: false},
},{tableName: 'CarritoCompra'});

// 8. Tabla DetalleCarritoCompra
const DetalleCarrito = sequelize.define('DetalleCarrito',{
    id_detalleCarrito:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    cantidad: {type: DataTypes.INTEGER, allowNull: false},
    precio: {type: DataTypes.DECIMAL, allowNull: false},
},{tableName:'DetalleCarrito'});

// 9. tabla Ventas
const Venta = sequelize.define('Venta',{
    id_venta: {
        type: DataTypes.INTEGER,
        primaryKey:  true,
        autoIncrement: true,
    },
    numFacturaVenta: {type: DataTypes.INTEGER, allowNull: false},
    fechaVenta: {type: DataTypes.DATEONLY, allowNull: false},
    subtotalVenta: {type: DataTypes.DECIMAL, allowNull: false},
    descuentoVenta: {type: DataTypes.DECIMAL, allowNull: false},
    IVA: {type: DataTypes.DECIMAL, allowNull: false},
    totalVenta: {type: DataTypes.DECIMAL, allowNull: false},
},{tableName: 'Ventas'});

// 10. tabla DetalleVenta
const DetalleVenta = sequelize.define('DetalleVenta',{
    id_detalleVenta:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    cantidad: {type: DataTypes.INTEGER, allowNull: false},
    precio:{type: DataTypes.DECIMAL, allowNull: false},
},{tableName: 'detalleVenta'});

// 11. Tabla Inventario
const Inventario = sequelize.define('Inventario',{
    id_inventario:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    numeroLote: {type: DataTypes.STRING(25), allowNull:false, unique: true},
    precioCompra: {type: DataTypes.DECIMAL, allowNull: false},
    cantidadDisponible: {type: DataTypes.INTEGER, allowNull: false},
    fechaCaducidad: {type: DataTypes.DATEONLY, allowNull: false},
},{tableName: 'Inventario'});

//  12 Tabla Proveedores
const Proveedor = sequelize.define('Proveedor',{
    id_proveedor: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    ruc: { type: DataTypes.STRING, allowNull: false, unique: true},
    nombreProveedor: {type: DataTypes.STRING(40), allowNull: false},
    direccion: {type: DataTypes.STRING(80), allowNull: false},
    telefono: {type: DataTypes.STRING, allowNull: false},
    emailProveedor: { type: DataTypes.STRING, allowNull: false},
},{tableName: 'Proveedores'});

// 13. Tabla CompraProveedores
const CompraProveedor = sequelize.define('CompraProveedor',{
    id_compraProveedor:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    fechaCompra: {type: DataTypes.DATEONLY, allowNull: false},
    numFacturaCompra: {type: DataTypes.INTEGER, allowNull: false},
    subtotalCommpra: {type: DataTypes.DECIMAL, allowNull: false},
    descuentoCompra: {type: DataTypes.DECIMAL, allowNull: false},
    IVA_compra: {type: DataTypes.DECIMAL, allowNull: false},
    totalCompra: {type: DataTypes.DECIMAL, allowNull: false},
},{tableName:'CompraProveedores'});

// 14. tabla DetalleCompra
const DetalleCompra = sequelize.define('DetalleCompra',{
    id_detalleCompra:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    cantidad: {type: DataTypes.INTEGER, allowNull: false},
    precio:{type: DataTypes.DECIMAL, allowNull: false},
},{tableName:'detalleCompra'});

// 15. tabla Alertas
const Alerta = sequelize.define('Alerta',{
    id_alerta:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    tipoAlerta: {type: DataTypes.STRING(50), allowNull: false},
    descripcion: {type: DataTypes.STRING(100), allowNull: false},
    fechaAlerta: {type: DataTypes.DATEONLY, allowNull: false},
    estado: {type:DataTypes.STRING, allowNull: false},
},{tableName: 'Alertas'});

// 16. Tabla configuracion
const Configuracion = sequelize.define('Configuracion',{
    id_configuracion:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombreConfig: {type: DataTypes.STRING(30), allowNull: false},
    valor: {type: DataTypes.STRING(30),allowNull: false},
},{tableName:'Configuraciones'});

// 17. Tabla Conversacion Chatbot
const SesionChatbot = sequelize.define('SesionChatbot',{
    id_sesionChatbot:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    fechaHoraInicio: {type: DataTypes.DATEONLY, allowNull: false},
    fechaHoraFin: {type: DataTypes.DATE, allowNull: false},
},{tableName: 'SesionChatbot'});

// 18. Tabla mensajes Chatbot
const MensajesChatbot = sequelize.define('MensajesChatbot',{
    id_mensaje: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    textoMensaje: {type: DataTypes.STRING, allowNull:true},
    fechaHoraMensaje: {type: DataTypes.DATE, allowNull: false},
},{tableName: 'MensajesChatbot'});

// 19. tabla ControlArcsa
const ControlARCSA = sequelize.define('ControlARCSA',{
    id_controlARCSA: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    cantidadVendida: {type: DataTypes.INTEGER, allowNull: false},
    fechaVenta: {type: DataTypes.DATEONLY, allowNull: false},
},{tableName:'ControlARCSA'});

// 20. tablaMedicamentoProveedor    
const MedicamentoProveedor = sequelize.define('MedicamentoProveedor',{
    id_medicamentoProveedor:{
        type: DataTypes.INTEGER,
        primaryKey: true, 
        autoIncrement: true,
    },
},{tableName:'MedicamentoProveedor'});

// -------------------------------------------------------------------
// RELACIONES - TABLAS
// 
// relacion Rol - Usuario
Rol.hasMany(Usuario,{foreignKey: 'id_rol'});
Usuario.belongsTo(Rol,{foreignKey: 'id_rol'});

// Relacion Medicamentos - tipoMedicamentos
TipoMedicamento.hasMany(Medicamento,{foreignKey: 'id_tipoMedicamento'});
Medicamento.belongsTo(TipoMedicamento,{foreignKey: 'id_tipoMedicamento'});

// Usuario - recetaMedica
Usuario.hasMany(RecetaMedica, { foreignKey: 'id_usuario' });
RecetaMedica.belongsTo(Usuario, { foreignKey: 'id_usuario' });
// Usuario - PedidoPendiente
Usuario.hasMany(PedidoPendiente);
PedidoPendiente.belongsTo(Usuario);

// Usuario - CarritoCompra
Usuario.hasMany(CarritoCompra);
CarritoCompra.belongsTo(Usuario);

// carritoCompra - detalleCarrito
CarritoCompra.hasMany(DetalleCarrito, { foreignKey: 'id_carrito' });
DetalleCarrito.belongsTo(CarritoCompra, { foreignKey: 'id_carrito' });

// Usuario - Venta
Usuario.hasMany(Venta, { foreignKey: 'id_usuario' }); // Si se asocia la venta a un usuario.
Venta.belongsTo(Usuario, { foreignKey: 'id_usuario' });

// Venta - detalleVenta
Venta.hasMany(DetalleVenta, { foreignKey: 'id_venta' });
DetalleVenta.belongsTo(Venta, { foreignKey: 'id_venta' });

// Medicamento - inventario
Medicamento.hasMany(Inventario, { foreignKey: 'id_medicamento' });
Inventario.belongsTo(Medicamento, { foreignKey: 'id_medicamento' });

// Proveedor - CompraProveedor
Proveedor.hasMany(CompraProveedor, { foreignKey: 'id_proveedor' });
CompraProveedor.belongsTo(Proveedor, { foreignKey: 'id_proveedor' });

// CompraProveedor - detalleCompra
CompraProveedor.hasMany(DetalleCompra, { foreignKey: 'id_compraProveedor' });
DetalleCompra.belongsTo(CompraProveedor, { foreignKey: 'id_compraProveedor' });

// Medicamento = detalleCompra
Medicamento.hasMany(DetalleCompra, { foreignKey: 'id_medicamento' });
DetalleCompra.belongsTo(Medicamento, { foreignKey: 'id_medicamento' });

// Medicamento - detalleVenta
Medicamento.hasMany(DetalleVenta, { foreignKey: 'id_medicamento' });
DetalleVenta.belongsTo(Medicamento, { foreignKey: 'id_medicamento' });

// Inventario - Alerta
Inventario.hasMany(Alerta, { foreignKey: 'id_inventario' });
Alerta.belongsTo(Inventario, { foreignKey: 'id_inventario' });

// SessionChat = MensajesChat
SesionChatbot.hasMany(MensajesChatbot, { foreignKey: 'id_sesionChatbot' });
MensajesChatbot.belongsTo(SesionChatbot, { foreignKey: 'id_sesionChatbot' });

// Medicamentos - ControlARCSA
Medicamento.hasMany(ControlARCSA, { foreignKey: 'id_medicamento' });
ControlARCSA.belongsTo(Medicamento, { foreignKey: 'id_medicamento' });

// Venta = ControlARCSA
Venta.hasMany(ControlARCSA, { foreignKey: 'id_venta' });
ControlARCSA.belongsTo(Venta, { foreignKey: 'id_venta' });
RecetaMedica.hasMany(ControlARCSA, { foreignKey: 'id_receta' });
ControlARCSA.belongsTo(RecetaMedica, { foreignKey: 'id_receta' });
Usuario.hasMany(ControlARCSA, { foreignKey: 'id_usuario' });
ControlARCSA.belongsTo(Usuario, { foreignKey: 'id_usuario' });

// Medicamento = MedicamentoProveedor
Medicamento.hasMany(MedicamentoProveedor, { foreignKey: 'id_medicamento'});
MedicamentoProveedor.belongsTo(Medicamento, { foreignKey: 'id_medicamento' });
// Proveedor - MedicamentoProveedor
Proveedor.hasMany(MedicamentoProveedor, { foreignKey: 'id_proveedor' });
MedicamentoProveedor.belongsTo(Proveedor, { foreignKey: 'id_proveedor' })

module.exports = {
    Rol,
    Usuario,
    TipoMedicamento,
    Medicamento,
    RecetaMedica,
    Proveedor,
    PedidoPendiente,
    CarritoCompra,
    DetalleCarrito,
    Venta,
    DetalleVenta,
    Inventario,
    CompraProveedor,
    DetalleCompra,
    Alerta,
    Configuracion,
    SesionChatbot,
    MensajesChatbot,
    ControlARCSA,
    MedicamentoProveedor
}


