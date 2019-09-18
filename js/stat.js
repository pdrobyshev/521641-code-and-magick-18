'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;
var BAR_GAP = 50;
var OFFSET_X = BAR_WIDTH + BAR_GAP;
var MIN_OFFSET_X = CLOUD_X + BAR_WIDTH;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderText = function (ctx) {
  ctx.fillStyle = '#000000';
  ctx.font = '16px "PT Mono"';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP * 2, CLOUD_Y + GAP * 3);
  ctx.fillText('Список результатов:', CLOUD_X + GAP * 2, CLOUD_Y + GAP * 5);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');

  renderText(ctx);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = '#000';
    ctx.fillText(names[i], MIN_OFFSET_X + OFFSET_X * i, CLOUD_HEIGHT);
    ctx.fillText(Math.round(times[i]), MIN_OFFSET_X + OFFSET_X * i, (-BAR_HEIGHT * times[i]) / maxTime + CLOUD_X + BAR_HEIGHT - GAP);

    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'hsl(200, ' + Math.floor(Math.random() * 101) + '%,  45%)';
    }

    ctx.fillRect(MIN_OFFSET_X + OFFSET_X * i, CLOUD_X + BAR_HEIGHT, BAR_WIDTH, (-BAR_HEIGHT * times[i]) / maxTime);
  }
};
