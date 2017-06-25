"use strict";

function BrickView() {
  var canvas = document.getElementById("canv");
  var context = canvas.getContext("2d");

  this.drawBrick = function(x, y, width, height, color) {
    context.beginPath();
    context.rect(x, y, width, height);
    context.fillStyle = color;
    context.fill();
    context.lineWidth = 1;
    context.lineStyle = "black";
    context.stroke();
  };

  this.clearBrick = function(x, y, width, height) {
    context.clearRect(x, y, width, height);
  };

}
