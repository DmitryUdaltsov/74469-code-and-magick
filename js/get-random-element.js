'use strict';

(function () {
  /**
   * Выбирает случайное число из диапазона
   * @param {Number} beginNumber - Начало диапазона
   * @param {Number} endNumber - Конец диапазона
   * @return {Number} - случайное число
   */
  var getRandomPeriod = function (beginNumber, endNumber) {
    return Math.round(beginNumber + Math.random() * (endNumber - beginNumber));
  };

  /**
   * Возвращает случайный элемент массива
   * @param {Array} array
   * @return {String} random string
   */
  window.getRandomElement = function (array) {
    return array[getRandomPeriod(0, array.length - 1)];
  };
})();
