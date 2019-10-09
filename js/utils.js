'use strict';

(function () {
  var keyCodes = {
    ESC: 27,
    ENTER: 13
  };

  window.util = {
    ESC: keyCodes.ESC,
    ENTER: keyCodes.ENTER,
    isEscEvent: function (evt, action) {
      if (evt.keyCode === keyCodes.ESC) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === keyCodes.ENTER) {
        action();
      }
    }
  };
})();
