'use strict';

angular.module('memoriesApp')
  .controller('MainCtrl', function ($scope, $rootScope, $log, $timeout, photoService, storeFactory) {
    $scope.data = {};
    $scope.fn = {};

    $scope.data.menuTip = "向右滑动或点击左上角按钮打开菜单."
    $scope.data.emptyInfo = "照片列表为空，请赶快去拍照吧!";
    
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

    updatePhotoList();

  });
