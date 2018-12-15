'use strict';

(function () {
  var CHARACTER_COUNT = 4;
  var setupWizardFormElement = document.querySelector('.setup-wizard-form');
  window.KEYCODE_ESCAPE = 27;
  window.KEYCODE_ENTER = 13;

  window.coatColors = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ];

  window.eyesColors = [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ];

  window.setupUserNameInputElement = document.querySelector('.setup-user-name');

  // Создает разметку по шаблону с данными для одного похожего персонажа
  var createDomElement = function (templateId, wizardObject) {
    var templateWizardMarkup = document.querySelector(templateId).content;
    var charNode = templateWizardMarkup.cloneNode(true);
    charNode.querySelector('.setup-similar-label').textContent = wizardObject.name;
    charNode.querySelector('.wizard-coat').setAttribute('fill', wizardObject.colorCoat);
    charNode.querySelector('.wizard-eyes').setAttribute('fill', wizardObject.colorEyes);
    return charNode;
  };

  // Выбор из массива похожих волшебников четырех случайных волшебников.
  window.chooseRandomFour = function (wizards) {
    var choosenWizards = [];
    while (choosenWizards.length < CHARACTER_COUNT) {
      var nextWizard = window.getRandomElement(wizards);
      if (choosenWizards.indexOf(nextWizard) < 0) {
        choosenWizards.push(nextWizard);
      }
    }
    return choosenWizards;
  };

  // Создает блок разметки из персонажей по шаблону
  var createBlock = function (arrayOfWizardObjects) {
    var parentNodeClassName = '.setup-similar-list';
    var templateId = '#similar-wizard-template';
    arrayOfWizardObjects = window.chooseRandomFour(arrayOfWizardObjects);
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < arrayOfWizardObjects.length; i++) {
      var parentNode = document.querySelector(parentNodeClassName);
      var charNode = createDomElement(templateId, arrayOfWizardObjects[i]);
      fragment.appendChild(charNode);
    }
    parentNode.appendChild(fragment);
  };

  // Плашка сверху сайта об ошибке загрузки похожих волшебников
  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  // Отправка формы
  var submitHandler = function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(setupWizardFormElement),
        window.setupVisibilityControl.closePopup, errorHandler);
  };

  // Начало

  // Убираем класс .hidden
  document.querySelector('.setup-similar').classList.remove('hidden');
  // Валидируем форму
  window.validateForm();
  // Загружаем похожих персонажей волшебников с сервера
  // Если персонажи загрузились, то рисуем похожих волшебников на странице, иначе показываем ошибку
  window.backend.load(createBlock, errorHandler);
  setupWizardFormElement.addEventListener('submit', submitHandler, false);
  // Конец
})();

