'use strict';

(function () {
  var WIZARDS_AMOUNT = 4;

  var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var generateWizardParams = function (wizard) {
    var wizardElement = wizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  var renderWizards = function (wizards) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < WIZARDS_AMOUNT; i++) {
      var wizard = window.utils.getRandomArrayElement(wizards);
      fragment.appendChild(generateWizardParams(wizard));
    }

    return fragment;
  };

  window.wizard = {
    render: renderWizards
  };
})();
