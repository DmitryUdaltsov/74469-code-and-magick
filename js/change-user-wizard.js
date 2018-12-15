'use strict';

var fireballColors = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];

/**
 * Меняет по клику мыши цвет плаща, глаз и фаербола волшебника пользователя
 */
(function () {
  var setupUserCoatElement = document.querySelector('.setup-wizard .wizard-coat');
  var setupUserEyesElement = document.querySelector('.setup-wizard .wizard-eyes');
  var setupUserFireballElement = document.querySelector('.setup-fireball-wrap');

  var setupWizardCoatInputElement = document.querySelector('.setup-wizard-appearance input[name="coat-color"]');
  var setupWizardEyesInputElement = document.querySelector('.setup-wizard-appearance input[name="eyes-color"]');

  // Плащ
  setupUserCoatElement.addEventListener('click', function () {
    var newColor = window.getRandomElement(window.coatColors).toString();
    setupUserCoatElement.style.fill = newColor;
    setupWizardCoatInputElement.setAttribute('value', newColor);
  });

  // Глаза
  setupUserEyesElement.addEventListener('click', function () {
    var newColor = window.getRandomElement(window.eyesColors).toString();
    setupUserEyesElement.setAttribute('fill', newColor);
    setupWizardEyesInputElement.setAttribute('value', newColor);
  });

  // Фаербол
  setupUserFireballElement.addEventListener('click', function () {
    var newColor = window.getRandomElement(fireballColors).toString();
    setupUserFireballElement.style.background = newColor;
    setupUserFireballElement.querySelector('input').setAttribute('value', newColor);
  });
})();
