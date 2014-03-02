'use strict';

angular.module('memoriesApp')
.controller('SettingsCtrl', function ($scope, $rootScope, $location, dialogService, fixService, global) {
  
  var rootData = $rootScope.rootData;
  var paths = global.paths;
  var settingStore = storeFactory.get('settings', true);

  function init() {
    if (rootData && rootData.nav) {
      rootData.nav.title = 'Settings';
      rootData.nav.isInner = true;
    }
    fixService.hideMenuItem('a[href="#edit"]');
  }

  function _saveSettings() {
    var settings = rootData.settings;
    settingStore.updateItem(settings, function(err) {
      dialogService.openToast('Settings saved!', 2000);
    });
  }

  $scope.fn = {
    saveSettings: _saveSettings
  };

  init();

});