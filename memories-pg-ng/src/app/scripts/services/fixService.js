'use strict';

angular.module('memoriesApp')
  .factory('fixService', function fixService($rootScope, $log) {

  function _fixTouchEffect(selector) {
  	var TOUCH_CLASS = "ng-click-active";
		$('body').delegate(selector, 'touchstart', function(event) {
	      $(this).addClass(TOUCH_CLASS);
	    });
    $('body').delegate(selector, 'touchend', function(event) {
      $(this).removeClass(TOUCH_CLASS);
    });
    $('body').delegate(selector, 'touchcancel', function(event) {
      $(this).removeClass(TOUCH_CLASS);
    });
  }

  var overflowList;
  jQuery(function() {
  	overflowList = jQuery('ol.action-overflow-list');
  });
	function _hideOverflowList() {
		overflowList = overflowList || jQuery('ol.action-overflow-list');
		overflowList.removeClass('active').hide();
	}

	function _fixMenuClick(selector, fn) {
		jQuery(function($) {
	    $('body').delegate(selector, 'click', function(event) {
	    	event.preventDefault();
	    	event.stopPropagation();
	      _hideOverflowList();
	      $rootScope.$apply(fn);
	    });
      _fixTouchEffect(selector);
		});
	}

	return {
		fixMenuClick: _fixMenuClick,
		fixTouchEffect: _fixTouchEffect
	};
});