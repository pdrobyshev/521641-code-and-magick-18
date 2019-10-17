'use strict';

(function () {
  var similarWizardsBlock = document.querySelector('.setup-similar');
  var similarWizardsList = document.querySelector('.setup-similar-list');

  var successHandler = function (data) {
    similarWizardsList.appendChild(window.wizard.render(data));
  };

  window.backend.load(successHandler, window.utils.errorHandler);

  similarWizardsBlock.classList.remove('hidden');
})();
