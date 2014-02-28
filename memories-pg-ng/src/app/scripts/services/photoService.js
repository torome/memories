'use strict';

angular.module('memoriesApp')
.factory('photoService', function photoService() {

  // take photo
  function _takePhoto(callback) {
    navigator.camera.getPicture(
      function(imageURI) {
        callback(null, imageURI);
      },
      function(message) {
        callback(true, message);
      }, 
      { 
        quality: 75,
        destinationType: Camera.DestinationType.FILE_URI
      }
    );
  }

  return {
    takePhoto: _takePhoto
  };

});