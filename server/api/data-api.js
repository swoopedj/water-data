var router = require('express').Router();
var Search = require('../models/search-model.js');
var db = require('./db_api.js');


router.get('/address/:address', function(req, res){
  var coordinates = Search.getLatLongCoordinates(req.params.address)
  .then(function(response){
    res.send(response);
  })
}); 

router.get('/bBox/:bBox', function(req, res){
  var results = Search.getSitesInBoundaryBox(req.params.bBox)
  .then(function(response){
    res.send(response);
  })
});

router.get('/geo-bBox', function(req, res){
  console.log("~~~~~~~~~~~~~~~~~~~~~~")
  console.log("SID: ", req.sessionID)
  console.log("SESSION: ", req.session)
  var results = Search.findSitesInBoundaryBox(req.query, req.sessionID)
  .then(function(response){
    res.send(response);
  })
});

router.get('/siteId/:id', function(req, res){
  var data = Search.getDataBySiteId(req.params.id)
  .then(function(response){
    res.send(response);
  })
}); 

router.get('/login', function(req, res){
  var user = db.authUser(req.query, req.sessionID)
  .then(function(response){
    console.log("RES: ", response)
    res.send(response);
  })
  .catch(error => {
    console.log('ERROR:', error); // print the error;
  })
});

router.post('/register', function(req, res){
  var user = db.createUser(req.query)
  .then(function(response){
    console.log("RES: ", response)
    res.send(response);
  })
});

module.exports = router;