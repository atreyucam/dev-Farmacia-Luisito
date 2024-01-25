
const {Alerta, Inventario} = require('../models/db_models');
const ConfiguracionRepository = require('./ConfiguracionRepository');
const MedicamentoRepository = require('./MedicamentoRepository');
const InventarioRepository = require('./InventarioRepository');
const { Op } = require('sequelize');


class AlertaRepository{
    async crearAlerta(usuarioData){
        return await Alerta.create(usuarioData);
    }

    async obtenerAlertas(){
        return await Alerta.findAll();
    }

    async obtenerAlertaporId(id){
        return await Alerta.findByPk(id);
    }

    async actualzarAlerta(id, usuarioData){
        return await Alerta.update(usuarioData, {where: {id_alerta: id}});
    }

    async eliminarAlerta(id){
        return await Alerta.destroy({where: {id_alerta:id}});
    }


    // Modulos para implementacion de alertas
    async verificarCaducidad(idMedicamento) {
        // Obtén el margen de días para alerta de caducidad desde la configuración
        const diasParaCaducar = await ConfiguracionRepository.obtenerValorConfig('minimoDiasCaducar');
        const medicamentoInfo = await MedicamentoRepository.obtenerMedicamentoporId(idMedicamento);
    
        // Fecha actual para comparar
        const fechaActual = new Date();
    
        // Buscar lotes próximos a caducar, pero que no caduquen hoy
        const lotesProximos = await Inventario.findAll({
            where: { 
                id_medicamento: idMedicamento,
                fechaCaducidad: { 
                    [Op.lt]: new Date(fechaActual.getTime() + diasParaCaducar * 24 * 60 * 60 * 1000),
                    [Op.gt]: fechaActual // Excluye los lotes que caducan hoy
                }
            },
            order: [['fechaCaducidad', 'ASC']]
        });
    
        for (const lote of lotesProximos) {
            const fechaCaducidad = new Date(lote.fechaCaducidad);
            let mensajeAlerta = `El lote ${lote.numeroLote} del medicamento ${medicamentoInfo.nombreMedicamento} está próximo a caducar. Caduca el ${fechaCaducidad.toISOString().split('T')[0]}`;
    
            // Crear alerta de caducidad para el lote específico
            await Alerta.create({
                tipoAlerta: 'Proximo Caducar',
                descripcion: mensajeAlerta,
                fechaAlerta: new Date(),
                estado: 'Activa',
                id_inventario: lote.id_inventario // Asociar el id_inventario del lote específico
            });
    
            console.log(`Alerta creada para el lote ${lote.numeroLote} del medicamento ${medicamentoInfo.nombreMedicamento}`);
        }
    }
    

    async verificarStock(idMedicamento) {
        // Obtén el stock mínimo desde la configuración
        const minimoStock = await ConfiguracionRepository.obtenerValorConfig('minimoStock');
        const medicamentoInfo = await MedicamentoRepository.obtenerMedicamentoporId(idMedicamento);
    
        // Obtener información de lotes con bajo stock, excluyendo los que tienen stock 0
        const lotesBajoStock = await Inventario.findAll({
            where: { 
                id_medicamento: idMedicamento,
                cantidadDisponible: { 
                    [Op.and]: [
                        { [Op.lte]: minimoStock },
                        { [Op.gt]: 0 } // Excluye lotes con stock 0
                    ]
                }
            }
        });
    
        // Crear una alerta por cada lote con stock bajo
        for (const lote of lotesBajoStock) {
            let mensajeAlerta = `El lote ${lote.numeroLote} del medicamento ${medicamentoInfo.nombreMedicamento} está con stock bajo. Quedan ${lote.cantidadDisponible} unidades.`;
    
            // Crear alerta de stock bajo para el lote específico
            await Alerta.create({
                tipoAlerta: 'Stock Bajo',
                descripcion: mensajeAlerta,
                fechaAlerta: new Date(),
                estado: 'Activa',
                id_inventario: lote.id_inventario // Asociar el id_inventario del lote específico
            });
    
            console.log(`Alerta creada para el lote ${lote.numeroLote} del medicamento ${medicamentoInfo.nombreMedicamento}`);
        }
    }
    
    


    async verificarStockVacio(idMedicamento) {
        // Obtener información del medicamento
        const medicamentoInfo = await MedicamentoRepository.obtenerMedicamentoporId(idMedicamento);
    
        // Obtener lotes del medicamento con stock 0
        const lotesSinStock = await Inventario.findAll({
            where: { 
                id_medicamento: idMedicamento,
                cantidadDisponible: 0
            }
        });
    
        // Si hay lotes sin stock, crea una alerta para cada uno
        for (const lote of lotesSinStock) {
            await Alerta.create({
                tipoAlerta: 'Stock Vacío',
                descripcion: `El lote ${lote.numeroLote} del medicamento ${medicamentoInfo.nombreMedicamento} ha agotado su stock.`,
                fechaAlerta: new Date(),
                estado: 'Activa',
                id_inventario: lote.id_inventario // Asociar el id_inventario del lote específico
            });
    
            console.log(`Alerta creada: Stock vacío para el lote ${lote.numeroLote} del medicamento ${medicamentoInfo.nombreMedicamento}`);
        }
    }
    
    

    async verificarProductoCaducado() {
        // Fecha actual para comparar
        const fechaActual = new Date();
        
        // Buscar lotes que ya han caducado o caducan hoy
        const lotesCaducados = await Inventario.findAll({
            where: { 
                fechaCaducidad: { [Op.lte]: fechaActual }
            }
        });
        
        for (const lote of lotesCaducados) {
            const medicamentoInfo = await MedicamentoRepository.obtenerMedicamentoporId(lote.id_medicamento);
            let mensajeAlerta = `El lote ${lote.numeroLote} del medicamento ${medicamentoInfo.nombreMedicamento} ha caducado. Retírelo del inventario.`;
        
            // Crear alerta de producto caducado
            await Alerta.create({
                tipoAlerta: 'Producto Caducado',
                descripcion: mensajeAlerta,
                fechaAlerta: new Date(),
                estado: 'Activa',
                id_inventario: lote.id_inventario
            });
        
            console.log(`Alerta creada: Producto caducado para el lote ${lote.numeroLote} del medicamento ${medicamentoInfo.nombreMedicamento}`);
        }
    }
    

}

module.exports = new AlertaRepository();