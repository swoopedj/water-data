var request = require('request');
var fetch = require('isomorphic-fetch');
require('es6-promise').polyfill();

var Api = module.exports;

Api.getDataBySiteId = function(){
  console.log('Function Called!');
  var siteId = document.getElementById('site-id').value;
  var baseUrl = 'http://waterservices.usgs.gov/nwis/iv/?&format=json,1.1&parameterCd=00065,00060&sites=' + siteId

  request.get(baseUrl, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var data = JSON.parse(body)
        console.log('Body: ', data) // Show the HTML for the Google homepage. 

          console.log('Gage Height: ', data.value.timeSeries[1].values[0].value[0].value);
          console.log('Discharge: ', data.value.timeSeries[0].values[0].value[0].value);
          console.log('Discharge Time: ', data.value.timeSeries[0].values[0].value[0].dateTime)
      }
  })
    
}

Api.getDataByCoordinates = function(coordinates, radius){
  var baseUrl = 'http://waterservices.usgs.gov/nwis/iv/?&format=json,1.1&parameterCd=00065,00060&bBox=';
  console.log('In getDataByCoordinates, coordinates: ', coordinates, ' radius: ', radius);


}



Api.getCoordinatesByAddress = function(){
  var baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
  var googleApiToken = require('./lib/apitoken.js');
  var exampleUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=' + googleApiToken;
  var address = {
    street: document.getElementById("address-street").value || '',
    city: document.getElementById("address-city").value,
    state: document.getElementById("address-state").value
  }
  if(!address.city || !address.state){
    var error = "Please provide a city and state."
    console.log(error);
    throw new Error(error);
  }

  var radius = Number(document.getElementById('location-radius').value) || 1;

  console.log('Radius: ', radius)

  var realUrl = baseUrl + address.street + ',' + address.city + ',' + address.state +'&key=' + googleApiToken;
  console.log('realUrl: ', realUrl)

  request.get(exampleUrl, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var data = JSON.parse(body)
        console.log('Body: ', data.results[0].geometry.location) // Show the HTML for the Google homepage. 
        return data.results[0].geometry.location
      }
  }).then(function(coordinates){
    console.log('Inside of THEN')
    Api.getDataByCoordinates(coordinates, radius);
  })

}

var usgsButton = document.getElementById('usgs-button');
usgsButton.addEventListener('click', Api.getDataBySiteId)

var googleButton = document.getElementById('google-button');
googleButton.addEventListener('click', Api.getCoordinatesByAddress)


  //WORKS: (out here)
  // request.get('http://waterservices.usgs.gov/nwis/iv/?&format=json,1.1&sites=08155300', function (error, response, body) {
  //     if (!error && response.statusCode == 200) {
  //       console.log('Body: ', body) // Show the HTML for the Google homepage. 
  //     }
  // })

  // WORKS:
  // var baseUrl = 'http://waterservices.usgs.gov/nwis/iv/?&format=json,1.1&sites=08155300' 

  //   fetch(baseUrl)
  //       .then(function(response){
  //         console.log('inside first then')
  //         if(response.status >= 400){
  //           throw new Error('Bad response from server');
  //         }
  //         return response.json();
  //       })
  //       .then(function(data){
  //         console.log('Data: ', data);
  //       });

  //Doesnt work in function:

  // return new Promise(function(resolve, reject){
  //   request.get('http://waterservices.usgs.gov/nwis/iv/?&format=json,1.1&sites=08155300', function (error, response, body) {
  //     console.log('How about here?')
  //     if (!error && response.statusCode == 200) {
  //       console.log('Body: ', body) // Show the HTML for the Google homepage. 
  //     }
  //     console.log('INSIDE')
  //     resolve(body)
  //   })
  // })
  // .then(function(data){
  //   console.log('DATA: ', data)
  // })
