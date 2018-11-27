'use strict';

var CHARACTER_COUNT = 4;

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

// Убираем класс .hidden
document.querySelector('.setup').classList.remove('hidden');
document.querySelector('.setup-similar').classList.remove('hidden');

// Начало
var characters = generateArrayOfSimilarWizards(CHARACTER_COUNT);
createBlock('.setup-similar-list', '#similar-wizard-template', characters);
// Конец
