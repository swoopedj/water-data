angular.module('waterData.search', [])
.controller('searchCtrl', function($scope, $location, Search, SiteService){
  // console.log('searchController in operation');
  var controller = this;
 
  this.getSitesByLatLong = function(address){
    console.log('getLatLong Called!')
    var radius = address.proximity
    var address = address.street + ',' + address.city + ',' + address.state    
    Search.getLatAndLong(address)
    .then(function(coordinates){
      console.log('Coordinates: ', coordinates)
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
      // console.log('westLong: ', westLong)
      var southLat = round(bBox.south).toString()
      // console.log('southLat: ', southLat)
      var eastLong = round(bBox.east).toString()
      // console.log('eastLong: ', eastLong)
      var northLat = round(bBox.north).toString()
      console.log('northLat: ', northLat)

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