'use strict';

angular.module('memoriesApp')
  .controller('ListCtrl', function ($scope, $rootScope, $log, $timeout, photoService, storeFactory) {
    
    var STATUS = {
        NORMAL: 'narmal',
        EDIT: 'edit'
    };
    var status = STATUS.NORMAL,
        photoStore = storeFactory.getStore('photo');
    function updatePhotoList() {
        photoStore.getList(function(err, list) {
            if (err) return;
            $timeout(function() {
                $scope.data.photoList = list;                
            }, 5);
            $log.log("get photo list: " + angular.toJson(list));
        });        
    }

    function _listIsEmpty() {
        var list = $scope.data.photoList;
        return !list || !list.length;
    }

    function _getThumbail(index) {
        var image = $scope.data.photoList && $scope.data.photoList[index];
        return image && image.data.uri;
    }

    function _getTime(index) {
        var image = $scope.data.photoList && $scope.data.photoList[index];
        return image && image.time;
    }

    function _clickEdit() {      
        $log.log("clickEdit");
    }

    function _changeStatus(currentStatus) {
        $scope.$apply(function() {
            status = currentStatus;
        });
    }

    function _toEdit() {     
        $log.log("_toEdit");
        _changeStatus(STATUS.EDIT);
    }

    function _exitEdit() {     
        $log.log("_eixtEdit");
        _changeStatus(STATUS.NORMAL);
    }

    function _inEdit() {
        $log.log("_inEdit");  
        return status == STATUS.EDIT;
    }

    $scope.data = {
        emptyInfo: "Photo list is empty."
    };

    $scope.fn = {
        listIsEmpty: _listIsEmpty,
        getThumbail: _getThumbail,
        getTime: _getTime,
        clickEdit: _clickEdit,
        toEdit: _toEdit,
        exitEdit: _exitEdit,
        inEdit: _inEdit
    };

    updatePhotoList();

  });
