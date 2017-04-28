angular.module('waterData.mysites', [])
.controller('mysitesCtrl', function($scope, $location, MySites, SiteService, $cookies){
  var controller = this;
  let authData = $cookies.getObject('auth') ? JSON.parse($cookies.getObject('auth')) : null;

  function loadMySites (user_id) {
    MySites.listSites(user_id)
    .then(data => {
      console.log("DATA FROM MYSITES get: ", data)
      $scope.siteList = data.site_list;
      if(!data.site_list.length) {
        $scope.noSites = true;
      }
    })
    .catch(error => {
      console.log("Error: ", error)
    })
  }

  if(authData.user_id) {
    loadMySites(authData.user_id);
  }

});