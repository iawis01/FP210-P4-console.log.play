var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var gameAppRouter = require('./routes/game-app');
const { randomUUID } = require('crypto');
const { join } = require('path');
var app = express();
const routerUser = require('./routes/user')
const mongoose = require("mongoose");
const routerRoom = require('./routes/room');

require("dotenv").config();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/bootstrap/js', express.static(__dirname + '/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'));
app.use('/favicons', express.static(__dirname + '/node_modules/express-favicon/index.js'));

app.use(indexRouter);
app.use('/api', routerUser);
app.use('/api', routerRoom);

//mongoDB
//username: user
//password: user1234

//Mongodb

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log(error));






// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
