'use strict';

angular.module('memoriesApp')
.controller('AboutCtrl', function ($scope, $rootScope, $location, fixService, global) {
  
  var rootData = $rootScope.rootData;
  var paths = global.paths;

  function init() {
    if (rootData && rootData.nav) {
      rootData.nav.title = 'About';
      rootData.nav.isInner = true;
    }
    fixService.hideMenuItem('a[href="#edit"]');
  }

  init();

});