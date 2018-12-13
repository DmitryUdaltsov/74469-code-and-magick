'use strict';

(function () {

  // Получает случайное число в заданном диапазоне от beginNumber до endNumber
  var getRandomPeriod = function (beginNumber, endNumber) {
    return Math.round(beginNumber + Math.random() * (endNumber - beginNumber));
  };

  /**
   * Возвращает случайный элемент массива, или конкатенацию двух случайных элементов массивов через пробел
   * @param {Array} array
   * @param {Array} optionalArray
   * @return {String} random string or two randoms strings

   */
  window.getRandomElement = function (array, optionalArray) {
    var randomElement = array[getRandomPeriod(0, array.length - 1)];
    if (optionalArray) {
      randomElement += ' ' + optionalArray[getRandomPeriod(0, optionalArray.length - 1)];
    }
    return randomElement;
  };
})();
