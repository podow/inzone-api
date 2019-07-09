const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const Sequelize = require('sequelize');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const IS_DEV = process.env.NODE_ENV === 'development';

if (IS_DEV) {
  require('dotenv').config();
}

const app = express();

/**
 * Middlewares execution
 */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());

/**
 * Set favicon
 */
app.use('/favicon.ico', express.static('./favicon.ico'));

/**
 * Setting routes
 * TODO: Move to another module
 */
app.use('/', indexRouter);
app.use('/users', usersRouter);

/**
 * DB Connection setup
 * TODO: Update with env
 */
const {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_PORT
} = process.env;

new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
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

module.exports = app;
