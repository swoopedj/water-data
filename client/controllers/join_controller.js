angular.module('waterData.join', [])
.controller('joinCtrl', function($scope, $location, Join, SiteService){
  var controller = this;

  this.getJoinData = function(userData) {
    SiteService.joinData = userData;
    Join.createUser(userData)
    .then(function(data) {
      $location.path('/home')
    })
  }
});