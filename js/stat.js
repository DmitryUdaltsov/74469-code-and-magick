'use strict';

window.renderStatistics = function (ctx, names, times) {
  // Настройки облака
  var cloudStyle = {
    width: 420,
    height: 270,
    startX: 100,
    startY: 10,
    shadowOffset: 10
  };

  // Настройки текста
  var textStyle = {
    size: 16,
    font: this.size + 'px PT Mono',
    color: 'black'
  };

  // Настройки победного сообщения
  var victoryMessage = {
    text: 'Ура вы победили!\nСписок результатов:',
    startX: 120,
    startY: 40
  };

  // Настройки для гистограммы
  var histStyle = {
    maxHeight: 110,
    columnWidth: 40,
    columnGap: 50,
    myColor: 'rgba(255, 0, 0, 1)',
    otherColor: function () {
      var histColumnSaturation = Math.round(Math.random() * 100);
      return 'hsl(240,' + histColumnSaturation + '%, 50%)';
    },
    getGistStartX: function () {
      return cloudStyle.startX + (cloudStyle.width - (this.columnWidth * times.length + this.columnGap * (times.length - 1))) / 2;
    },
    getGistStartY: function () {
      return cloudStyle.startY + (cloudStyle.height - this.maxHeight - 50); // 50 - это отступ снизу
    }
  };

  // Рисует квадрат заданного цвета по координатам.
  var drawCloud = function (startX, startY, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(startX, startY, width, height);
  };

  // Рисует текст с переносами строк
  var drawCloudText = function (message, startX, startY) {
    ctx.fillStyle = textStyle.color;
    ctx.font = textStyle.font;
    var linesArray = message.toString().split('\n');
    var numberOfLines = linesArray.length;
    var lineHeight = textStyle.size;
    for (var i = 0; i < numberOfLines; i++) {
      ctx.fillText(linesArray[i], startX, startY, 420);
      startY += lineHeight;
    }
  };

  // Получает максимальное время игры
  var getMaxTime = function (timesArray) {
    var max = 0;
    for (var i = 0; i < timesArray.length; i++) {
      if (timesArray[i] > max) {
        max = timesArray[i];
      }
    }
    return max;
  };

  // Вычисляет высоту колонки гистограммы
  var getColumnHeight = function (time) {
    var max = getMaxTime(times);
    return time / max * histStyle.maxHeight;
  };

  // Вычисляет начальную точку Y колонки гистограммы в пикселях
  var getColumnY = function (time) {
    return histStyle.getGistStartY() + (histStyle.maxHeight - getColumnHeight(time));
  };

  // Рисуем тень
  drawCloud(
      cloudStyle.startX + cloudStyle.shadowOffset,
      cloudStyle.startY + cloudStyle.shadowOffset,
      cloudStyle.width,
      cloudStyle.height,
      'rgba(0, 0, 0, 0.7)');

  // Рисуем облако
  drawCloud(
      cloudStyle.startX,
      cloudStyle.startY,
      cloudStyle.width,
      cloudStyle.height,
      'white');

  // Рисуем победный текст
  drawCloudText(victoryMessage.text, victoryMessage.startX, victoryMessage.startY);

  // Рисуем колонки c именами и временем
  var currentX = histStyle.getGistStartX();
  for (var i = 0; i < times.length; i++) {
    if (names[i] === 'Вы') {
      ctx.fillStyle = histStyle.myColor;
    } else {
      ctx.fillStyle = histStyle.otherColor();
    }
    ctx.fillRect(currentX, getColumnY(times[i]), histStyle.columnWidth, getColumnHeight(times[i]));
    // Рисуем время прохождения игры
    drawCloudText(Math.round(times[i]), currentX, getColumnY(times[i]) - 10); // отступ сверху до результата
    // Рисуем имена игроков
    drawCloudText(names[i], currentX, histStyle.getGistStartY() + histStyle.maxHeight + 20); // отступ снизу до имени игрока
    currentX += histStyle.columnWidth + histStyle.columnGap;
  }
};
