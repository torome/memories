'use strict';

angular.module('memoriesApp', ['ngCookies', 'ngResource', 'ngSanitize', 'ngRoute', 'ngTouch', 'onsen.directives'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
