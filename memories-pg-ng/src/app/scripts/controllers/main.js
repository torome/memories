'use strict';

angular.module('memoriesApp')
  .controller('MainCtrl', function ($scope, $rootScope, $log, $timeout, photoService, storeFactory) {
    $scope.data = {};
    $scope.fn = {};

    $scope.data.startPage = "navigator.html";
    $scope.data.menuTip = "Swipe right/left to open or close menu."
    $scope.data.emptyInfo = "Photo list is empty.";
    
    var photoStore = storeFactory.getStore('photo');
    function updatePhotoList() {
        photoStore.getList(function(err, list) {
            if (err) return;
            $timeout(function() {
                $scope.data.photoList = list;                
            }, 5);
            $log.log("get photo list: " + angular.toJson(list));
        });        
    }
    $rootScope.$on('takePhoto', function(event) {
        updatePhotoList();
    });

    $scope.fn.isEmpty = function() {
        var list = $scope.data.photoList;
        return !list || !list.length;
    };    

    $scope.fn.getThumbail = function(index) {
        var image = $scope.data.photoList && $scope.data.photoList[index];
        return image && image.data.uri;
    };

    $scope.fn.getTime = function(index) {
        var image = $scope.data.photoList && $scope.data.photoList[index];
        return image && image.time;
    };

    $scope.fn.clickEdit = function() {
        alert("clickEdit");
    };     

    $scope.fn.deletePhoto = function() {
        alert("deletePhoto");
    };   

    updatePhotoList();

  })
.controller('ListCtrl', function ($scope, $rootScope, $log, $timeout, photoService, storeFactory) {
    $scope.data = {};
    $scope.fn = {};

    $scope.fn.deletePhoto = function() {
        alert("deletePhoto");
    };  
});
