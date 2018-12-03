'use strict';

var CHARACTER_COUNT = 4;
var KEYCODE_ESCAPE = 27;
var KEYCODE_ENTER = 13;

var names = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var surnames = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

var coatColors = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var eyesColors = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

var fireballColors = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];

var setupOpenElement = document.querySelector('.setup-open');
var setupUserNameInputElement = document.querySelector('.setup-user-name');
var setupCloseElement = document.querySelector('.setup-close');
var setupWindowElement = document.querySelector('.setup');
var setupWizardCoatInputElement = document.querySelector('.setup-wizard-appearance input[name="coat-color"]');
var setupWizardEyesInputElement = document.querySelector('.setup-wizard-appearance input[name="eyes-color"]');
var setupCoatElement = document.querySelector('.setup-wizard .wizard-coat');
var setupEyesElement = document.querySelector('.setup-wizard .wizard-eyes');
var setupFireballElement = document.querySelector('.setup-fireball-wrap');

// Получает случайное число в заданном диапазоне от beginNumber до endNumber
var getRandomPeriod = function (beginNumber, endNumber) {
  return Math.round(beginNumber + Math.random() * (endNumber - beginNumber));
};

// Получает случайный элемент массива, или конкатенацию двух случайных элементов массивов
var getRandomElement = function (array, optionalArray) {
  var randomElement = array[getRandomPeriod(0, array.length - 1)];
  if (optionalArray) {
    randomElement += ' ' + optionalArray[getRandomPeriod(0, optionalArray.length - 1)];
  }
  return randomElement;
};

// Создает массив из похожих персонажей
var generateArrayOfSimilarWizards = function (numberOfSimilarWizards) {
  var similarWizards = [];
  for (var i = 0; i < numberOfSimilarWizards; i++) {
    similarWizards.push(
        { // Объект похожего волшебника
          name: getRandomElement(names, surnames),
          coatColor: getRandomElement(coatColors),
          eyesColor: getRandomElement(eyesColors)
        }
    );
  }
  return similarWizards;
};

// Создает разметку по шаблону с данными для одного похожего персонажа
var createDomElement = function (templateId, wizardObject) {
  var templateWizardMarkup = document.querySelector(templateId).content;
  var charNode = templateWizardMarkup.cloneNode(true);
  charNode.querySelector('.setup-similar-label').textContent = wizardObject.name;
  charNode.querySelector('.wizard-coat').setAttribute('fill', wizardObject.coatColor);
  charNode.querySelector('.wizard-eyes').setAttribute('fill', wizardObject.eyesColor);
  return charNode;
};

// Создает блок разметки из персонажей
var createBlock = function (parentNodeClassName, templateId, arrayOfWizardObjects) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arrayOfWizardObjects.length; i++) {
    var parentNode = document.querySelector(parentNodeClassName);
    var charNode = createDomElement(templateId, arrayOfWizardObjects[i]);
    fragment.appendChild(charNode);
  }
  parentNode.appendChild(fragment);
};

// Закрыть окно настроек
var closePopup = function () {
  setupWindowElement.classList.add('hidden');
};

// Открыть окно настроек
var openPopup = function () {
  setupWindowElement.classList.remove('hidden');
};

// Навешивает листенеры на окно настроек по клику и клавиатуре
var addListeners = function () {
  // Открытие
  // Открывает окно настроек по клику на иконку игрока
  setupOpenElement.addEventListener('click', function () {
    openPopup();
  });

  // Если иконка игрока в фокусе, то окно настройки открывается по клавише Enter
  setupOpenElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === KEYCODE_ENTER) {
      openPopup();
    }
  });

  // Закрытие
  // Всегда закрываем по Escape
  // Если поле ввода имени игрока в фокусе, то окно настройки не закрывается по клавише Escape
  document.addEventListener('keydown', function (evt) {
    if ((setupUserNameInputElement !== document.activeElement) && (evt.keyCode === KEYCODE_ESCAPE)) {
      closePopup();
    }
  });

  // Закрывает окно настроек по клику на крестик в окне настроек
  setupCloseElement.addEventListener('click', function () {
    closePopup();
  });

  // Закрывает окно настроек по нажтию клавиши Enter если крестик в фокусе в окне настроек
  setupCloseElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === KEYCODE_ENTER) {
      closePopup();
    }
  });

  // Меняет по клику мыши цвет плаща, глаз и фаербола волшебника пользователя
  // Плащ
  setupCoatElement.addEventListener('click', function () {
    var newColor = getRandomElement(coatColors);
    setupCoatElement.style.fill = newColor;
    setupWizardCoatInputElement.setAttribute('value', newColor);
  });
  // Глаза
  setupEyesElement.addEventListener('click', function () {
    var newColor = getRandomElement(eyesColors);
    setupEyesElement.setAttribute('fill', newColor);
    setupWizardEyesInputElement.setAttribute('value', newColor);
  });
  // Фаербол
  setupFireballElement.addEventListener('click', function () {
    var newColor = getRandomElement(fireballColors);
    setupFireballElement.style.background = newColor;
    setupFireballElement.querySelector('input').setAttribute('value', newColor);
  });
};

// Кастомный текст сообщения об ошибке для отработки события invalid в поле ввода имени персонажа
var validateForm = function () {

  setupUserNameInputElement.addEventListener('invalid', function () {
    if (setupUserNameInputElement.validity.tooShort) {
      setupUserNameInputElement.setCustomValidity('Имя должно состоять минимум из двух символов');
    } else if (setupUserNameInputElement.validity.tooLong) {
      setupUserNameInputElement.setCustomValidity('Имя должно состоять максимум из 25 символов');
    } else if (setupUserNameInputElement.validity.valueMissing) {
      setupUserNameInputElement.setCustomValidity('Обязательное поле');
    } else {
      setupUserNameInputElement.setCustomValidity('');
    }
  });

  // Убираем сообщение об ошибке, если поле ввода длиннее 2 символов
  setupUserNameInputElement.addEventListener('input', function (evt) {
    if (evt.target.value.length < 2) {
      setupUserNameInputElement.setCustomValidity('Имя должно состоять минимум из двух символов');
    } else {
      setupUserNameInputElement.setCustomValidity('');
    }
  });
};

// Убираем класс .hidden
document.querySelector('.setup-similar').classList.remove('hidden');

// Начало
addListeners();
validateForm();
var characters = generateArrayOfSimilarWizards(CHARACTER_COUNT);
createBlock('.setup-similar-list', '#similar-wizard-template', characters);
// Конец
