'use strict';

var WIZARDS_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARDS_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARDS_AMOUNT = 4;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var setup = document.querySelector('.setup');
var similarWizardsBlock = setup.querySelector('.setup-similar');
var similarWizardsList = setup.querySelector('.setup-similar-list');
var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var setupUserName = setup.querySelector('.setup-user-name');
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

var wizards = generateWizardsArray(WIZARDS_AMOUNT);
renderWizards();

similarWizardsBlock.classList.remove('hidden');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && document.activeElement !== setupUserName) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
  wizardCoat.addEventListener('click', changeWizardCoatColor);
  wizardEyes.addEventListener('click', changeWizardEyesColor);
  wizardFireball.addEventListener('click', changeWizardFireballColor);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
  wizardCoat.removeEventListener('click', changeWizardCoatColor);
  wizardEyes.addEventListener('click', changeWizardEyesColor);
  wizardFireball.addEventListener('click', changeWizardFireballColor);
};

var changeWizardCoatColor = function () {
  var randomCoatColor = getRandomArrayElement(COAT_COLORS);
  wizardCoat.style.fill = randomCoatColor;
  wizardCoatHiddenInput.value = randomCoatColor;
};

var changeWizardEyesColor = function () {
  var randomEyesColor = getRandomArrayElement(EYES_COLORS);
  wizardEyes.style.fill = randomEyesColor;
  wizardEyesHiddenInput.value = randomEyesColor;
};

var changeWizardFireballColor = function () {
  var randomFireballColor = getRandomArrayElement(FIREBALL_COLORS);
  wizardFireball.style.backgroundColor = randomFireballColor;
  wizardFireballHiddenInput.value = randomFireballColor;
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});
