/*
const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:postgresql@localhost:5432/GitTanss');

module.exports = sequelize;
*/

const { Pool} = require('pg');
const connectionString = 'postgres://postgres:postgresql@localhost:5432/GitTanss';

const pool = new Pool({
    connectionString: connectionString,
});

module.exports = pool;