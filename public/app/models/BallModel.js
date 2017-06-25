"use strict";

function BallModel() {

  this.init = function(canvasWidth, canvasHeight) {
    this.x = canvasWidth/2;
    this.y = canvasHeight/2;
    this.r = canvasHeight/80;
    this.vx = canvasWidth/300;
    this.vy = canvasHeight/400;
  };

  this.getX = function() {
    return this.x;
  };

  this.getY = function() {
    return this.y;
  };

  this.getRadius = function() {
    return this.r;
  };

  this.getVx = function() {
    return this.vx;
  };

  this.getVy = function() {
    return this.vy;
  };

  this.getX = function() {
    return this.x;
  };

  this.setX = function(x) {
    this.x = x;
  };

  this.setY = function(y) {
    this.y = y;
  };

  this.setRadius = function(r) {
    this.r = r;
  };

  this.setVx = function(vx) {
    this.vx = vx;
  };

  this.setVy = function(vy) {
    this.vy = vy;
  };
}
