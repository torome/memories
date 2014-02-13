'use strict';

angular.module('memoriesApp')
  .controller('MenuCtrl', function ($scope, $rootScope, $log, photoService, storeFactory) {
    $scope.data = {};
    $scope.fn = {};

    var photoStore = storeFactory.getStore('photo');

    $scope.fn.takePhoto = function() {
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
    };

    $scope.fn.gotoHome = function() {
        ons.slidingMenu.toggleMenu();
        ons.slidingMenu.setAbovePage('views/main.html')
    };
  });