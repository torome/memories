'use strict';

angular.module('memoriesApp', ['ui.router', 'ngTouch'])
  .config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    var list = {
      templateUrl: "partials/list.html",
      controller: 'ListCtrl'
    };
    var listActions = {
      templateUrl: "partials/actions.list.html"
    };
    var detailActions = {
      templateUrl: "partials/actions.detail.html"
    };

    $stateProvider
    .state('home', {
      url: "/home",
      views: {
        "main": list,
        "actions": listActions
      }
    })
    .state('detail', {
      url: "/detail",
      controller: 'DetailCtrl',
      views: {
        "main": list,
        "actions": detailActions
      }      
    })
    .state('about', {
      url: "/about",
      views: {
        "main": { templateUrl: "partials/about.html" }
      }
    });    

  });