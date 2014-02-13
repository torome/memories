'use strict';

angular.module('memoriesApp')
  .controller('MenuCtrl', function ($scope, $log, cameraService, storeFactory) {
    $scope.data = {};
    $scope.fn = {};

    var photoStore = storeFactory.getStore('photo');

    $scope.fn.takePhoto = function() {
    	cameraService.takePhoto(function(err, data) {
    		if (!err) {
    			$log.log("Take photo success! The data is: " + data);    		
    		} else {
    			$log.log("Take photo error!" + data);
    		}
            photoStore.add({'uri': data});
    	});
    }
  });