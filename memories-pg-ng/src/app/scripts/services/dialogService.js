'use strict';

angular.module('memoriesApp')
.factory('dialogService', function dialogService($rootScope, $log) {

  var dialog, toast;

  // open modal dialog
  function _openDialog(id, okFn, cancelFn) {
    if (!id) return;
    dialog = new fries.Dialog({
      selector: '#'+id,
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

  // open toast
  function _openToast(text, dura) {
    toast = new fries.Toast({
      content: text || 'Press the back key again to exit',
      duration: dura || 2500
    });
  }

  return {
    openDialog: _openDialog,
    openToast: _openToast
  };

});