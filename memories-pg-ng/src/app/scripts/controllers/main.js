'use strict';

angular.module('memoriesApp')
  .controller('MainCtrl', function ($scope, $log, $timeout, photoService, storeFactory) {
    $scope.data = {};
    $scope.fn = {};

    $scope.data.menuTip = "���һ����������Ͻǰ�ť�򿪲˵�."
    $scope.data.emptyInfo = "��Ƭ�б�Ϊ�գ���Ͽ�ȥ���հ�!";
    
    var photoStore = storeFactory.getStore('photo');
    photoStore.getList(function(err, list) {
        if (err) return;
        $scope.data.photoList = list;
        $log.log("get photo list: " + angular.toJson(list));
    });    

    $scope.fn.isEmpty = function() {
        var list = $scope.data.photoList;
        return !list || !list.length;
    };    

    $scope.fn.getThumbail = function(index) {
        var image = $scope.data.photoList && $scope.data.photoList[index];
        return image && image.data.uri;
    };

  });
