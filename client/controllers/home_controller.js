angular.module('waterData.home', [])
.controller('homeCtrl', function($scope, SiteService, $cookies, Login){
  var controller = this;
  let authData = $cookies.getObject('auth') ? JSON.parse($cookies.getObject('auth')) : null;
  if(authData) {
    Login.verifySession(authData.session_id)
    .then(response => {
      console.log('resopnse from verify: ', response)
      if(response.sid) {
        $scope.loggedIn = true;
      }
      else { $scope.loggedIn = false}
    })
    .catch(function(err){
      console.log('Error: ', err)
    })
  }


  $scope.logout = function () {
    $cookies.remove('auth');

    SiteService.logout(authData)
    .then(data => {
      console.log("Logout data: ", data)
    })
    .catch(error => {
      console.log("Error: ", error)
    })
  }

})