'use strict';

angular.module('memoriesApp')
.controller('DetailCtrl', function ($scope, $rootScope, $log, fixService, photoService, storeFactory) {

  var rootData = $rootScope.rootData;
  var photoStore = storeFactory.get('photo');

  function init() {
    if (rootData && rootData.nav) {
      rootData.nav.title = 'Photo Detail';
      rootData.nav.isInner = true;
    }
    fixService.hideMenuItem('a[href="#edit"]');
  }

  function _takePhoto() {
    $log.log('_takePhoto!');
    photoService.takePhoto(function(err, photoData) {
      if (!err) {
        $log.log('Take photo success! The photoData is: ' + photoData);
        photoStore.add({'uri': photoData}, function() {
            $rootScope.$emit('takePhotoOK');
        });
      } else {
        $log.log('Take photo error!' + photoData);
      }
    });
  }

  $rootScope.$on('takePhoto', function(event) {
    _takePhoto();
  });

  $scope.fn = {
    takePhoto: _takePhoto,
    testClick: function(msg) {
      $log.log('testClick ' + msg);
    }
  };

  init();
  
});