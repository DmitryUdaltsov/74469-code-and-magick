'use strict';

(function () {

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

  /**
   * Создает массив из обектов похожих персонажей
   *
   * @param {Number} numberOfSimilarWizards
   * @return {Array}
   */
  window.generateArrayOfSimilarWizards = function (numberOfSimilarWizards) {
    var similarWizards = [];
    for (var i = 0; i < numberOfSimilarWizards; i++) {
      similarWizards.push(
          { // Объект похожего волшебника
            name: window.getRandomElement(names, surnames),
            coatColor: window.getRandomElement(window.coatColors),
            eyesColor: window.getRandomElement(window.eyesColors)
          }
      );
    }
    return similarWizards;
  };
})();
