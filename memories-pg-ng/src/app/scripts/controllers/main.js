'use strict';

angular.module('memoriesApp')
.controller('MainCtrl', function ($window, $scope, $rootScope, $location, $log, global, backBtnService, dialogService, fixService, photoService, storeFactory) {

  var photoStore = storeFactory.get('photo');
  var events = global.events;
  var paths = global.paths;
  var rootData = {
    firstTime: true,
    nav: {}
  };

  function _takePhoto() {
    photoService.takePhoto(function(err, photoData) {
      if (!err) {
        photoStore.add({'uri': photoData}, function() {
          $rootScope.$emit(events.updatePhoto);
        });
      } else {
        $log.error('Take photo error!' + photoData);
      }
    });
  }
  $rootScope.$on(events.takePhoto, function(event) {
    _takePhoto();
  });

  function _goHome() {
    $location.path(paths.home);
  }
  
  function _goSettings() {
    $log.log('Click Settings');
  }

  function _edit() {
    $log.log('Click Edit');
  }

  function _about() {
    $location.path(paths.about);
    rootData.nav.title = 'About';
    rootData.nav.isInner = true;
  }

  function init() {
    // process back button
    backBtnService.init();
    
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