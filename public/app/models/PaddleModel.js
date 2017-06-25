"use strict";

function PaddleModel() {

  this.init = function(canvasHeight, leftBoundry, rightBoundry) {
    this.x = (3*(rightBoundry-leftBoundry)/8) + leftBoundry;
    //this.x = leftBoundry;
    this.y = 9*canvasHeight/10;
    this.width = 2*(rightBoundry-leftBoundry)/8;
    //this.width = rightBoundry-leftBoundry;
    this.height = canvasHeight/40;
    this.rightBoundry = rightBoundry;
    this.leftBoundry = leftBoundry;
  };

  this.getX = function() {
    return this.x;
  };

  this.getY = function() {
    return this.y;
  };

  this.getRightBoundry = function() {
    return this.rightBoundry;
  };

  this.getLeftBoundry = function() {
    return this.leftBoundry;
  };

  this.getHeight = function() {
    return this.height;
  };

  this.getWidth = function() {
    return this.width;
  };

  this.setX = function(x) {
    this.x = x;
  };

  this.setY = function(y) {
    this.y = y;
  };
}
