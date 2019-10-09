'use strict';

(function () {
  var setupOpen = document.querySelector('.setup-open');
  var setup = window.setup.setup;
  var setupClose = setup.querySelector('.setup-close');
  var setupUserName = setup.querySelector('.setup-user-name');
  var dialogHandler = setup.querySelector('.upload');
  var setupInitialCoords = {
    x: '50%',
    y: '80px'
  };

  var setInitialSetupPosition = function () {
    setup.style.left = setupInitialCoords.x;
    setup.style.top = setupInitialCoords.y;
  };

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.util.ESC && document.activeElement !== setupUserName) {
      closePopup();
    }
  };

  var openPopup = function () {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
    window.setup.wizardCoat.addEventListener('click', window.setup.changeWizardCoatColor);
    window.setup.wizardEyes.addEventListener('click', window.setup.changeWizardEyesColor);
    window.setup.wizardFireball.addEventListener('click', window.setup.changeWizardFireballColor);
  };

  var closePopup = function () {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    window.setup.wizardCoat.removeEventListener('click', window.setup.changeWizardCoatColor);
    window.setup.wizardEyes.removeEventListener('click', window.setup.changeWizardEyesColor);
    window.setup.wizardFireball.removeEventListener('click', window.setup.changeWizardFireballColor);
    setInitialSetupPosition();
  };

  setupOpen.addEventListener('click', openPopup);

  setupOpen.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openPopup);
  });

  setupClose.addEventListener('click', closePopup);

  setupClose.addEventListener('keydown', function (evt) {
    window.util.isEscEvent(evt, closePopup);
  });

  dialogHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setup.style.top = (setup.offsetTop - shift.y) + 'px';
      setup.style.left = (setup.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (ev) {
          ev.preventDefault();
          dialogHandler.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandler.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
