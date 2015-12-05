var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');
var sequelize = new Sequelize('dbui', 'postgres', null, {dialect: 'postgres', port: 5432});

var routes = require('./routes/index');
var users = require('./routes/users');
var data = require('./routes/data');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('.html', require('ejs').renderFile)

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));
app.use('/public/stylesheets', express.static(path.join(__dirname, '/public/stylesheets')));
app.use('/public/stylesheets', express.static(path.join(__dirname, '/javascripts/build')));
app.use('/public/stylesheets', express.static(path.join(__dirname, '/public/javascripts/src')));
app.use('/public/images', express.static(path.join(__dirname, 'public/images')));

app.use('/', routes);
app.use('/users', users);
app.use('/data', data);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace






module.exports = app;
