const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:postgresql@localhost:5432/GitTanss');

module.exports = sequelize;
