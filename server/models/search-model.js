var request = require('request');

var Search = module.exports;

// GET request to Google Maps for Lat/Long coordinates of an address 
Search.getLatLongCoordinates = function(address){
  console.log('In server - getLatLongCoordinates; address: ', address)
  var baseUrl =  'https://maps.googleapis.com/maps/api/geocode/json?address=' + address
  var options = {
    url: baseUrl,
    'X-App-Token': process.env.GOOGLE_API_TOKEN
  };
  console.log('URL: ', options.url)
  return new Promise(function(resolve, reject){
    request.get(options, function(error, response, body){
      if(error){
        console.log('Error: ', error)
        throw new Error(error)
      } else {
        response.body = JSON.parse(body);
        resolve(response.body);
      }
    })
  })
}


// GET request to USGS for sites within Lat/Long boundary box
Search.getSitesInBoundaryBox = function(bBox){
  console.log('In server - getSitesInBoundaryBox')
  var baseUrl =  'http://waterservices.usgs.gov/nwis/iv/?format=json,1.1&bBox=' + bBox + '&parameterCd=00060,00065,00062';
  var options = {
    url: baseUrl,
  };
  return new Promise(function(resolve, reject){
    request.get(options, function(error, response, body){
      if(error){
        console.log('Error: ', error)
        throw new Error(error)
      } else {
        response.body = JSON.parse(body);
        resolve(response.body);
      }
    })
  })
}

//GET request to USGS for specific site id
Search.getDataBySiteId = function(siteId){
  console.log('In server - getDataBySiteId')
  var baseUrl =  '' + siteId
  var options = {
    url: baseUrl,
  };
  return new Promise(function(resolve, reject){
    request.get(options, function(error, response, body){
      if(error){
        console.log('Error: ', error)
        throw new Error(error)
      } else {
        response.body = JSON.parse(body);
        resolve(response.body);
      }
    })    
  })
}