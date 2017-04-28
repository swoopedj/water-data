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
    .state('find', {
      url: '/find',
      templateUrl: 'views/find_view.html',
      controller: 'findCtrl',
      controllerAs: 'findCtrl'
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
    .state('login', {
      url: '/login',
      templateUrl: 'views/login_view.html',
      controller: 'loginCtrl',
      controllerAs: 'loginCtrl'
    })
    .state('mysites', {
      url: '/mysites',
      templateUrl: 'views/mysites_view.html',
      controller: 'mysitesCtrl',
      controllerAs: 'mysitesCtrl'
    })
    .state('join', {
      url: '/join',
      templateUrl: 'views/join_view.html',
      controller: 'joinCtrl',
      controllerAs: 'joinCtrl'
    })

  $locationProvider.html5Mode(true);
  $locationProvider.hashPrefix('');
  
})