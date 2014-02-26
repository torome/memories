'use strict';

angular.module('memoriesApp')
.controller('ListCtrl', function ($scope, $rootScope, $log, $timeout, fixService, photoService, storeFactory) {

  var data = $rootScope.data;
  var STATUS = {
    NORMAL: 'narmal',
    EDIT: 'edit'
  };
  var status = STATUS.NORMAL,
      photoStore = storeFactory.get('photo');

  function init() {
    if (data && data.nav) {
      data.nav.title = "Photo List";
      data.nav.isInner = false;
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

  function _clickImage() {    
    $log.log("_clickImage");
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

  $rootScope.$on('takePhotoOK', function(event) {
    updatePhotoList();
  });

  $scope.data = {
    emptyInfo: "Photo list is empty."
  };

  $scope.fn = {
    listIsEmpty: _listIsEmpty,
    getThumbail: _getThumbail,
    getTime: _getTime,
    clickImage: _clickImage,
    toEdit: _toEdit,
    exitEdit: _exitEdit,
    inEdit: _inEdit,
    selectVisibility: _selectVisibility,
    toggleSelect: _toggleSelect
  };

  init();        

  jQuery(function($) {
    // $('#tiles').imagesLoaded(function() {
    //   var handler = $('#tiles li');

    //   handler.wookmark({
    //       // Prepare layout options.
    //     autoResize: true, // This will auto-update the layout when the browser window is resized.
    //     container: $('#main'), // Optional, used for some extra CSS styling
    //     offset: 3, // Optional, the distance between grid items
    //     outerOffset: 2, // Optional, the distance to the containers border
    //     itemWidth: "30%" // Optional, the width of a grid item
    //   });

    //   // Capture clicks on grid items.
    //   handler.click(function(){
    //     // Randomize the height of the clicked item.
    //     // var newHeight = $('img', this).height() + Math.round(Math.random() * 65 + 30);
    //     // $(this).css('height', newHeight+'px');

    //     // Update the layout.
    //     handler.wookmark();
    //   });
    // });
    // var myScroll = new IScroll('#photo-list');
  });

});