const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const cors = require('cors');

require('./config/db');
require('./config/passport');

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
app.use(cors());
app.use(require('morgan')('dev'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({ secret: 'nodejs', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

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
app.use(require('./routes'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('404 - Not Found');
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use(function (err, req, res) {
  res.status(err.status || 500);
  res.send({
    err: err.message
  });
});

module.exports = app;
