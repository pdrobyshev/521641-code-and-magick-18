'use strict';

(function () {
  var coatColor;
  var eyesColor;
  var wizards = [];

  var similarWizardsBlock = document.querySelector('.setup-similar');

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

  window.dialog.onCoatChange = function (color) {
    coatColor = color;
    updateWizards();
  };

  window.dialog.onEyesChange = function (color) {
    eyesColor = color;
    updateWizards();
  };

  var successHandler = function (data) {
    wizards = data;
    updateWizards();
  };

  window.backend.load(successHandler, window.utils.errorHandler);

  similarWizardsBlock.classList.remove('hidden');
})();
