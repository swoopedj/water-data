var express = require('express');
var Path = require('path');
var morgan = require('morgan');
require('es6-promise').polyfill();
var routes = express.Router();
var browserify = require('browserify-middleware');


// var data_api = require('./api/data-api.js')

routes.use(morgan('dev'));


//route to index.html
var assetFolder = Path.resolve(__dirname, '../client/');
routes.use(express.static(assetFolder));

var app = express();

app.get('/scripts/app-bundle.js',
  browserify('./client/app.js'));

var assetFolder = Path.resolve(__dirname, '../client')
app.use(express.static('client'));

app.get('/*', function(req, res){
  res.sendFile( assetFolder + '/index.html' )
})

var port = process.env.PORT || 8080;
app.listen(port);
console.log("Listening on port", port);





//api routes
// routes.use('/api', data_api);

// if(process.env.NODE_ENV !== 'test'){
//   routes.get('/*', function(request, response){
//     response.sendFile(assetFolder + '/index.html');
//   });

//   //create server
//   var app = express();
//   app.use(require('body-parser').json())

//   //main router
//   app.use('/', routes)


//   //start server
//   var port = process.env.PORT || 8080;
//   app.listen(port, function(){
//     console.log('listening on port '+ port);
//   });
// } else {
//   //for test env
//   module.exports = routes;
// }