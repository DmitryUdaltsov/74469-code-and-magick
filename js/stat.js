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
    maxHeight: 140,
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
      return cloudStyle.startY + (cloudStyle.height - this.maxHeight - 50); // 50 - это отступ снизу от облака
    }
  };

  // Объект игрока
  var Player = function (name, time) {
    this.name = name;
    this.time = Math.round(time);
    this.histColumnHeight = 0;
    // Вычисляет начальную точку Y колонки гистограммы в пикселях
    this.getColumnY = function () {
      return histStyle.getGistStartY() + (histStyle.maxHeight - this.histColumnHeight);
    };
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

  // Заполняет объекты игроков
  var createPlayers = function (timesArray, namesArray) {
    var maxTime = 0;
    var playersArray = [];
    if (timesArray.length !== namesArray.length) {
      console.log('Размеры массивов (времени прохождения и массив имён) не совпадают!');
    } else {
      // Находит максимальное время прохождения игры
      for (var i = 0; i < timesArray.length; i++) {
        if (timesArray[i] > maxTime) {
          maxTime = timesArray[i];
        }
      }
      for (i = 0; i < timesArray.length; i++) {
        var nextPlayer = new Player(namesArray[i], timesArray[i]);
        // Вычисляем высоту колонки гистограммы
        nextPlayer.histColumnHeight = Math.round(timesArray[i] / maxTime * histStyle.maxHeight);
        playersArray.push(nextPlayer);
      }
    }
    return playersArray;
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
  var currentY = 0;
  var nameY = histStyle.getGistStartY()
      + histStyle.maxHeight
      + 20; // отступ снизу до имени игрока
  var playersArray = createPlayers(times, names);
  for (var i = 0; i < times.length; i++) {
    if (names[i] === 'Вы') {
      ctx.fillStyle = histStyle.myColor;
    } else {
      ctx.fillStyle = histStyle.otherColor();
    }
    currentY = playersArray[i].getColumnY();
    // Рисуем колонку гистограммы для игрока
    ctx.fillRect(currentX, currentY, histStyle.columnWidth, playersArray[i].histColumnHeight);
    // Рисуем время прохождения игры
    drawCloudText(playersArray[i].time, currentX, currentY - 10); // отступ сверху до результата
    // Рисуем имя игрока
    drawCloudText(playersArray[i].name, currentX, nameY);
    currentX += histStyle.columnWidth + histStyle.columnGap;
  }
};
