var request = require('request');
var fetch = require('isomorphic-fetch');
require('es6-promise').polyfill();

var Api = module.exports;



Api.getDataBySiteId = function(){
console.log('Function Called!');
// console.log('Id: ', id)
var siteId = document.getElementById('site-id').value;
// console.log('SiteId: ', siteId) // good
var base_Url = 'http://waterservices.usgs.gov/nwis/iv/?&format=json,1.1&parameterCd=00065,00060&sites=' + siteId
// console.log(baseUrl) // good

    fetch(base_Url)
        .then(function(response){
          console.log('inside first then')
          if(response.status >= 400){
            throw new Error('Bad response from server');
          }
          return response.json();
        })
        .then(function(data){
          console.log('Gage Height: ', data.value.timeSeries[1].values[0].value[0].value);
          console.log('Discharge: ', data.value.timeSeries[0].values[0].value[0].value);
          console.log('Discharge Time: ', data.value.timeSeries[0].values[0].value[0].dateTime)
        });
}

var button = document.getElementById('submit-button');
button.addEventListener('click', Api.getDataBySiteId)


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
