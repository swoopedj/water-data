const router = require('express').Router();
const Search = require('../models/search-model.js');
const Stats = require('../models/stats-model.js');
const MySites = require('../models/mysites-model.js');
const site_formatter = require('../formatters/site_formatter.js');
const param_combine = require('../formatters/parameter_consolidator.js');
const db = require('./db_api.js');


router.get('/address/:address', (req, res) => {
  let coordinates = Search.getLatLongCoordinates(req.params.address)
  .then((response) => {
    res.send(response);
  })
  .catch(error => {
    console.log('Error: ', error)
  })
}); 

router.get('/bBox/:bBox', (req, res) => {
  let results = Search.getSitesInBoundaryBox(req.params.bBox)
  .then((response) => {
    res.send(response);
  })
  .catch(error => {
    console.log('Error: ', error)
  })
});

router.get('/stats/:id', (req, res) => {
  let results = Stats.getSiteStats(req.params.id)
  .then(data => {
    res.send(response);
  })
  .catch(error => {
    console.log("Error: ", error);
  })
});

router.get('/geo-bBox', (req, res) => {
  let results = Search.findSitesInBoundaryBox(req.query)
  .then((response) => {
    db.verifySession(req.sessionID)
    .then(data => {
      response.verified = data.sid ? true : false;
      res.send(response);
    })
  })
  .catch(error => {
    console.log('Error: ', error)
  })
});

router.get('/siteId/:id', (req, res) => {
  let data = Search.getDataBySiteId(req.params.id)
  .then((response) => {
    res.send(response);
  })
  .catch(error => {
    console.log('Error: ', error)
  })
}); 

router.get('/login', (req, res) => {
  console.log("req.sessionID: ", req.sessionID)
  let user = db.authUser(req.query, req.sessionID)
  .then((response) => {
    res.send(response);
  })
  .catch(error => {
    console.log('Error: ', error)
  })
});

router.get('/verify', (req, res) => {
  if(req.sessionID === req.query.session_id) {
    let verify = db.verifySession(req.sessionID)
    .then((response) => {
      res.send(response);
    })
    .catch(error => {
      console.log('Error: ', error)
    })
  } else { res.send('User not logged in.')}


});

router.post('/register', (req, res) => {
  let user = db.createUser(req.query)
  .then((response) => {
    res.send(response);
  })
  .catch(error => {
    console.log('Error: ', error)
  })
});

router.post('/addSite', (req, res) => {
  let user = db.addToUserSites(req.query)
  .then((response) => {
    res.send(response);
  })
  .catch(error => {
    console.log('Error: ', error)
  })
});

router.get('/mySites', (req, res) => {
  console.log(req.query)
  //
  // add session verification here
  //
  let site_list = db.listUserSites(req.query.user_id)
  .then((sub_list) => {
    MySites.hydrateSiteData(sub_list)
    .then(results => {
      res.send(results);
    })
    .catch(error => {
      console.log('Error: ', error)
    })
  })
});

router.delete('/logout', (req, res) => {
  let logout = db.deleteSession(req.query)
  .then(response => {
    res.send(response)
  })
  .catch(error => {
    console.log('Error: ', error)
  })
})

module.exports = router;