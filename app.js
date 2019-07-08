const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const Sequelize = require('sequelize');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

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
new Sequelize('test', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql', // | 'mariadb' | 'postgres' | 'mssql'
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
