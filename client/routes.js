angular.module('waterData')
.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  
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
      controller: 'searchCtrl',
      controllerAs:'searchCtrl'
    })
    .state('list', {
      url: '/list',
      templateUrl: 'views/list_view.html',
      controller: 'listCtrl',
      controllerAs: 'listCtrl'
    })
    .state('site', {
      url: '/site',
      templateUrl: 'views/site_view.html',
      controller: 'siteCtrl',
      controllerAs: 'siteCtrl'
    })

  $locationProvider.html5Mode(true);
  $locationProvider.hashPrefix('');
  
})