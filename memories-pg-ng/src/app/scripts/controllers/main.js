'use strict';

angular.module('memoriesApp')
  .controller('MainCtrl', function ($scope, $log, storeFactory) {
    $scope.data = {};
    $scope.fn = {};

    var photoStore = storeFactory.getStore('photo');

    photoStore.getList(function(err, data) {
    	if (!err) {
    		$scope.data.photoList = data;
    		$log.log("get photo list: " + angular.toJson(data));
    	}
    });
    
    $scope.data.menuTip = "向右滑动或点击左上角按钮打开菜单."
    $scope.data.emptyInfo = "照片列表为空，请赶快去拍照吧!";

    $scope.fn.isEmpty = function() {
    	var list = $scope.data.photoList;
    	return !list || !list.length;
    };

  });
