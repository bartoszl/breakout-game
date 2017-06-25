"use strict";

function BallView() {
  var canvas = document.getElementById("canv");
  var context = canvas.getContext("2d");

  this.drawBall = function(x, y, r) {
    context.beginPath();
    context.arc(x,y,r,0,360);
    context.fillStyle = "red";
    context.fill();
    context.stroke();
  };

  this.clear = function(x, y, r) {
    context.clearRect(x-r-1, y-r-1, 2*r+2, 2*r+2);
  };

  this.init = function() {

  };
}
