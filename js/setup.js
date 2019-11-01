'use strict';

(function () {
  var coatColor;
  var eyesColor;
  var wizards = [];
  var wizardParams = {
    COAT_COLORS: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    FIREBALL_COLORS: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'],
    EYES_COLORS: ['black', 'red', 'blue', 'yellow', 'green']
  };

  var similarWizardsBlock = document.querySelector('.setup-similar');
  var wizardCoat = document.querySelector('.setup-wizard .wizard-coat');
  var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
  var wizardFireball = document.querySelector('.setup-fireball-wrap');
  var wizardCoatHiddenInput = document.querySelector('input[name="coat-color"]');
  var wizardEyesHiddenInput = document.querySelector('input[name="eyes-color"]');
  var wizardFireballHiddenInput = document.querySelector('input[name="fireball-color"]');

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  };

  var updateWizards = function () {
    window.wizard.render(wizards.slice().sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = wizards.indexOf(left) - wizards.indexOf(right);
      }
      return rankDiff;
    }));
  };

  var coatChangeHandler = window.debounce(function (color) {
    coatColor = color;
    updateWizards();
  });

  var eyesChangeHandler = window.debounce(function (color) {
    eyesColor = color;
    updateWizards();
  });

  var successHandler = function (data) {
    wizards = data;
    updateWizards();
  };

  var coatColorClickHandler = function () {
    var randomCoatColor = window.utils.getRandomArrayElement(wizardParams.COAT_COLORS);
    wizardCoat.style.fill = randomCoatColor;
    wizardCoatHiddenInput.value = randomCoatColor;
    coatChangeHandler(randomCoatColor);
  };

  var eyesColorClickHandler = function () {
    var randomEyesColor = window.utils.getRandomArrayElement(wizardParams.EYES_COLORS);
    wizardEyes.style.fill = randomEyesColor;
    wizardEyesHiddenInput.value = randomEyesColor;
    eyesChangeHandler(randomEyesColor);
  };

  var fireballColorClickHandler = function () {
    var randomFireballColor = window.utils.getRandomArrayElement(wizardParams.FIREBALL_COLORS);
    wizardFireball.style.backgroundColor = randomFireballColor;
    wizardFireballHiddenInput.value = randomFireballColor;
  };

  var addWizardListeners = function () {
    wizardCoat.addEventListener('click', coatColorClickHandler);
    wizardEyes.addEventListener('click', eyesColorClickHandler);
    wizardFireball.addEventListener('click', fireballColorClickHandler);
  };

  var removeWizardListeners = function () {
    wizardCoat.removeEventListener('click', coatColorClickHandler);
    wizardEyes.removeEventListener('click', eyesColorClickHandler);
    wizardFireball.removeEventListener('click', fireballColorClickHandler);
  };

  window.backend.load(successHandler, window.utils.errorHandler);

  similarWizardsBlock.classList.remove('hidden');

  window.setup = {
    addWizardListeners: addWizardListeners,
    removeWizardListeners: removeWizardListeners
  };
})();
