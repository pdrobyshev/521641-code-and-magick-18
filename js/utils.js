'use strict';

(function () {
  var keyCodes = {
    ESC: 27,
    ENTER: 13
  };

  window.utils = {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === keyCodes.ESC) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === keyCodes.ENTER) {
        action();
      }
    },
    getRandomArrayElement: function (arr) {
      var randomIndex = Math.floor(Math.random() * arr.length);
      return arr[randomIndex];
    },
    errorHandler: function (message) {
      var errorBlock = document.createElement('div');
      errorBlock.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
      errorBlock.style.position = 'absolute';
      errorBlock.style.left = 0;
      errorBlock.style.right = 0;
      errorBlock.style.fontSize = '30px';
      errorBlock.textContent = message;

      document.body.insertAdjacentElement('afterbegin', errorBlock);
    }
  };
})();
