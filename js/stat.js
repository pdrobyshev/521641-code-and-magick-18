'use strict';

var cloudParams = {
  WIDTH: 420,
  HEIGHT: 270,
  X: 100,
  Y: 10
};

var barParams = {
  WIDTH: 40,
  HEIGHT: 150,
  GAP: 50
};

var colors = {
  BLACK: '#000000',
  WHITE: '#ffffff',
  SHADOW: 'rgba(0, 0, 0, 0.7)',
  MY_PLAYER: 'rgba(255, 0, 0, 1)',
  getRandomHsl: function () {
    return 'hsl(200, ' + Math.floor(Math.random() * 100) + '%,  45%)';
  }
};

var GAP = 10;
var TEXT_GAP = 30;
var OFFSET_X = barParams.WIDTH + barParams.GAP;
var MIN_OFFSET_X = cloudParams.X + barParams.WIDTH;
var FONT_PARAMS = '16px "PT Mono"';

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, cloudParams.WIDTH, cloudParams.HEIGHT);
};

var renderWinnerText = function (ctx) {
  ctx.fillStyle = colors.BLACK;
  ctx.font = FONT_PARAMS;
  /*
    Как всё же лучше побороть магические числа?
    Если бы использовал только GAP - пришлось бы умножать на 2, 3 или 5, как было до этого
    Ввёл TEXT_GAP - грубо говоря высота текста(хотя меня это уже смущает - высота текста, взятая из воздуха)
    Вводить абстрактные переменыне вроде TITLE_GAP или любой другой, с разными значениями только ради пары мест в коде - тоже не очень
  */
  ctx.fillText('Ура вы победили!', cloudParams.X + GAP * 2, cloudParams.Y + TEXT_GAP);
  ctx.fillText('Список результатов:', cloudParams.X + GAP * 2, cloudParams.Y + TEXT_GAP + GAP * 2);
};

var getMaxElement = function (arr) {
  return Math.max.apply(null, arr);
};

var renderPlayerName = function (ctx, namesArray, i) {
  ctx.fillText(namesArray[i], MIN_OFFSET_X + OFFSET_X * i, cloudParams.HEIGHT);
};

var renderPlayerTime = function (ctx, timesArray, i, maxTime) {
  ctx.fillText(Math.round(timesArray[i]), MIN_OFFSET_X + OFFSET_X * i, (-barParams.HEIGHT * timesArray[i]) / maxTime + cloudParams.X + barParams.HEIGHT - GAP);
};

var renderPlayerBar = function (ctx, timesArray, i, maxTime) {
  ctx.fillRect(MIN_OFFSET_X + OFFSET_X * i, cloudParams.X + barParams.HEIGHT, barParams.WIDTH, (-barParams.HEIGHT * timesArray[i]) / maxTime);
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, cloudParams.X + GAP, cloudParams.Y + GAP, colors.SHADOW);
  renderCloud(ctx, cloudParams.X, cloudParams.Y, colors.WHITE);

  renderWinnerText(ctx);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = colors.BLACK;
    renderPlayerName(ctx, names, i);
    renderPlayerTime(ctx, times, i, maxTime);

    ctx.fillStyle = names[i] === 'Вы' ? colors.MY_PLAYER : colors.getRandomHsl();

    renderPlayerBar(ctx, times, i, maxTime);
  }
};
