angular.module('waterData.find', [])
.controller('findCtrl', function($scope, $location, Search, SiteService){
  var controller = this;
  var x = document.getElementById('find-message')

  this.getLocation = function(location) {
    var getAreaWithRadius = getArea(location.radius);
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getAreaWithRadius, showError);
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }

  var getArea = function(radius) {
    return function(position) {
      console.log(position.coords)
      SiteService.originCoordinates = {lat: position.coords.latitude, long: position.coords.longitude} 
      Search.findSitesInArea(position.coords, radius)
      .then(function(data){
        console.log("SITES: ", data.value.timeSeries)
        SiteService.siteArray = data.value.timeSeries
        $location.path('/list')
      }) 
    }
  }

  function showError(error) {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        x.innerHTML = "User denied the request for Geolocation."
        break;
      case error.POSITION_UNAVAILABLE:
        x.innerHTML = "Location information is unavailable."
        break;
      case error.TIMEOUT:
        x.innerHTML = "The request to get user location timed out."
        break;
      case error.UNKNOWN_ERROR:
        x.innerHTML = "An unknown error occurred."
        break;
    }
  }
})




