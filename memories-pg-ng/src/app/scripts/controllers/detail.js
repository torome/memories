'use strict';

angular.module('memoriesApp')
.controller('DetailCtrl', function ($scope, $rootScope, $log, fixService, photoService, storeFactory) {

  var data = $rootScope.data;
  var photoStore = storeFactory.get('photo');

  function init() {
    if (data && data.nav) {
      data.nav.title = "Photo Detail";
      data.nav.isInner = true;
    }
    fixService.hideMenuItem('a[href="#edit"]'); 
  }

  function _takePhoto() {
    $log.log("_takePhoto!");
    photoService.takePhoto(function(err, data) {
      if (!err) {
        $log.log("Take photo success! The data is: " + data);       
        photoStore.add({'uri': data}, function() {
            $rootScope.$emit('takePhotoOK');
        });
      } else {
        $log.log("Take photo error!" + data);
      }
    });
  }

  $rootScope.$on('takePhoto', function(event) {
    _takePhoto();
  });

  $scope.fn = {
    takePhoto: _takePhoto,
    testClick: function(msg) {
        $log.log("testClick " + msg);
    }
  };

  init();
  
});