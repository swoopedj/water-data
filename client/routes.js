angular.module('waterData')
.config(function($stateProvider, $urlRouterProvider) {
  
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'views/home_view.html',
      controller: 'homeCtrl'
    })
    .state('search', {
      url: '/search',
      templateUrl: 'views/search_view.html',
      controller: 'searchCtrl'
    })
    // .state('results', {
    //   url: 'results',
    //   templateUrl: 'views/results_view.html',
    //   controller: 'resultsCtrl'
    // })
  
})