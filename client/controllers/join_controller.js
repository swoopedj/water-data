angular.module('waterData.join', [])
.controller('joinCtrl', function($scope, $location, Join, SiteService, $cookies){
  var controller = this;

  this.getJoinData = function(userData) {
    SiteService.joinData = userData;
    Join.createUser(userData)
    .then(function(data) {
      console.log("DATA: ", data)
    })
  }
});