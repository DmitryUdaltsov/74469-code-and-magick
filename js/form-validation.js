'use strict';

/**
 * Кастомный текст сообщения об ошибке для отработки события invalid в поле ввода имени персонажа
 */
(function () {
  window.setupUserNameInputElement = document.querySelector('.setup-user-name');
  window.validateForm = function () {

    window.setupUserNameInputElement.addEventListener('invalid', function () {
      if (window.setupUserNameInputElement.validity.tooShort) {
        window.setupUserNameInputElement.setCustomValidity('Имя должно состоять минимум из двух символов');
      } else if (window.setupUserNameInputElement.validity.tooLong) {
        window.setupUserNameInputElement.setCustomValidity('Имя должно состоять максимум из 25 символов');
      } else if (window.setupUserNameInputElement.validity.valueMissing) {
        window.setupUserNameInputElement.setCustomValidity('Обязательное поле');
      } else {
        window.setupUserNameInputElement.setCustomValidity('');
      }
    });

    // Убираем сообщение об ошибке, если поле ввода длиннее 2 символов
    window.setupUserNameInputElement.addEventListener('input', function (evt) {
      if (evt.target.value.length < 2) {
        window.setupUserNameInputElement.setCustomValidity('Имя должно состоять минимум из двух символов');
      } else {
        window.setupUserNameInputElement.setCustomValidity('');
      }
    });
  };
})();
