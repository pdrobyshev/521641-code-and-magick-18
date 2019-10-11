'use strict';

(function () {
  var setupInitialCoords = {
    x: '50%',
    y: '80px'
  };
  var setupOpen = document.querySelector('.setup-open');
  var setup = window.setup.setup;
  var setupClose = setup.querySelector('.setup-close');
  var setupUserName = setup.querySelector('.setup-user-name');
  var dialogHandler = setup.querySelector('.upload');
  var wizardCoat = setup.querySelector('.setup-wizard .wizard-coat');
  var wizardEyes = setup.querySelector('.setup-wizard .wizard-eyes');
  var wizardFireball = setup.querySelector('.setup-fireball-wrap');
  var wizardCoatHiddenInput = setup.querySelector('input[name="coat-color"]');
  var wizardEyesHiddenInput = setup.querySelector('input[name="eyes-color"]');
  var wizardFireballHiddenInput = setup.querySelector('input[name="fireball-color"]');

  var setInitialSetupPosition = function () {
    setup.style.left = setupInitialCoords.x;
    setup.style.top = setupInitialCoords.y;
  };

  var escPressPopupHandler = function (evt) {
    if (document.activeElement !== setupUserName) {
      window.util.isEscEvent(evt, closePopupHandler);
    }
  };

  var openPopupHandler = function () {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', escPressPopupHandler);
    wizardCoat.addEventListener('click', coatColorClickHandler);
    wizardEyes.addEventListener('click', eyesColorClickHandler);
    wizardFireball.addEventListener('click', fireballColorClickHandler);
  };

  var closePopupHandler = function () {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', escPressPopupHandler);
    wizardCoat.removeEventListener('click', coatColorClickHandler);
    wizardEyes.removeEventListener('click', eyesColorClickHandler);
    wizardFireball.removeEventListener('click', fireballColorClickHandler);
    setInitialSetupPosition();
  };

  var coatColorClickHandler = function () {
    var randomCoatColor = window.util.getRandomArrayElement(window.setup.wizardParams.COAT_COLORS);
    wizardCoat.style.fill = randomCoatColor;
    wizardCoatHiddenInput.value = randomCoatColor;
  };

  var eyesColorClickHandler = function () {
    var randomEyesColor = window.util.getRandomArrayElement(window.setup.wizardParams.EYES_COLORS);
    wizardEyes.style.fill = randomEyesColor;
    wizardEyesHiddenInput.value = randomEyesColor;
  };

  var fireballColorClickHandler = function () {
    var randomFireballColor = window.util.getRandomArrayElement(window.setup.wizardParams.FIREBALL_COLORS);
    wizardFireball.style.backgroundColor = randomFireballColor;
    wizardFireballHiddenInput.value = randomFireballColor;
  };

  setupOpen.addEventListener('click', openPopupHandler);

  setupOpen.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openPopupHandler);
  });

  setupClose.addEventListener('click', closePopupHandler);

  setupClose.addEventListener('keydown', function (evt) {
    window.util.isEscEvent(evt, closePopupHandler);
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
