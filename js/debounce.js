'use strict';

/**
 * Устранение дребезга
 */
(function () {
  var DEBOUNCE_INTERVAL = 500; // ms

  window.debounce = function (callBack) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        callBack.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };
})();
