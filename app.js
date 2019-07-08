var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var Sequelize = require('sequelize');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);

const sequelize = new Sequelize('mysql://root:root@localhost:3306/test');

module.exports = app;
