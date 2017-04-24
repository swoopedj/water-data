angular.module('waterData.services', [])
.factory('Search', function($http){
  var getLatAndLong = function(address){
    return $http({
      method: 'GET',
      url: '/api/address/' + address
    })
    .catch(function(err){
      console.log('Error: ', err)
    })
    .then(function(resp){
      return resp.data.results[0].geometry.location;
    });
  };

  var findSitesInArea = function(coords, radius){
    return $http({
      method: 'GET',
      url: '/api/geo-bBox/',
      params: {lat: coords.lat, long: coords.long, radius: radius}
    })
    .catch(function(err){
      console.log('Error: ', err)
    })
    .then(function(resp){
      return resp.data;
    });
  }

  var getSiteData = function(id){
    return $http({
      method: 'GET',
      url:'/api/siteId/' + id
    })
    .catch(function(err){
      console.log('Error: ', err)
    })
    .then(function(resp){
      return resp.data;
    });
  }

  return{
    getLatAndLong: getLatAndLong,
    findSitesInArea: findSitesInArea,
    getSiteData: getSiteData
  }

})
.service('SiteService', function(){
  this.site = '';
  this.siteArray = '';
  this.originCoordinates = {};
})




