"use strict";

function BrickController() {
  var view = new BrickView();

  this.eraseBrick = function(brick) {
    view.clearBrick(brick.getX()-1, brick.getY()-1, brick.getWidth()+2, brick.getHeight()+2);
  };

  this.paintBricks = function(bricks) {
    bricks.map(function(brick) {
      view.drawBrick(brick.getX(), brick.getY(), brick.getWidth(), brick.getHeight(), "green");
    });
  };
}
