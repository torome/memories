'use strict';

angular.module('memoriesApp')
  .service('cameraService', function cameraService() {

	this.takePhoto = function (callback) {
		navigator.camera.getPicture(
			function(imageURI) {
				callback(null, imageURI);
			},
			function(message) {
			 	callback(true, message);
			}, 
			{ 
			 	quality: 75,
			 	destinationType: Camera.DestinationType.FILE_URI,
			 	saveToPhotoAlbum: true
			}
		);
	};

});