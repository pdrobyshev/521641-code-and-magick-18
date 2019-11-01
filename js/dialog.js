'use strict';

(function () {
  var setupInitialCoords = {
    x: '50%',
    y: '80px'
  };

  var setupOpen = document.querySelector('.setup-open');
  var setup = document.querySelector('.setup');
  var form = setup.querySelector('.setup-wizard-form');
  var setupClose = setup.querySelector('.setup-close');
  var setupUserName = setup.querySelector('.setup-user-name');
  var dialogHandler = setup.querySelector('.upload');

  var setInitialSetupPosition = function () {
    setup.style.left = setupInitialCoords.x;
    setup.style.top = setupInitialCoords.y;
  };

  var escPressPopupHandler = function (evt) {
    if (document.activeElement !== setupUserName) {
      window.utils.isEscEvent(evt, closePopupHandler);
    }
  };

  var openPopupHandler = function () {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', escPressPopupHandler);
    window.setup.addWizardListeners();
  };

  var closePopupHandler = function () {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', escPressPopupHandler);
    window.setup.removeWizardListeners();
    setInitialSetupPosition();
  };

  var saveFormData = function (evt) {
    window.backend.save(new FormData(form), function () {
      setup.classList.add('hidden');
    });
    evt.preventDefault();
  };

  setupOpen.addEventListener('click', openPopupHandler);

  setupOpen.addEventListener('keydown', function (evt) {
    window.utils.isEnterEvent(evt, openPopupHandler);
  });

  setupClose.addEventListener('click', closePopupHandler);

  setupClose.addEventListener('keydown', function (evt) {
    window.utils.isEscEvent(evt, closePopupHandler);
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

  setup.addEventListener('submit', saveFormData, window.utils.errorHandler);
})();
