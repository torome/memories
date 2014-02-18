'use strict';

angular.module('memoriesApp')
  .controller('MainCtrl', function ($scope, $rootScope, $log, photoService, storeFactory) {

    var photoStore = storeFactory.getStore('photo');
    function _takePhoto() {
        $log.log("_takePhoto!");
    	photoService.takePhoto(function(err, data) {
    		if (!err) {
    			$log.log("Take photo success! The data is: " + data);    		
                photoStore.add({'uri': data}, function() {
                    $rootScope.$emit('takePhoto');
                });
            } else {
                $log.log("Take photo error!" + data);
            }
        });
    }

    function _gotoHome() {
        ons.slidingMenu.toggleMenu();
        ons.slidingMenu.setAbovePage('views/main.html')
    }

    $scope.fn = {
        takePhoto: _takePhoto,
        gotoHome: _gotoHome
    };

  });