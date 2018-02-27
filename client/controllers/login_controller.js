angular.module('waterData.login', [])
.controller('loginCtrl', function($scope, $location, Login, SiteService, $cookies){
  var controller = this;

  this.getLoginData = function(login) {
    SiteService.loginData = login;
    Login.authenticateUser(login)
    .then(function(data) {
      if(data.user_id && data.current_session) {
        let auth = JSON.stringify({user_id: data.user_id, session_id: data.current_session});
        $cookies.putObject('auth', auth);
      }
      $location.path('/home')
    })
  }
});