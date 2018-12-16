'use strict';

/**
 * Меняет по клику мыши цвет плаща, глаз и фаербола волшебника пользователя
 */
(function () {

  var fireballColors = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ];

  var coatColors = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ];

  var eyesColors = [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ];

  var setupUserCoatElement = document.querySelector('.setup-wizard .wizard-coat');
  var setupUserEyesElement = document.querySelector('.setup-wizard .wizard-eyes');
  var setupUserFireballElement = document.querySelector('.setup-fireball-wrap');
  var setupWizardCoatInputElement = document.querySelector('.setup-wizard-appearance input[name="coat-color"]');
  var setupWizardEyesInputElement = document.querySelector('.setup-wizard-appearance input[name="eyes-color"]');
  window.myWizard = {};

  // Плащ
  setupUserCoatElement.addEventListener('click', function () {
    var newColor = window.getRandomElement(coatColors).toString();
    setupUserCoatElement.style.fill = newColor;
    setupWizardCoatInputElement.setAttribute('value', newColor);
    window.myWizard.setCoatColor(newColor);
  });

  // Глаза
  setupUserEyesElement.addEventListener('click', function () {
    var newColor = window.getRandomElement(eyesColors).toString();
    setupUserEyesElement.setAttribute('fill', newColor);
    setupWizardEyesInputElement.setAttribute('value', newColor);
    window.myWizard.setEyesColor(newColor);
  });

  // Фаербол
  setupUserFireballElement.addEventListener('click', function () {
    var newColor = window.getRandomElement(fireballColors).toString();
    setupUserFireballElement.style.background = newColor;
    setupUserFireballElement.querySelector('input').setAttribute('value', newColor);
  });
})();
