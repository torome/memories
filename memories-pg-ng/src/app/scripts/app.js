'use strict';

angular.module('memoriesApp', ['ui.router', 'ngTouch'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/list');

    $stateProvider
    .state('list', {
      url: "/list",
      templateUrl: "partials/list.html",
      controller: 'ListCtrl'
    })    
    .state('detail', {
      url: "/detail",
      templateUrl: "partials/detail.html",
      controller: 'DetailCtrl'
    })
    .state('about', {
      url: "/about",
      templateUrl: "partials/about.html"
    });    

  });