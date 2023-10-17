var express = require('express');
const bcrypt = require('bcrypt');
var app = express();
var fs = require('fs');
var path = require('path');

// Require Helmet version 3.21.3
const helmet = require('helmet@3.21.3');

app.use(function(req, res, next) {
  res.set({
    "Access-Control-Allow-Origin" : "*",
    "Access-Control-Allow-Headers" : "Origin, X-Requested-With, content-type, Accept"
  });
  app.disable('x-powered-by');
  next();
});

// Use Helmet middleware
app.use(helmet());

app.get('/file/*?', function(req, res, next) {
  if (req.params[0] === '.env') { return next({ status: 401, message: 'ACCESS DENIED' }); }
  fs.readFile(path.join(__dirname, req.params[0]), function(err, data){
    if (err) { return next(err); }
    res.type('txt').send(data.toString());
  });
});

var main = require('./myApp.js');
app.get('/app-info', function(req, res) {
  var appMainRouteStack = main._router.stack
