'use strict';

angular.module('memoriesApp')
.controller('DetailCtrl', function ($routeParams, $location, $scope, $rootScope, $log, global, dialogService, fixService, photoService, storeFactory) {

  var rootData = $rootScope.rootData;
  var photoStore = storeFactory.get('photo');
  var paths = global.paths;

  $scope.data = $scope.data || {
    photoId: $routeParams.photoId || ''
  };
  
  function init() {
    if (rootData && rootData.nav) {
      rootData.nav.title = 'Photo Detail';
      rootData.nav.isInner = true;
    }
    fixService.hideMenuItem('a[href="#edit"]');
    
    // get photo from store
    if ($scope.data.photoId) {
      photoStore.getItem($scope.data.photoId, function(err, photo) {
        if (!err) {
          $scope.data.photo = photo;
        }
      });
    }
  }

  function _deletePhoto() {
    if ($scope.data.photoId) {
      dialogService.openDialog('delete-dialog', function() {
        $rootScope.$apply(function() {
          photoStore.remove($scope.data.photoId, function() {
            $location.path(paths.home);          
          });
        });
      });
    }
  }

  $scope.fn = {
    deletePhoto: _deletePhoto
  };

  init();
  
});