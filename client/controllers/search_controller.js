angular.module('waterData.search', [])
.controller('searchCtrl', function($scope){
  console.log('searchController in operation');
  var controller = this;
 
  this.getLatAndLong = function(address){
    console.log('getLatAndLong Called!')
    console.log('Address: ', address)
  }
})