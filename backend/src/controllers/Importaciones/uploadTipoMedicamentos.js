
const xlsx = require('xlsx');
const fs = require('fs');
const tipoMedicamentoRepository = require('../../repositories/tipoMedicamentoRepository');

exports.importarTipos = async (req, res) => {
    try {
        // cargar libro de excel
        const workbook = xlsx.readFile(req.file.path);
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = xlsx.utils.sheet_to_json(sheet, {header: 1});

        const tiposMedicamento = extractTipoMedicamentoData(data);
        console.log(tiposMedicamento);
        // Procesar cada tipo de medicamento
        for (const tipo of tiposMedicamento) {
            const tipoMedicamentoIngreso = await tipoMedicamentoRepository.buscarOcrear(tipo);
            if (!tipoMedicamentoIngreso) {
                console.error('Error al crear tipo de medicamento:', tipo);
            } else {
                console.log("Tipo de medicamento creado o encontrado:", tipoMedicamentoIngreso);
            }
        }
        // Eliminar el archivo Excel después de procesarlo
        fs.unlinkSync(req.file.path);
        res.status(200).send('Datos importados con éxito');
    } catch (error) {
        res.status(500).send(error.message);
    }
}

// ---------------------------------------------------------------
const extractTipoMedicamentoData = (data) => {
    const startIndex = 1; 
    const detalles = [];
    for (let i = startIndex; i < data.length; i++) {
        if (data[i] && data[i][0]) { 
            detalles.push({
                categoria: data[i][0],
                descripcionTipo: data[i][1],
                requiereReceta: data[i][2] === 1
            });
        }
    }
    return detalles;
};