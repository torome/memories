'use strict';

angular.module('memoriesApp')
.controller('MainCtrl', function ($window, $scope, $rootScope, $location, $log, global, backBtnService, dialogService, fixService, photoService, storeFactory) {

  var photoStore = storeFactory.get('photo');
  var settingStore = storeFactory.get('settings', true);
  var events = global.events;
  var paths = global.paths;
  
  $rootScope.rootData = {
    firstTime: true,
    nav: {},
  };

  function _takePhoto() {
    photoService.takePhoto(function(err, photoData) {
      if (!err) {
        photoStore.add({'uri': photoData}, function() {
          $rootScope.$emit(events.updatePhoto);
          $location.path(paths.home);
        });
      } else {
        $log.error('Take photo error!' + photoData);
      }
    });
  }

  function _goHome() {
    $location.path(paths.home);
  }
  
  function _goSettings() {
    $location.path(paths.settings);
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
    // init settigs
    settingStore.getItem(function(err, item) {
      if (!err) {
        $rootScope.rootData.settings = _.defaults(item, {
          photoQuality: 75
        });
      }
    });

    // init back button service
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

  init();
  
});