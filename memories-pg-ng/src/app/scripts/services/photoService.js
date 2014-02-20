'use strict';

angular.module('memoriesApp')
  .service('photoService', function photoService() {

  this.takePhoto = function(callback) {
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
  };

});