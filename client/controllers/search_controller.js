angular.module('waterData.search', [])
.controller('searchCtrl', function($scope, $location, Search, SiteService){
  var controller = this;
 
  this.getSitesByLatLong = function(address){
    var radius = address.proximity || 5
    var address = address.street + ',' + address.city + ',' + address.state    
    Search.getLatAndLong(address)
    .then(function(coordinates){
      const coords = {lat: coordinates.lat, long: coordinates.lng};
      SiteService.originCoordinates = coords;

      return Search.findSitesInArea(coords, radius)
    })
    .then(function(site_list){
      SiteService.siteArray = site_list.value.timeSeries
      $location.path('/list')

    })

    function round(n){
      var str = n.toString()
      if(str.indexOf('.') !== -1){
        var index = str.indexOf('.')
        var decimalSlice = str.slice(index, index + 6)
        var integerSlice = str.slice(0, index)
        return Number(integerSlice + decimalSlice)
      } else {return n}
    }

  }

})