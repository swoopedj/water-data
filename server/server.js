var express = require('express');
var Path = require('path');
var morgan = require('morgan');
require('es6-promise').polyfill();
var routes = express.Router();

var data_api = require('./api/data-api.js')

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

  app.use('/', routes)

  var port = process.env.PORT || 8080;
  app.listen(port, function(){
    console.log('listening on port '+ port);
  });
} else {
  module.exports = routes;
}