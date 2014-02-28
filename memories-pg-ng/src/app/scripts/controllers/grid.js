'use strict';

angular.module('memoriesApp')
.controller('GridCtrl', function ($scope, $rootScope, $log, $timeout, global, fixService, photoService, storeFactory) {

  var rootData = $rootScope.rootData;
  var events = global.events;
  var STATUS = {
    NORMAL: 'narmal',
    EDIT: 'edit'
  };
  var status = STATUS.NORMAL,
      photoStore = storeFactory.get('photo');

  $scope.data = $scope.data || {
    emptyInfo: 'Photo list is empty.',
    photoList: []
  };

  function init() {
    if (rootData && rootData.nav) {
      rootData.nav.title = 'Photo List';
      rootData.nav.isInner = false;
    }
    fixService.showMenuItem('a[href="#edit"]'); 
    updatePhotoList();
  }

  function updatePhotoList() {
    photoStore.getList(function(err, list) {
      if (err) return;
      $timeout(function() {
        $scope.data.photoList = list;     
      }, 5);
    });
  }

  function _listEmpty() {
    var photoList = $scope.data.photoList;
    return !photoList || !photoList.length;
  }

  function _clickImage() {    
    $log.log('_clickImage');
  }

  function _changeStatus(currentStatus) {
    $scope.$apply(function() {
      status = currentStatus;
    });
  }

  function _toEdit() {     
    _changeStatus(STATUS.EDIT);
  }

  function _exitEdit() {     
    _changeStatus(STATUS.NORMAL);
  }

  function _inEdit() {
    return status == STATUS.EDIT;
  }

  function _selectVisibility(index, type) {
    if (status == STATUS.NORMAL) {
      return false;
    }    
    var photo = $scope.data.photoList[+index];
    if (photo && photo._delete && type === 'on') {
      return true;
    } else if (photo && !photo._delete && type === 'off') {
      return true;
    }
    return false;
  }    

  function _toggleSelect(index) {
    var photo = $scope.data.photoList[+index];
    if (photo) {
      $timeout(function() {
        photo._delete = !photo._delete;
      }, 10);
    }
  }

  $rootScope.$on(events.updatePhoto, function(event) {
    updatePhotoList();
  });

  $scope.fn = {
    listEmpty: _listEmpty,
    clickImage: _clickImage,
    toEdit: _toEdit,
    exitEdit: _exitEdit,
    inEdit: _inEdit,
    selectVisibility: _selectVisibility,
    toggleSelect: _toggleSelect
  };

  init();

});