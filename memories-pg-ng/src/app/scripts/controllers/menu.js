'use strict';

angular.module('memoriesApp')
  .controller('MenuCtrl', function ($scope, $log, cameraService, storeService) {
    $scope.data = {};
    $scope.fn = {};

    $scope.fn.takePhoto = function() {
    	cameraService.takePhoto(function(err, data) {
    		if (!err) {
    			$log.log("Take photo success! The data is: " + data);    		
    		} else {
    			$log.log("Take photo error!" + data);
    		}
            storeService.addPhoto(data);
    	});
    }
  });