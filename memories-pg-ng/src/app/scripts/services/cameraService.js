'use strict';

angular.module('memoriesApp')
  .service('cameraService', function cameraService() {

	function _takePhoto(callback) {
		navigator.camera.getPicture(
			function(imageURI) {
				callback(null, imageURI);
			},
			function(message) {
			 	callback(true, message);
			}, 
			{ 
			 	quality: 50,	
			 	destinationType: Camera.DestinationType.FILE_URI 
			}
		);
	}

	return {
		takePhoto: _takePhoto
	};
});