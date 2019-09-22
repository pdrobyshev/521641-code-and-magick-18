'use strict';

var setup = document.querySelector('.setup');
var similarWizardsBlock = setup.querySelector('.setup-similar');
var similarWizardsList = setup.querySelector('.setup-similar-list');
var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var WIZARDS_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARDS_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var getRandomWizardData = function (arr) {
  var randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};

var wizards = [
  {
    name: getRandomWizardData(WIZARDS_NAMES) + ' ' + getRandomWizardData(WIZARDS_SURNAMES),
    coatColor: getRandomWizardData(COAT_COLORS),
    eyesColors: getRandomWizardData(EYES_COLORS)
  },
  {
    name: getRandomWizardData(WIZARDS_NAMES) + ' ' + getRandomWizardData(WIZARDS_SURNAMES),
    coatColor: getRandomWizardData(COAT_COLORS),
    eyesColors: getRandomWizardData(EYES_COLORS)
  },
  {
    name: getRandomWizardData(WIZARDS_NAMES) + ' ' + getRandomWizardData(WIZARDS_SURNAMES),
    coatColor: getRandomWizardData(COAT_COLORS),
    eyesColors: getRandomWizardData(EYES_COLORS)
  },
  {
    name: getRandomWizardData(WIZARDS_NAMES) + ' ' + getRandomWizardData(WIZARDS_SURNAMES),
    coatColor: getRandomWizardData(COAT_COLORS),
    eyesColors: getRandomWizardData(EYES_COLORS)
  }
];

var generateWizard = function (wizard) {
  var wizardElement = wizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColors;

  return wizardElement;
};

var renderWizards = function () {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(generateWizard(wizards[i]));
  }

  similarWizardsList.appendChild(fragment);
};

setup.classList.remove('hidden');

renderWizards();

similarWizardsBlock.classList.remove('hidden');
