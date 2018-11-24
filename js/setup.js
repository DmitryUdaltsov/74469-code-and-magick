'use strict';

var CHARACTER_COUNT = 4;

var namesArray = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var surnamesArray = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

var coatColor = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var eyesColor = [
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

// Объект Похожего персонажа
var Similar = function () {
  this.name = getRandomElement(namesArray, surnamesArray);
  this.coatColor = getRandomElement(coatColor);
  this.eyesColor = getRandomElement(eyesColor);
};

// Создает массив из похожих персонажей
var generateArrayOfSimilars = function (similarsNumber) {
  var similarsList = [];
  for (var i = 0; i < similarsNumber; i++) {
    similarsList.push(new Similar());
  }
  return similarsList;
};

// Создает разметку по шаблону с данными для одного похожего персонажа
var createDomElement = function (template, objectData) {
  var fragment = document.querySelector(template).content.querySelector('div');
  var nextChar = fragment.cloneNode(true);
  nextChar.querySelector('.setup-similar-label').textContent = objectData.name;
  nextChar.querySelector('.wizard-coat').setAttribute('fill', objectData.coatColor);
  nextChar.querySelector('.wizard-eyes').setAttribute('fill', objectData.eyesColor);
  return nextChar;
};

// Создает блок разметки из персонажей
var createBlock = function (parentNode, template, arrayData) {
  for (var i = 0; i < arrayData.length; i++) {
    var charList = document.querySelector(parentNode);
    var charMarkup = createDomElement(template, arrayData[i]);
    charList.appendChild(charMarkup);
  }
};

// Убираем класс .hidden
document.querySelector('.setup').classList.remove('hidden');
document.querySelector('.setup-similar').classList.remove('hidden');

// Начало
var charactersArray = generateArrayOfSimilars(CHARACTER_COUNT);
createBlock('.setup-similar-list', '#similar-wizard-template', charactersArray);
// Конец
