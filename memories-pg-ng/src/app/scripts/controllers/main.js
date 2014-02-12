'use strict';

angular.module('memoriesApp')
  .controller('MainCtrl', function ($scope) {
    $scope.data = {};
    $scope.fn = {};

    $scope.data.menuTip = "向右滑动或点击左上角按钮打开菜单."
    $scope.data.emptyInfo = "照片列表为空，请赶快去拍照吧!";
  });
