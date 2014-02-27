'use strict';

angular.module('memoriesApp')
.controller('MainCtrl', function ($window, $scope, $rootScope, $location, $log, global, dialogService, fixService, photoService, storeFactory) {

  var photoStore = storeFactory.get('photo');
  var takePhotoEvent = global.events.takePhoto;
  var data = {
    firstTime: true,
    nav: {}
  };


  function _takePhoto() {
    $log.log('_takePhoto!');
    photoService.takePhoto(function(err, data) {
      if (!err) {
        $log.log('Take photo success! The data is: ' + data);       
        photoStore.add({'uri': data}, function() {
          $rootScope.$emit(takePhotoEvent);
        });
      } else {
        $log.log('Take photo error!' + data);
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
    $log.log('Click About');
    $location.path('/about');
    data.nav.title = 'About';
    data.nav.isInner = true;
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
  
  $rootScope.fn = {
    goHome: _goHome,
    goSettings: _goSettings,
    about: _about,
    edit: _edit,
    takePhoto: _takePhoto
  };

  $rootScope.data = data;    

  init();
  
});