'use strict';

(function () {
  /**
   * Выбирает случайное число из диапазона
   * @param {number} beginNumber - Начало диапазона
   * @param {number} endNumber - Конец диапазона
   * @return {number} - случайное число
   */
  var getRandomPeriod = function (beginNumber, endNumber) {
    return Math.round(beginNumber + Math.random() * (endNumber - beginNumber));
  };

  /**
   * Возвращает случайный элемент массива
   * @param {Array} array
   * @return {string} random string
   */
  window.getRandomElement = function (array) {
    return array[getRandomPeriod(0, array.length - 1)];
  };
})();
