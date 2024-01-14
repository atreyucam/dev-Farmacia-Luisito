const { sequelize } = require('./src/config/database');
const modelo = require('./src/models/db_models');
const express = require("express");
const app = express();
const port = 3005;




// Comprobacion de tablas en PostgreSQL
sequelize.sync({ force: false }).then(() => {
    console.log("Tablas sincronizadas");
}).catch(error => {
    console.error('Error al sincronizar las tablas:', error);
});

app.use(express.json());

app.listen(port, () => {
    console.log(`App Farmacia-Luisito en http://localhost:${port}`);
});  