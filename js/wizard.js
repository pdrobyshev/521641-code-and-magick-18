'use strict';

(function () {
  var WIZARDS_AMOUNT = 4;
  var fragment = document.createDocumentFragment();

  var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var similarWizardsList = document.querySelector('.setup-similar-list');

  var generateWizardParams = function (wizard) {
    var wizardElement = wizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  var renderWizards = function (wizards) {
    similarWizardsList.innerHTML = '';

    for (var i = 0; i < WIZARDS_AMOUNT; i++) {
      fragment.appendChild(generateWizardParams(wizards[i]));
    }

    similarWizardsList.appendChild(fragment);
  };

  window.wizard = {
    render: renderWizards
  };
})();
