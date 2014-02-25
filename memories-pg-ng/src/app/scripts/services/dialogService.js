'use strict';

angular.module('memoriesApp')
.factory('dialogService', function dialogService($rootScope, $log) {

  var dialog;
  function _open(selector, okFn, cancelFn) {
    dialog = new fries.Dialog({
      'selector': selector,
      'callbackOk': function() {
        if (okFn) okFn.apply();
        this.hide();
      },
      'callbackCancel': function() {
        if (cancelFn) cancelFn.apply();
        this.hide();
      }
    });
    dialog.show();
  }

  return {
    open: _open
  };
});