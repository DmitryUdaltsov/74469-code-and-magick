'use strict';

(function () {
  var DATAURL = 'https://js.dump.academy/code-and-magick/data';
  var POSTURL = 'https://js.dump.academy/code-and-magick';

  /**
 * onLoad — функция обратного вызова, которая срабатывает при успешном выполнении запроса.
 * При вызове функции onLoad в её единственный параметр передается набор полученных данных;
 * onError — функция обратного вызова, которая срабатывает при неуспешном выполнении запроса.
 * При вызове функции onError в её единственный параметр передается сообщение об ошибке;
 * @param {function} onLoad
 * @param {function} onError
 */
  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad('.setup-similar-list', '#similar-wizard-template', window.chooseRandomFour(xhr.response));
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = 10000; // 10s
    xhr.open('GET', DATAURL);
    xhr.send();
  };

  /**
  * data — объект FormData, который содержит данные формы, которые будут отправлены на сервер
  * onLoad — функция обратного вызова, которая срабатывает при успешном выполнении запроса
  * onError — функция обратного вызова, которая срабатывает при неуспешном выполнении запроса.
  * При вызове функции onError в её единственный параметр передается сообщение об ошибке
  * или объект с описанием ошибки полученный с сервера
  * @param {Object} data
  * @param {function} onLoad
  * @param {function} onError
  */
  var save = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad();
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = 10000; // 10s
    xhr.open('POST', POSTURL);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
