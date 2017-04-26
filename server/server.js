var express = require('express');
var Path = require('path');
var session = require('express-session');
var pgSession = require('connect-pg-simple')(session);
var pg = require('pg');
var morgan = require('morgan');
var env = require('node-env-file');
env('./.env');
require('es6-promise').polyfill();
var routes = express.Router();

var data_api = require('./api/data-api.js');

routes.use(morgan('dev'));

var assetFolder = Path.resolve(__dirname, '../client/');
routes.use(express.static(assetFolder));

var angular = Path.resolve(__dirname, '../node_modules/')
routes.use('/scripts', express.static(angular));

routes.use('/api', data_api);

if(process.env.NODE_ENV !== 'test'){
  routes.get('/*', function(request, response){
    response.sendFile(assetFolder + '/index.html');
  });

  var app = express();
  app.use(require('body-parser').json())
  app.use(session({
    store: new pgSession({
      pg: pg,
      conString: process.env.DATABASE_URL,
      tableName: 'user_sessions'
    }),
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
  }))

  app.use('/', routes)
  

  var port = process.env.PORT || 8080;
  app.listen(port, function(){
    console.log('listening on port '+ port);
  });
} else {
  module.exports = routes;
}