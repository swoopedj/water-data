angular.module('waterData.find', [])
.controller('findCtrl', function($scope, $location, Search, SiteService){
  var controller = this;
  var x = document.getElementById('find-message')

  this.getLocation = function(location) {
    var getAreaWithRadius = getArea(location.radius);
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getAreaWithRadius, showError);
    } else { 
        x.textContent = "Geolocation is not supported by this browser.";
    }
  }

  var getArea = function(radius) {
    return function(position) {
      radius = radius || 2;
      const coords = {lat: position.coords.latitude, long: position.coords.longitude};
      SiteService.originCoordinates = coords; 
      Search.findSitesInArea(coords, radius)
      .then(function(data){
        SiteService.siteArray = data.value.timeSeries
        $location.path('/list')
      }) 
    }
  }

  function showError(error) {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        x.textContent = "User denied the request for Geolocation."
        break;
      case error.POSITION_UNAVAILABLE:
        x.textContent = "Location information is unavailable."
        break;
      case error.TIMEOUT:
        x.textContent = "The request to get user location timed out."
        break;
      case error.UNKNOWN_ERROR:
        x.textContent = "An unknown error occurred."
        break;
    }
  }
})




