const Sequelize = require('sequelize');

/**
 * DB Connection setup
 */
const {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_PORT
} = process.env;

const sequilize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT || 5432,
  // 'mysql' | 'mariadb' | 'postgres' | 'mssql'
  dialect: 'postgres',
  dialectOptions: {
    connectTimeout: 1000
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

module.exports = sequilize;
