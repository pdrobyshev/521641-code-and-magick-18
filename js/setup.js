'use strict';

(function () {
  var WIZARDS_AMOUNT = 4;
  var wizardParams = {
    NAMES: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
    SURNAMES: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
    COAT_COLORS: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    FIREBALL_COLORS: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'],
    EYES_COLORS: ['black', 'red', 'blue', 'yellow', 'green']
  };

  var setup = document.querySelector('.setup');
  var similarWizardsBlock = setup.querySelector('.setup-similar');
  var similarWizardsList = setup.querySelector('.setup-similar-list');
  var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var wizardCoat = setup.querySelector('.setup-wizard .wizard-coat');
  var wizardEyes = setup.querySelector('.setup-wizard .wizard-eyes');
  var wizardFireball = setup.querySelector('.setup-fireball-wrap');
  var wizardCoatHiddenInput = setup.querySelector('input[name="coat-color"]');
  var wizardEyesHiddenInput = setup.querySelector('input[name="eyes-color"]');
  var wizardFireballHiddenInput = setup.querySelector('input[name="fireball-color"]');

  var getRandomArrayElement = function (arr) {
    var randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  };

  var generateWizard = function () {
    return {
      name: getRandomArrayElement(wizardParams.NAMES) + ' ' + getRandomArrayElement(wizardParams.SURNAMES),
      coatColor: getRandomArrayElement(wizardParams.COAT_COLORS),
      eyesColors: getRandomArrayElement(wizardParams.EYES_COLORS)
    };
  };

  var generateWizardsArray = function (amount) {
    var wizardsList = [];

    for (var i = 0; i < amount; i++) {
      var wizard = generateWizard();

      wizardsList.push(wizard);
    }

    return wizardsList;
  };

  var generateWizardParams = function (wizard) {
    var wizardElement = wizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColors;

    return wizardElement;
  };

  var renderWizards = function () {
    var fragment = document.createDocumentFragment();

    wizards.forEach(function (wizard) {
      fragment.appendChild(generateWizardParams(wizard));
    });

    similarWizardsList.appendChild(fragment);
  };

  var wizards = generateWizardsArray(WIZARDS_AMOUNT);

  renderWizards();

  similarWizardsBlock.classList.remove('hidden');

  var changeWizardCoatColor = function () {
    var randomCoatColor = getRandomArrayElement(wizardParams.COAT_COLORS);
    wizardCoat.style.fill = randomCoatColor;
    wizardCoatHiddenInput.value = randomCoatColor;
  };

  var changeWizardEyesColor = function () {
    var randomEyesColor = getRandomArrayElement(wizardParams.EYES_COLORS);
    wizardEyes.style.fill = randomEyesColor;
    wizardEyesHiddenInput.value = randomEyesColor;
  };

  var changeWizardFireballColor = function () {
    var randomFireballColor = getRandomArrayElement(wizardParams.FIREBALL_COLORS);
    wizardFireball.style.backgroundColor = randomFireballColor;
    wizardFireballHiddenInput.value = randomFireballColor;
  };

  window.setup = {
    setup: setup,
    wizardCoat: wizardCoat,
    wizardEyes: wizardEyes,
    wizardFireball: wizardFireball,
    changeWizardCoatColor: changeWizardCoatColor,
    changeWizardEyesColor: changeWizardEyesColor,
    changeWizardFireballColor: changeWizardFireballColor
  };
})();
