'use strict';

angular.module('memoriesApp')
  .service('storeService', function storeService() {

	var photoList = new Lawnchair({name:'photoList', record:'photo'}, function() {});

 	function _addPhoto(imageURI, callback) {
		if (imageURI) {
			photoList.save({
				'uri': imageURI
			}, function () {
				callback(null);
			});
		} else {
			callback(true, 'URI is empty!');
		}
	}

	function _getPhotoList(callback) {
		photoList.all(function(list) {
			callback(null, list);
		});
	}

	function _removePhoto(key, callback) {
		if (key) {
			photoList.remove(key, function () {
				callback(null);
			});
		} else {
			callback(true, 'key is empty!');
		}		
	}	

	return {
		addPhoto: _addPhoto,
		getPhotoList: _getPhotoList,
		removePhoto: _removePhoto
	};
});