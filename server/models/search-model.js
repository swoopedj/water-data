const request = require('request');
const bBox_formatter = require('../formatters/bBox-formatter.js');
const site_formatter = require('../formatters/site_formatter.js');
const param_combine = require('../formatters/parameter_consolidator.js');

const Search = module.exports;

// GET request to Google Maps for Lat/Long coordinates of an address 
Search.getLatLongCoordinates = function(address){  
  var baseUrl =  'https://maps.googleapis.com/maps/api/geocode/json?address=' + address;
  var options = {
    url: baseUrl,
    'X-App-Token': process.env.GOOGLE_API_TOKEN
  };
  return new Promise(function(resolve, reject){
    request.get(options, function(error, response, body){
      if(error){
        console.log('Error in server: ', error)
        throw new Error(error)
      } else {
        response.body = JSON.parse(body);
        resolve(response.body);
      }
    })
  })
}


// GET request to USGS for sites within Lat/Long boundary box
Search.findSitesInBoundaryBox = function(origin_coords){
  var baseUrl =  'http://waterservices.usgs.gov/nwis/iv/?format=json,1.1&bBox='
  var formatted_bBox = bBox_formatter(origin_coords);
  var options = {
    url: baseUrl + formatted_bBox + '&parameterCd=00060,00065,00062',
  };
  return new Promise(function(resolve, reject){
    request.get(options, function(error, response, body){
      if(error){
        console.log('Error in server: ', error)
        throw new Error(error)
      }

      response.body = JSON.parse(body);
      let site_list = response.body.value.timeSeries.map((site) => {
        return site_formatter(site, origin_coords);
      });

      resolve(param_combine(site_list));
      
    })
  })
}

//GET request to USGS for specific site id
Search.getDataBySiteId = function(siteId){
  var baseUrl =  'http://waterservices.usgs.gov/nwis/iv/?format=json,1.1&sites=' + siteId
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