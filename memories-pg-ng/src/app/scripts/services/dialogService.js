'use strict';

angular.module('memoriesApp')
.factory('dialogService', function dialogService($rootScope, $log) {

  var dialog, toast;

  // open modal dialog
  function _openDialog(selector, okFn, cancelFn) {
    dialog = new fries.Dialog({
      selector: selector,
      callbackOk: function() {
        if (okFn) okFn.apply();
        this.hide();
      },
      callbackCancel: function() {
        if (cancelFn) cancelFn.apply();
        this.hide();
      }
    });
    dialog.show();
  }

  // open exit toast
  function _openExitToast(dura) {
    toast = new fries.Toast({
      content: 'Press the back key again to exit',
      duration: dura || 2500
    });
  }

  return {
    openDialog: _openDialog,
    openExitToast: _openExitToast
  };

});