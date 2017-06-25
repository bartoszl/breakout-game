"use strict";

function BrickModel() {

  this.init = function(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  };

  this.getX = function() {
    return this.x;
  };

  this.getY = function() {
    return this.y;
  };

  this.getWidth = function() {
    return this.width;
  };

  this.getHeight = function() {
    return this.height;
  };
}
