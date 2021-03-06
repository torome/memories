'use strict';

angular.module('memoriesApp', ['ngRoute', 'ngTouch'])
.config(function ($routeProvider) {

  // use grid layout for old android (no scrolling)
  var photoView = 'views/grid.html';
  var photoCtrl = 'GridCtrl';
  if (device) {
    if (device.platform.toLowerCase() === 'android' && parseFloat(device.version) >= 3) {
      photoView = 'views/list.html';
      photoCtrl = 'ListCtrl';
    }
  }

  // routing
  $routeProvider
    .when('/', {
      templateUrl: photoView,
      controller: photoCtrl
    })
    .when('/detail/:photoId', {
      templateUrl: 'views/detail.html',
      controller: 'DetailCtrl'
    })
    .when('/about', {
      templateUrl: 'views/about.html',
      controller: 'AboutCtrl'
    })
    .when('/settings', {
      templateUrl: 'views/settings.html',
      controller: 'SettingsCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
});