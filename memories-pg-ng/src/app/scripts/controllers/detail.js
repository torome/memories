'use strict';

angular.module('memoriesApp')
.controller('DetailCtrl', function ($routeParams, $scope, $rootScope, $log, fixService, photoService, storeFactory) {

  var rootData = $rootScope.rootData;
  var photoStore = storeFactory.get('photo');

  function init() {
    if (rootData && rootData.nav) {
      rootData.nav.title = 'Photo Detail';
      rootData.nav.isInner = true;
    }
    fixService.hideMenuItem('a[href="#edit"]');
  }

  $scope.data = $scope.data || {
    photoId: $routeParams.photoId || ''
  };

  init();
  
});