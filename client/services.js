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
      console.log("RESP: ", resp)
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
.factory('Login', function($http) {
  var authenticateUser = function(loginInfo) {
    return $http({
      method: 'GET',
      url: '/api/login/',
      params: {username: login.username, password: login.password}
    })
    .catch(function(err){
      console.log('Error: ', err)
    })
    .then(function(resp){
      return resp.data;
    });
  }

  return {
    authenticateUser: authenticateUser
  }
})
.factory('Join', function($http) {
  var createUser = function(joinInfo) {
    return $http({
      method: 'POST',
      url: '/api/register/',
      params: {username: joinInfo.username, password: joinInfo.password, email: joinInfo.email}
    })
    .catch(function(err){
      console.log('Error: ', err)
    })
    .then(function(resp){
      return resp.data;
    });
  }

  return {
    createUser: createUser
  }
})
.service('SiteService', function(){
  this.site = '';
  this.siteArray = '';
  this.originCoordinates = {};
  this.loginData = {};
  this.joinData = {};
})




