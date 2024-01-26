const { Sequelize } = require('sequelize');

const database = "dev_farmacia_luisito";
const username = "postgres";
const password = "admin";
const host = "localhost";

const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: 'postgres',
  logging: console.log,
  define: {
    timestamps: false
  }
});

module.exports = {
  sequelize
}