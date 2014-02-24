'use strict';

angular.module('memoriesApp')
  .controller('ListCtrl', function ($scope, $rootScope, $state, $log, $timeout, photoService, storeFactory) {

    var data = $rootScope.data;  
    var STATUS = {
      NORMAL: 'narmal',
      EDIT: 'edit'
    };
    var status = STATUS.NORMAL,
        photoStore = storeFactory.get('photo');

    function updatePhotoList() {
      photoStore.getList(function(err, list) {
          if (err) return;
          $timeout(function() {
              $scope.data.photoList = list;          
          }, 5);
          $log.log("get photo list: " + angular.toJson(list));
      });        
    }

    function init() {
      $rootScope.$on('takePhotoOK', function(event) {
          updatePhotoList();
      });
      updatePhotoList();
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

    function _selectVisibility(index, type) {
      if (status == STATUS.NORMAL) {
          return false;
      }    
      var photo = $scope.data.photoList[+index];
      $log.log("_selectVisibility index type _delete:" + index + " " + type + " " + photo._delete);
      if (photo && photo._delete && type === 'on') {
          return true;
      } else if (photo && !photo._delete && type === 'off') {
          return true;
      }
      return false;
    }    

    function _toggleSelect(index) {
      $log.log("_toggleSelect index:" + index);  
      var photo = $scope.data.photoList[+index];
      if (photo) {
          $timeout(function() {
              photo._delete = !photo._delete;
              $log.log("_toggleSelect photo._delete :" + photo._delete);
          }, 10);
      }
    }

    function _swipeImage() {
      alert("Woo, you swipe me!");
    }

    function _touchImage() {
      $log.log("_touchImage");
      $state.go('detail');
      if (data && data.nav) {
        data.nav.title = "Photo Detail";
        data.nav.isInner = true;
      }
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
      inEdit: _inEdit,
      selectVisibility: _selectVisibility,
      toggleSelect: _toggleSelect,
      swipeImage: _swipeImage,
      touchImage: _touchImage
    };

    if (!!data.firstTime) {
      data.firstTime = false;
      init();        
    }

  });
