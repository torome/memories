'use strict';

// fix old android's bind
if (!Function.prototype.bind) {
  Function.prototype.bind = function (oThis) {
    if (typeof this !== "function") {
      // closest thing possible to the ECMAScript 5 internal IsCallable function
      throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
    }

    var aArgs = Array.prototype.slice.call(arguments, 1), 
        fToBind = this, 
        fNOP = function () {},
        fBound = function () {
          return fToBind.apply(this instanceof fNOP && oThis? this : oThis,
                               aArgs.concat(Array.prototype.slice.call(arguments)));
        };

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();

    return fBound;
  };
}

// Wait for device API libraries to load
document.addEventListener("deviceready", onDeviceReady, false);

// device APIs are available
function onDeviceReady() {
  setTimeout(function() {
    navigator.splashscreen && navigator.splashscreen.hide();
  }, 2000);

  angular.bootstrap(document, ['memoriesApp']);
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