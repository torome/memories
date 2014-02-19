'use strict';

angular.module('memoriesApp')
  .controller('MainCtrl', function ($scope, $rootScope, $location, $log, photoService, storeFactory) {

    var fn = {};
    var data = {
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

    function _goSettings() {
        // TODO
        $log.log("_goSettings");
    }

    $rootScope.fn = {
        goHome: _goHome,
        goSettings: _goSettings,
        takePhoto: _takePhoto
    };
    $rootScope.data = data;

  });