angular.module('waterData.search', [])
.controller('searchCtrl', function($scope, Search){
  console.log('searchController in operation');
  var controller = this;
  var address = {
    street: document.getElementById("address-street").value || '',
    city: document.getElementById("address-city").value,
    state: document.getElementById("address-state").value
  };
 
  this.getLatLong = function(address){
    console.log('getLatLong Called!')
    var radius = address.proximity
    var address = address.street + ',' + address.city + ',' + address.state    
    Search.getLatAndLong(address)
    .then(function(coordinates, radius){
      console.log('Coordinates: ', coordinates)
      console.log('Radius: ', radius)
      // var bBox = 
      // Search.getSitesInArea(bBox)
    })
  }

  this.getDataBySiteId = function(site_id){

  }

})