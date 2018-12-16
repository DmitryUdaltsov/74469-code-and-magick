'use strict';

/**
 * Показывает похожих волшебников на волшебника пользователя
 */
(function () {
  var CHARACTER_COUNT = 4;
  var coatColor = document.querySelector('.wizard-coat').style.fill;
  var eyesColor = document.querySelector('.wizard-eyes').style.fill;
  var wizards = [];

  window.myWizard.onEyesChange = window.debounce(function (color) {
    eyesColor = color;
    updateWizards();
  });

  window.myWizard.onCoatChange = window.debounce(function (color) {
    coatColor = color;
    updateWizards();
  });

  // Создает разметку по шаблону с данными для одного похожего персонажа
  var createDomElement = function (templateId, wizardObject) {
    var templateWizardMarkup = document.querySelector(templateId).content;
    var charNode = templateWizardMarkup.cloneNode(true);
    charNode.querySelector('.setup-similar-label').textContent = wizardObject.name;
    charNode.querySelector('.wizard-coat').setAttribute('fill', wizardObject.colorCoat);
    charNode.querySelector('.wizard-eyes').setAttribute('fill', wizardObject.colorEyes);
    return charNode;
  };

  // Сортировка волшебников по имени, если у них будут одинаковые параметры
  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  // Сначала должны показываться волшебники, у которых совпадает цвет плаща и цвет глаз,
  // затем волшебники, у которых совпадает только цвет плаща, затем волшебники с таким же цветом глаз,
  // а после этого все остальные волшебники
  var getRank = function (wizard) {
    var rank = 0;
    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }
    return rank;
  };

  // Обновляет похожих волшебников, в соответствии с волшебником пользователя. Берутся первые 4 подходящих волщебника
  var updateWizards = function () {
    var sortedWizards = wizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    });
    createBlock(sortedWizards.slice(0, CHARACTER_COUNT));
  };

  // Создает блок разметки из персонажей по шаблону
  var createBlock = function (arrayOfWizardObjects) {
    var parentNodeClassName = '.setup-similar-list';
    var templateId = '#similar-wizard-template';
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < arrayOfWizardObjects.length; i++) {
      var parentNode = document.querySelector(parentNodeClassName);
      var charNode = createDomElement(templateId, arrayOfWizardObjects[i]);
      fragment.appendChild(charNode);
    }
    // Убираем из разметки старых похожих волшебников
    parentNode.innerHTML = '';
    parentNode.appendChild(fragment);
  };

  // Функция запускается если данные успешно загружены с сервера
  var successHandler = function (data) {
    wizards = data;
    updateWizards();
  };


  // Загружаем похожих персонажей волшебников с сервера
  // Если персонажи загрузились, то рисуем похожих волшебников на странице, иначе показываем ошибку
  window.backend.load(successHandler, window.errorMessage);

  // Конец
})();

