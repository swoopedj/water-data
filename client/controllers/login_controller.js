angular.module('waterData.login', [])
.controller('loginCtrl', function($scope, $location, Login, SiteService){
  var controller = this;

  this.getLoginData = function(login) {
    SiteService.loginData = login;
    Login.authenticateUser(login)
    .then(function(data) {
      console.log("DATA: ", data)
    })
  }
});