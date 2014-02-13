(function() {
  // Wait for device API libraries to load
  document.addEventListener("deviceready", onDeviceReady, false);

  // device APIs are available
  function onDeviceReady() {
    setTimeout(function() {
      navigator.splashscreen.hide();
    }, 2000);

    angular.bootstrap(document, ['memoriesApp']);
  }

  // try to fix android's 'miss a drag' bug 
  document.addEventListener("touchstart", function(e){ onStart(e); }, false );
  function onStart( touchEvent ) {
    if (device.platform == 'Android') {
      touchEvent.preventDefault();
    }
  }

  // process back button
  document.addEventListener("backbutton", onBackKey, false);
  function onBackKey(e) {
    var r = window.confirm("确定要退出程序?");
    if (r) {
        e.preventDefault();
        navigator.app.exitApp();
    }
  }

})();