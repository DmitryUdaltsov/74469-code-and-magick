'use strict';

/**
 * Отправляет форму, запускает валидацию формы
 */
(function () {
  var setupWizardFormElement = document.querySelector('.setup-wizard-form');
  // Отправка формы
  var submitHandler = function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(setupWizardFormElement),
        window.setupVisibilityControl.closePopup, window.errorMessage);
  };

  // Убираем класс .hidden
  document.querySelector('.setup-similar').classList.remove('hidden');
  // Валидируем форму
  window.validateForm();
  setupWizardFormElement.addEventListener('submit', submitHandler, false);
})();
