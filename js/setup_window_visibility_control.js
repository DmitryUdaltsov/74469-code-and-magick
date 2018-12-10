'use strict';

// Навешивает листенеры на окно настроек по клику и клавиатуре
(function () {
  var setupWindowElement = document.querySelector('.setup');
  var setupOpenElement = document.querySelector('.setup-open');
  var setupCloseElement = document.querySelector('.setup-close');
  var setupFormElementStyleTop = setupWindowElement.style.top;
  var setupFormElementStyleLeft = setupWindowElement.style.left;
  // Открытие
  // Открывает окно настроек по клику на иконку игрока
  setupOpenElement.addEventListener('click', function () {
    openPopup();
  });

  var popupEscPressHandler = function (evt) {
    if ((window.setupUserNameInputElement !== document.activeElement) && (evt.keyCode === window.KEYCODE_ESCAPE)) {
      closePopup();
    }
  };

  // Закрыть окно настроен
  var closePopup = function () {
    setupWindowElement.classList.add('hidden');
    document.removeEventListener('keydown', popupEscPressHandler);
  };

  // Открыть окно настроек
  var openPopup = function () {
    setupWindowElement.style.top = setupFormElementStyleTop;
    setupWindowElement.style.left = setupFormElementStyleLeft;
    setupWindowElement.classList.remove('hidden');
    // Закрытие
    // Всегда закрываем по Escape
    // Если поле ввода имени игрока в фокусе, то окно настройки не закрывается по клавише Escape
    document.addEventListener('keydown', popupEscPressHandler);
  };
  // Если иконка игрока в фокусе, то окно настройки открывается по клавише Enter
  setupOpenElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.KEYCODE_ENTER) {
      openPopup();
    }
  });

  // Закрывает окно настроек по клику на крестик в окне настроек
  setupCloseElement.addEventListener('click', function () {
    closePopup();
  });

  // Закрывает окно настроек по нажтию клавиши Enter если крестик в фокусе в окне настроек
  setupCloseElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.KEYCODE_ENTER) {
      closePopup();
    }
  });
})();
