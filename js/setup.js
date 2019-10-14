'use strict';

(function () {
  var WIZARDS_AMOUNT = 4;

  var similarWizardsBlock = document.querySelector('.setup-similar');
  var similarWizardsList = document.querySelector('.setup-similar-list');

  var wizards = window.wizard.generate(WIZARDS_AMOUNT);
  similarWizardsList.appendChild(window.wizard.render(wizards));

  similarWizardsBlock.classList.remove('hidden');
})();
