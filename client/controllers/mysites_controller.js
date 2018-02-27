angular.module('waterData.mysites', [])
.controller('mysitesCtrl', function($scope, $location, MySites, SiteService, $cookies){
  var controller = this;
  let authData = $cookies.getObject('auth') ? JSON.parse($cookies.getObject('auth')) : null;

  function loadMySites (user_id) {
    MySites.listSites(user_id)
    .then(data => {
      $scope.siteList = data.site_list;
      if(!data.site_list.length) {
        $scope.noSites = true;
      }
    })
    .catch(error => {
      console.log("Error: ", error)
    })
  }

  if(authData) {
    loadMySites(authData.user_id);
  }

  this.logout = () => {
    $cookies.remove('auth');
    MySites.logout(authData)
    .then(data => {
      console.log("Logout data: ", data)
    })
    .catch(error => {
      console.log("Error: ", error)
    })
  }

});