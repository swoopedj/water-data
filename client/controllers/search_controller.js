angular.module('waterData.search', [])
.controller('searchCtrl', function($scope, $location, Search, SiteService){
  var controller = this;
 
  this.getSitesByLatLong = function(address){
    var radius = address.proximity || 2
    var address = address.street + ',' + address.city + ',' + address.state    
    Search.getLatAndLong(address)
    .then(function(coordinates){
      SiteService.originCoordinates = {lat: coordinates.lat, lng: coordinates.lng}
      var longitude_constant = 0.018315;
      var latitude_constant = 0.014492;
      var bBox = {
        west: coordinates.lng - (radius * longitude_constant),
        south: coordinates.lat - (radius * latitude_constant),
        east: coordinates.lng + (radius * longitude_constant),
        north: coordinates.lat + (radius * latitude_constant)
      }
      var westLong = round(bBox.west).toString()
      var southLat = round(bBox.south).toString()
      var eastLong = round(bBox.east).toString()
      var northLat = round(bBox.north).toString()

      var bBox = westLong + ',' + southLat + ',' + eastLong + ',' + northLat; 

      return Search.getSitesInArea(bBox)
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

  // this.getDataBySiteId = function(site_id){

  // }

})