angular.module('waterData.services', [])
.factory('Search', function($http){
  var getLatAndLong = function(address){
    console.log('getLatLong Called! Address: ', address)
    return $http({
      method: 'GET',
      url: '/api/address/' + address
    })
    .catch(function(err){
      console.log('Error in services: ', err)
    })
    .then(function(resp){
      console.log('RESPONSE: ', resp)
      return resp.data;
    });
  };

  var getSitesInArea = function(coords){
    var bBox = coords;
    return $http({
      method: 'GET',
      url:'/api/bBox/' + bBox
    })
    .catch(function(err){
      console.log('Error in services: ', err)
    })
    .then(function(resp){
      console.log('RESPONSE: ', resp)
      return resp.data;
    });
  }

  var getSiteData = function(id){
    return $http({
      method: 'GET',
      url:'/api/siteId/' + id
    })
    .catch(function(err){
      console.log('Error in services: ', err)
    })
    .then(function(resp){
      console.log('RESPONSE: ', resp)
      return resp.data;
    });
  }

  return{
    getLatAndLong: getLatAndLong,
    getSitesInArea: getSitesInArea,
    getSiteData: getSiteData
  }

})