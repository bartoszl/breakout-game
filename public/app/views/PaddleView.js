"use strict";

function PaddleView() {
  var canvas = document.getElementById("canv");
  var context = canvas.getContext("2d");

  this.drawPaddle = function(x, y, width, height) {
    context.beginPath();
    context.rect(x, y, width, height);
    context.fillStyle = "blue";
    context.fill();
    context.lineWidth = 1;
    context.lineStyle = "black";
    context.stroke();
  };

  this.clear = function(x, y, width, height) {
    context.clearRect(x, y, width, height);
  };

  this.init = function() {

  };

  this.getCanvasWidth = function() {
    return canvas.width;
  };

}
