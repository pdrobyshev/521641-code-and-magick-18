'use strict';

var setup = document.querySelector('.setup');
var similarWizardsBlock = setup.querySelector('.setup-similar');
var similarWizardsList = setup.querySelector('.setup-similar-list');
var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var WIZARDS_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARDS_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARDS_AMOUNT = 4;

var getRandomArrayElement = function (arr) {
  var randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};

var generateWizard = function () {
  return {
    name: getRandomArrayElement(WIZARDS_NAMES) + ' ' + getRandomArrayElement(WIZARDS_SURNAMES),
    coatColor: getRandomArrayElement(COAT_COLORS),
    eyesColors: getRandomArrayElement(EYES_COLORS)
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

setup.classList.remove('hidden');

var wizards = generateWizardsArray(WIZARDS_AMOUNT);
renderWizards();

similarWizardsBlock.classList.remove('hidden');
