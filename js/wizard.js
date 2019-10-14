'use strict';

(function () {
  var wizardParams = {
    NAMES: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
    SURNAMES: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
    COAT_COLORS: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    FIREBALL_COLORS: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'],
    EYES_COLORS: ['black', 'red', 'blue', 'yellow', 'green']
  };

  var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var generateWizard = function () {
    return {
      name: window.utils.getRandomArrayElement(wizardParams.NAMES) + ' ' + window.utils.getRandomArrayElement(wizardParams.SURNAMES),
      coatColor: window.utils.getRandomArrayElement(wizardParams.COAT_COLORS),
      eyesColors: window.utils.getRandomArrayElement(wizardParams.EYES_COLORS)
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

  var renderWizards = function (wizards) {
    var fragment = document.createDocumentFragment();

    wizards.forEach(function (wizard) {
      fragment.appendChild(generateWizardParams(wizard));
    });

    return fragment;
  };

  window.wizard = {
    params: wizardParams,
    generate: generateWizardsArray,
    render: renderWizards
  };
})();
