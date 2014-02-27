'use strict';

angular.module('memoriesApp', ['ngRoute', 'ngTouch'])
.config(function ($routeProvider) {

  // use grid layout for old android (no scrolling)
  var oldAndroid = false;
  if (device) {
    if (device.platform.toLowerCase === 'android' && parseFloat(device.version) < 3) {
      oldAndroid = true;
    }
  }

  // routing
  $routeProvider
    .when('/detail', {
      templateUrl: 'views/detail.html',
      controller: 'DetailCtrl'
    })      
    .when('/', {
      templateUrl: function() {
        return oldAndroid? 'views/grid.html' : 'views/list.html';
       },
      controller: 'ListCtrl'
    })
    .when('/about', {
      templateUrl: 'views/about.html'
    })
    .otherwise({
      redirectTo: '/'
    });
});