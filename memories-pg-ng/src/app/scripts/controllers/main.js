'use strict';

angular.module('memoriesApp')
  .controller('MainCtrl', function ($scope, $rootScope, $location, $log, photoService, storeFactory) {

    var fn = {};
    var data = {
        firstTime: true,
        nav: {}
    };
    var photoStore = storeFactory.get('photo');

    function _takePhoto() {
        $log.log("_takePhoto!");
    	photoService.takePhoto(function(err, data) {
    		if (!err) {
    			$log.log("Take photo success! The data is: " + data);    		
                photoStore.add({'uri': data}, function() {
                    $rootScope.$emit('takePhotoOK');
                });
            } else {
                $log.log("Take photo error!" + data);
            }
        });
    }
    $rootScope.$on('takePhoto', function(event) {
        _takePhoto();
    });

    function _goHome() {
        $location.path('/');
    }
    
    function _goSettings() {
        $log.log("Click Settings");
    }

    function _about() {
        $log.log("Click About");
    }

    function init() {
        // fix action bar overflow list
        jQuery(function($) {
            // Settings menu
            $('body').delegate('a[href="#settings"]', 'click', function(event) {
                $scope.$apply(function() {
                    _goSettings();
                });
                $('ol.action-overflow-list').removeClass('active').hide();
                return false;
            });
            // About menu
            $('body').delegate('a[href="#about"]', 'click', function(event) {
                $scope.$apply(function() {
                    _about();
                });
                $('ol.action-overflow-list').removeClass('active').hide();
                return false;
            });
        });
    }
    init();
    
    $rootScope.fn = {
        goHome: _goHome,
        goSettings: _goSettings,
        about: _about,
        takePhoto: _takePhoto
    };
    $rootScope.data = data;    

  });