angular.module('waterData', [
  'ui.router',
  'waterData.search',
  'waterData.services',
  'waterData.home'
  ]);





// var request = require('request');
// var fetch = require('isomorphic-fetch');
// require('es6-promise').polyfill();

// var Api = module.exports;

// Api.getDataBySiteId = function(){
//   console.log('Function Called!');
//   var siteId = document.getElementById('site-id').value;
//   var baseUrl = 'http://waterservices.usgs.gov/nwis/iv/?&format=json,1.1&parameterCd=00065,00060&sites=' + siteId

//   request.get(baseUrl, function (error, response, body) {
//       if (!error && response.statusCode == 200) {
//         var data = JSON.parse(body)
//         console.log('Body: ', data) // Show the HTML for the Google homepage. 

//           console.log('Gage Height: ', data.value.timeSeries[1].values[0].value[0].value);
//           console.log('Discharge: ', data.value.timeSeries[0].values[0].value[0].value);
//           console.log('Discharge Time: ', data.value.timeSeries[0].values[0].value[0].dateTime)
//       }
//   })
    
// }

// Api.getDataByCoordinates = function(coordinates, radius){
//   var baseUrl = 'http://waterservices.usgs.gov/nwis/iv/?format=json,1.1&bBox=';
//   console.log('In getDataByCoordinates, coordinates: ', coordinates, ' radius: ', radius);
//   var longitude_constant = 0.018315;
//   var latitude_constant = 0.014492;
//   var bBox = {
//     west: coordinates.lng - (radius * longitude_constant),
//     south: coordinates.lat - (radius * latitude_constant),
//     east: coordinates.lng + (radius * longitude_constant),
//     north: coordinates.lat + (radius * latitude_constant)
//   }
//   var westLong = round(bBox.west).toString()
//   console.log('westLong: ', westLong)
//   var southLat = round(bBox.south).toString()
//   console.log('southLat: ', westLong)
//   var eastLong = round(bBox.east).toString()
//   console.log('eastLong: ', eastLong)
//   var northLat = round(bBox.north).toString()
//   console.log('northLat: ', northLat)
//   //bBox= -97.70521, 30.435702, -97.6685799, 30.464686
//   //http://waterservices.usgs.gov/nwis/iv/?format=json,1.1&bBox=-97.70521,30.435702,-97.6685799,30.464686&parameterCd=00060,00065

//   var realUrl = baseUrl + westLong + ',' + southLat + ',' + eastLong + ',' + northLat + '&parameterCd=00060,00065';
//   console.log('RealRealUrl: ', realUrl)
//   request.get('http://waterservices.usgs.gov/nwis/iv/?format=json,1.1&bBox=-97.000000,30.500000,-96.000000,31.500000&parameterCd=00060,00065&siteStatus=active', function (error, response, body) {
//     if (!error && response.statusCode == 200) {
//       var data = JSON.parse(body)
//       console.log('Body: ', data) 
//     }
//   })

//   function round(n){
//     var str = n.toString()
//     if(str.indexOf('.') !== -1){
//       var index = str.indexOf('.')
//       var decimalSlice = str.slice(index, index + 7)
//       var integerSlice = str.slice(0, index)
//       return Number(integerSlice + decimalSlice)
//     } else {return n}
//   }


// }



// Api.getCoordinatesByAddress = function(){
//   var baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
//   var googleApiToken = require('./lib/apitoken.js');
//   var exampleUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=' + googleApiToken;
//   var address = {
//     street: document.getElementById("address-street").value || '',
//     city: document.getElementById("address-city").value,
//     state: document.getElementById("address-state").value
//   }
//   if(!address.city || !address.state){
//     var error = "Please provide a city and state."
//     console.log(error);
//     throw new Error(error);
//   }

//   var radius = Number(document.getElementById('location-radius').value) || 1;

//   console.log('Radius: ', radius)

//   var realUrl = baseUrl + address.street + ',' + address.city + ',' + address.state +'&key=' + googleApiToken;
//   console.log('realUrl: ', realUrl)

//   var addressRequest = new Promise(function(resolve, reject){
//     request.get(realUrl, function (error, response, body) {
//       if (!error && response.statusCode == 200) {
//         var data = JSON.parse(body)
//         console.log('StationList Body: ', data.results[0].geometry.location) // Show the HTML for the Google homepage. 
//         resolve(data.results[0].geometry.location)
//       }
//     })
//   })


//   addressRequest.then(function(coordinates){
//     console.log('Inside of THEN: radius: ', radius)
//     console.log('Coordinates: ',coordinates)
//     Api.getDataByCoordinates(coordinates, radius);
//   })

// }

// var usgsButton = document.getElementById('usgs-button');
// usgsButton.addEventListener('click', Api.getDataBySiteId)

// var googleButton = document.getElementById('google-button');
// googleButton.addEventListener('click', Api.getCoordinatesByAddress)


//   //WORKS: (out here)
//   // request.get('http://waterservices.usgs.gov/nwis/iv/?&format=json,1.1&sites=08155300', function (error, response, body) {
//   //     if (!error && response.statusCode == 200) {
//   //       console.log('Body: ', body) // Show the HTML for the Google homepage. 
//   //     }
//   // })

//   // WORKS:
//   // var baseUrl = 'http://waterservices.usgs.gov/nwis/iv/?&format=json,1.1&sites=08155300' 

//   //   fetch(baseUrl)
//   //       .then(function(response){
//   //         console.log('inside first then')
//   //         if(response.status >= 400){
//   //           throw new Error('Bad response from server');
//   //         }
//   //         return response.json();
//   //       })
//   //       .then(function(data){
//   //         console.log('Data: ', data);
//   //       });

//   //Doesnt work in function:

//   // return new Promise(function(resolve, reject){
//   //   request.get('http://waterservices.usgs.gov/nwis/iv/?&format=json,1.1&sites=08155300', function (error, response, body) {
//   //     console.log('How about here?')
//   //     if (!error && response.statusCode == 200) {
//   //       console.log('Body: ', body) // Show the HTML for the Google homepage. 
//   //     }
//   //     console.log('INSIDE')
//   //     resolve(body)
//   //   })
//   // })
//   // .then(function(data){
//   //   console.log('DATA: ', data)
//   // })
