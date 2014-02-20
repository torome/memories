'use strict';

angular.module('memoriesApp')
  .controller('MainCtrl', function ($window, $scope, $rootScope, $location, $log, dialogService, fixService, photoService, storeFactory) {

    var fn = {};
    var data = {
        firstTime: true,
        nav: {}
    };
    var photoStore = storeFactory.get('photo');

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
        $location.path('/');
    }
    
    function _goSettings(msg) {
        msg = msg || '';
        $log.log("Click Settings" + msg);
    }

    function _about(msg) {
        msg = msg || '';
        $log.log("Click About" + msg);
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