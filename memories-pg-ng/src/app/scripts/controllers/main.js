'use strict';

angular.module('memoriesApp')
  .controller('MainCtrl', function ($window, $scope, $rootScope, $state, $log, dialogService, fixService, photoService, storeFactory) {

  $log.log('In MainCtrl');

  var fn = {};
  var data = {
    firstTime: true,
    nav: {}
  };
  var photoStore = storeFactory.get('photo');

  $scope.$on('$viewContentLoading', function(event){
    $log.log("$viewContentLoaded");
    jQuery(function() {
      jQuery(window).trigger("resize");
    });
  });

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

  function _goHome() {
    $log.log("Click Home");
    $state.go('home');
    if (data && data.nav) {
      data.nav.title = "Photo List";
      data.nav.isInner = false;      
    } 
  }
  
  function _goSettings() {
    $log.log("Click Settings");
  }

  function _about() {
    $log.log("Click About");
    $state.go('about');
    if (data && data.nav) {
      data.nav.title = "About";
      data.nav.isInner = false;
    }
  }

  function init() {
    document.removeEventListener("backbutton", onBackKey, false);
    document.addEventListener("backbutton", function() {
      dialogService.open('#exit-dialog', function() {
        navigator.app.exitApp();
      });
    }, false);
    
    fixService.fixTouchEffect('a.toggle-spinner');
    fixService.fixMenuClick('a[href="#settings"]', function() {
      _goSettings();
    });
    fixService.fixMenuClick('a[href="#about"]', function() {
      _about();
    });
    fixService.fixMenuClick('a[href="#edit"]', function() {
      _about();
    });
  }
  init();
  
  $rootScope.fn = {
    goHome: _goHome,
    goSettings: _goSettings,
    about: _about,
    takePhoto: _takePhoto
  };
  $rootScope.data = data;    

  });