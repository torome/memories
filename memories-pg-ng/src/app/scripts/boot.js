(function() {
  // Wait for device API libraries to load
  document.addEventListener("deviceready", onDeviceReady, false);

  // device APIs are available
  function onDeviceReady() {
    setTimeout(function() {
      navigator.splashscreen.hide();
    }, 2000);
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
    var r = window.confirm("ȷ��Ҫ�˳�����?");
    if (r) {
        e.preventDefault();
        navigator.app.exitApp();
    }
  }

})();