'use strict';

angular.module('memoriesApp')
.factory('fixService', function fixService($rootScope, $log, global) {

  var flags = global.flags;

  function _fixTouchEffect(selector) {
    var TOUCH_CLASS = "ng-click-active";
    $(document).on('touchstart', selector, function(event) {
      $(this).addClass(TOUCH_CLASS);
    });
    $(document).on('touchend', selector, function(event) {
      $(this).removeClass(TOUCH_CLASS);
    });
    $(document).on('touchcancel',selector, function(event) {
      $(this).removeClass(TOUCH_CLASS);
    });
  }

  function _hideOverflowList(fn) {
    jQuery('ol.action-overflow-list').removeClass('active').hide(fn);
  }

  function _fixMenuClick(selector, fn) {
    function _clickFn(ev) {
      ev.preventDefault();
      ev.stopPropagation();
      jQuery(document).off('click', selector);
      $rootScope.$apply(fn);
      _hideOverflowList(function() {
        jQuery(document).on('click', selector, _clickFn);
      });
    }

    jQuery(function() {
      $(document).on('click', selector, function(event) {
        _clickFn(event);
        flags.clickMenu = true;
        $timeout(function() {
          flags.clickMenu = false;
        }, 500);
      });
      _fixTouchEffect(selector);
    });
  }

  function _hideMenuItem(selector) {
    jQuery(selector).parent('li').hide();
  }

  function _showMenuItem(selector) {
    jQuery(selector).parent('li').show();
  }

  return {
    fixMenuClick: _fixMenuClick,
    fixTouchEffect: _fixTouchEffect,
    hideMenuItem: _hideMenuItem,
    showMenuItem: _showMenuItem
  };
  
});