'use strict';

(function () {

  var setupWindowElement = document.querySelector('.setup');
  var userpicElement = setupWindowElement.querySelector('.upload');

  userpicElement.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: moveEvt.clientX - startCoords.x,
        y: moveEvt.clientY - startCoords.y
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setupWindowElement.style.top = (setupWindowElement.offsetTop + shift.y) + 'px';
      setupWindowElement.style.left = (setupWindowElement.offsetLeft + shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (drgEvt) {
          drgEvt.preventDefault();
          userpicElement.removeEventListener('click', onClickPreventDefault);
        };
        userpicElement.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
