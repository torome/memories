'use strict';

angular.module('memoriesApp')
.factory('backBtnService', function backBtnService($rootScope, $log, $location, $timeout, global, dialogService) {

  var paths = global.paths;
  var exitCounter = 0;

  function _onBackKey() {
    var path = $location.path();
    switch (path) {
      // when at home, must press twice to exit
      case paths.home:
        if (exitCounter >= 1) {
          exitCounter = 0;
          navigator.app.exitApp();
          return;
        }
        exitCounter++;
        dialogService.openExitToast(2500);
        $timeout(function() {
          exitCounter = 0;
        }, 2500);
      break;

      // go home
      case paths.about:
      case paths.detail:
        $location.path(paths.home);
      break;

      default: break;
    }    
  }

  function _init() {
    // remove the old listener, add new one
    document.removeEventListener('backbutton', onBackKey, false);
    document.addEventListener('backbutton', function() {
      $timeout(function() {
        _onBackKey();
      }, 0);
    }, false);
  }

  return {
    init: _init
  };
});