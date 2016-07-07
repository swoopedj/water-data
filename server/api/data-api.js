var router = require('express').Router();
var Search = require('../models/search-model.js');

router.get('/address/:address', function(req, res){
  console.log('In data-api, GET address')
  var coordinates = Search.getLatLongCoordinates(req.params.address)
  .then(function(response){
    console.log('Address Response: ', response.geometry)
    res.send(response);
  })
}); 

router.get('/bBox/:bBox', function(req, res){
  console.log('In data-api, GET bBox')
  var results = Search.getSitesInBoundaryBox(req.params.bBox)
  .then(function(response){
    console.log('bBox Response: ', response)
    res.send(response);
  })
});

router.get('/siteId/:id', function(req, res){
  console.log('In data-api, GET siteId')
  var data = Search.getDataBySiteId(req.params.id)
  .then(function(response){
    console.log('site Id Response: ', response)
    res.send(response);
  })
}); 

module.exports = router;