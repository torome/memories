'use strict';

angular.module('memoriesApp')
.controller('MainCtrl', function ($window, $scope, $rootScope, $location, $log, global, dialogService, fixService, photoService, storeFactory) {

  var photoStore = storeFactory.get('photo');
  var takePhotoEvent = global.events.takePhoto;
  var addPhotoEvent = global.events.addPhoto;
  var rootData = {
    firstTime: true,
    nav: {}
  };

  function _takePhoto() {
    photoService.takePhoto(function(err, photoData) {
      if (!err) {
        photoStore.add({'uri': photoData}, function() {
          $rootScope.$emit(addPhotoEvent);
        });
      } else {
        $log.error('Take photo error!' + photoData);
      }
    });
  }
  $rootScope.$on(takePhotoEvent, function(event) {
    _takePhoto();
  });

  function _goHome() {
    $location.path('/');
  }
  
  function _goSettings() {
    $log.log('Click Settings');
  }

  function _edit() {
    $log.log('Click Edit');
  }

  function _about() {
    $location.path('/about');
    rootData.nav.title = 'About';
    rootData.nav.isInner = true;
  }

  function init() {
    // process back button
    document.removeEventListener('backbutton', onBackKey, false);
    document.addEventListener('backbutton', function() {
      dialogService.open('#exit-dialog', function() {
        navigator.app.exitApp();
      });
    }, false);
    
    // fix action bar menu for old android
    fixService.fixTouchEffect('a.toggle-spinner');
    fixService.fixMenuClick('a[href="#settings"]', function() {
      _goSettings();
    });
    fixService.fixMenuClick('a[href="#edit"]', function() {
      _edit();
    });    
    fixService.fixMenuClick('a[href="#about"]', function() {
      _about();
    });
  }
  
  $rootScope.rootFn = {
    goHome: _goHome,
    goSettings: _goSettings,
    about: _about,
    edit: _edit,
    takePhoto: _takePhoto
  };

  $rootScope.rootData = rootData;    

  init();
  
});