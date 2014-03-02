'use strict';

angular.module('memoriesApp')
.factory('backBtnService', function backBtnService($rootScope, $log, $location, $timeout, global, dialogService) {

  var paths = global.paths;
  var exitCounter = 0;

  function _onBackKey() {
    var path = $location.path();
    path = path.split('/');
    path = _.compact(path)[0] || '';
    path = '/' + path;
    switch (path) {
      // when at home, must press back key twice to exit
      case paths.home:
        if (exitCounter >= 1) {
          exitCounter = 0;
          navigator.app.exitApp();
          return;
        }
        exitCounter++;
        dialogService.openToast('Press the back key again to exit', 2500);
        $timeout(function() {
          exitCounter = 0;
        }, 2500);
      break;

      // go home
      case paths.setting:
      case paths.about:
      case paths.detail:
        $location.path(paths.home);
      break;

      default: break;
    }    
  }

  function _init() {
    // remove old backbutton listener, add the new one
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