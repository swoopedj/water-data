const router = require('express').Router();
const Search = require('../models/search-model.js');
const MySites = require('../models/mysites-model.js');
const site_formatter = require('../formatters/site_formatter.js');
const param_combine = require('../formatters/parameter_consolidator.js');
const db = require('./db_api.js');


router.get('/address/:address', function(req, res){
  let coordinates = Search.getLatLongCoordinates(req.params.address)
  .then(function(response){
    res.send(response);
  })
}); 

router.get('/bBox/:bBox', function(req, res){
  let results = Search.getSitesInBoundaryBox(req.params.bBox)
  .then(function(response){
    res.send(response);
  })
});

router.get('/geo-bBox', function(req, res){
  let results = Search.findSitesInBoundaryBox(req.query)
  .then(function(response){
    db.verifySession(req.sessionID)
    .then(function(data) {
      response.verified = data.sid ? true : false;
      res.send(response);
    })
  })
});

router.get('/siteId/:id', function(req, res){
  let data = Search.getDataBySiteId(req.params.id)
  .then(function(response){
    res.send(response);
  })
}); 

router.get('/login', function(req, res){
  let user = db.authUser(req.query, req.sessionID)
  .then(function(response){
    res.send(response);
  })
});

router.post('/register', function(req, res){
  let user = db.createUser(req.query)
  .then(function(response){
    res.send(response);
  })
});

router.post('/addSite', function(req, res){
  let user = db.addToUserSites(req.query)
  .then(function(response){
    res.send(response);
  })
});

router.get('/mySites', function(req, res){
  console.log(req.query)
  //
  // add session verification here
  //
  let site_list = db.listUserSites(req.query.user_id)
  .then(function(sub_list){
    MySites.hydrateSiteData(sub_list)
    .then(results => {
      res.send(results);
    })
    
  })
});

module.exports = router;