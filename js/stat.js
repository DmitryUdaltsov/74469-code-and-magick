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
    var messageLines = message.toString().split('\n');
    var numberOfLines = messageLines.length;
    var lineHeight = textStyle.size;
    for (var i = 0; i < numberOfLines; i++) {
      ctx.fillText(messageLines[i], startX, startY, 420);
      startY += lineHeight;
    }
  };

  // Заполняет объекты игроков
  var createPlayers = function (playersTimes, playersNames) {
    var maxTime = 0;
    var players = [];

    // Находит максимальное время прохождения игры
    for (var i = 0; i < playersTimes.length; i++) {
      if (playersTimes[i] > maxTime) {
        maxTime = playersTimes[i];
      }
    }
    for (i = 0; i < playersTimes.length; i++) {
      var nextPlayer = new Player(playersNames[i], playersTimes[i]);
      // Вычисляем высоту колонки гистограммы
      nextPlayer.histColumnHeight = Math.round(playersTimes[i] / maxTime * histStyle.maxHeight);
      players.push(nextPlayer);
    }
    return players;
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
  var players = createPlayers(times, names);
  for (var i = 0; i < times.length; i++) {
    if (names[i] === 'Вы') {
      ctx.fillStyle = histStyle.myColor;
    } else {
      ctx.fillStyle = histStyle.otherColor();
    }
    currentY = players[i].getColumnY();
    // Рисуем колонку гистограммы для игрока
    ctx.fillRect(currentX, currentY, histStyle.columnWidth, players[i].histColumnHeight);
    // Рисуем время прохождения игры
    drawCloudText(players[i].time, currentX, currentY - 10); // отступ сверху до результата
    // Рисуем имя игрока
    drawCloudText(players[i].name, currentX, nameY);
    currentX += histStyle.columnWidth + histStyle.columnGap;
  }
};
