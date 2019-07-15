require('dotenv').config();

const {
  NODE_ENV,
  DB_HOST,
  DB_NAME,
  DB_USER,
  DB_PASSWORD
} = process.env;
const ENV = NODE_ENV || 'development';

module.exports = {
  [ENV]: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: 'postgres'
  }
};
