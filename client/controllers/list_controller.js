angular.module('waterData.list', [])
.controller('listCtrl', function(SiteService, $location, $scope, Search, $cookies){
  var controller = this;
  var siteList = SiteService.siteArray
  let authData = $cookies.getObject('auth') ? JSON.parse($cookies.getObject('auth')) : null;

  this.verifiedUser = authData ? true : false;

  this.saveSite = function(site){
    //send user_id, [session_id ?], and site_id to db, create new row in user_sites
    Search.addToMySites(site, authData.user_id, authData.session_id)
    .then(function(data){
      console.log("DATA returned from addSite: ", data)
    })
    .catch(function(err){
      console.log('Error: ', err)
    })
  }

  this.siteList = siteList;

})