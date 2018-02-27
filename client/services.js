angular.module('waterData.services', [])
.factory('Search', function($http){
  var getLatAndLong = function(address){
    return $http({
      method: 'GET',
      url: '/api/address/' + address
    })
    .then(function(resp){
      return resp.data.results[0].geometry.location;
    })
    .catch(function(err){
      console.log('Error: ', err)
    });
  };

  var findSitesInArea = function(coords, radius){
    return $http({
      method: 'GET',
      url: '/api/geo-bBox/',
      params: {lat: coords.lat, long: coords.long, radius: radius}
    })
    .then(function(resp){
      return resp.data;
    })
    .catch(function(err){
      console.log('Error: ', err)
    })
  }

  var addToMySites = function(siteData, user_id, session_id){
    return $http({
      method: 'POST',
      url: '/api/addSite/',
      params: {site_id: siteData.site_id, user_id: user_id, session_id: session_id}
    })
    .then(function(resp){
      return resp.data;
    })
    .catch(function(err){
      console.log('Error: ', err)
    })
  }

  var getSiteData = function(id){
    return $http({
      method: 'GET',
      url:'/api/siteId/' + id
    })
    .then(function(resp){
      return resp.data;
    })
    .catch(function(err){
      console.log('Error: ', err)
    })
  }

  return{
    getLatAndLong: getLatAndLong,
    findSitesInArea: findSitesInArea,
    getSiteData: getSiteData,
    addToMySites: addToMySites
  }

})
.factory('Login', function($http) {
  var authenticateUser = function(loginData) {
    return $http({
      method: 'GET',
      url: '/api/login/',
      params: {username: loginData.username, password: loginData.password}
    })
    .then(function(resp){
      return resp.data;
    })
    .catch(function(err){
      console.log('Error: ', err)
    })
  }

  var verifySession = function(session_id) {
    console.log("session_id: ", session_id)
    return $http({
      method: 'GET',
      url: '/api/verify/',
      params: {session_id: session_id}
    })
    .then(function(resp){
      return resp.data;
    })
    .catch(function(err){
      console.log('Error: ', err)
    })
  }

  return {
    authenticateUser: authenticateUser,
    verifySession: verifySession
  }
})
.factory('Join', function($http) {
  var createUser = function(joinInfo) {
    return $http({
      method: 'POST',
      url: '/api/register/',
      params: {username: joinInfo.username, password: joinInfo.password, email: joinInfo.email}
    })
    .then(function(resp){
      return resp.data;
    })
    .catch(function(err){
      console.log('Error: ', err)
    })
  }

  return {
    createUser: createUser
  }
})
.factory('MySites', function($http){
  var listSites = function(user_id) {
    return $http({
      method: 'GET',
      url: '/api/mySites',
      params: {user_id: user_id}
    })
    .then(function(resp){
      return resp.data;
    })
    .catch(function(err){
      console.log('Error: ', err)
    })
  }
  var logout = function(authData){
    return $http({
      method: 'DELETE',
      url: '/api/logout',
      params: {user_id: authData.user_id, session_id: authData.session_id}
    })
    .then(function(resp){
      return resp.data;
    })
    .catch(function(err){
      console.log('Error: ', err)
    })
  }

  return {
    listSites: listSites,
    logout: logout
  }
})
.factory('Stats', function($http){
  var getStats = function(site_id){
    return $http({
      method: 'GET',
      url: '/api/stats',
      params: {id: site_id}
    })
    .then(function(resp){
      return resp.data;
    })
    .catch(function(err){
      console.log('Error: ', err)
    })
  }

  return {
    getStats: getStats
  }
})
.service('SiteService', function($http){
  this.site = '';
  this.siteArray = '';
  this.originCoordinates = {};
  this.loginData = {};
  this.joinData = {};
  this.logout = function(authData){
    console.log("authData: ", authData)
    return $http({
      method: 'DELETE',
      url: '/api/logout',
      params: {user_id: authData.user_id, session_id: authData.session_id}
    })
    .then(function(resp){
      return resp.data;
    })
    .catch(function(err){
      console.log('Error: ', err)
    })
  };
})




