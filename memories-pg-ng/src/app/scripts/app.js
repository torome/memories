'use strict';

angular.module('memoriesApp', ['ngRoute', 'ngTouch'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/detail', {
        templateUrl: 'views/detail.html',
        controller: 'DetailCtrl'
      })      
      .when('/', {
        templateUrl: 'views/list.html',
        controller: 'ListCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });