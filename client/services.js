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
      console.log('RESPONSE in services: ', resp.data.results[0].geometry.location)
      // getSitesInArea(resp, radius)
      return resp.data.results[0].geometry.location;
    });
  };

  var getSitesInArea = function(bBox){
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
.service('SiteService', function(){
  this.site = '';
  this.siteArray = '';
})




