"use strict";

function PaddleController() {
  var self = this,
      view = new PaddleView();


  this.clearPaddle = function() {
    view.clear(this.paddle.getX()-1,
               this.paddle.getY()-1,
               this.paddle.getWidth()+2,
               this.paddle.getHeight()+2);
  };

  this.drawPaddle = function() {
    view.drawPaddle(this.paddle.getX(),
                    this.paddle.getY(),
                    this.paddle.getWidth(),
                    this.paddle.getHeight());
  };

  this.moveRight = function(step) {
    if(this.paddle.getX() + this.paddle.getWidth() + step< this.paddle.getRightBoundry()) {
      //self.clearPaddle();
      this.paddle.setX(this.paddle.getX() + step);
      //self.drawPaddle();
    } else {
      //self.clearPaddle();
      this.paddle.setX(this.paddle.getRightBoundry() - this.paddle.getWidth());
      //self.drawPaddle();
    }
  };

  this.moveLeft = function(step) {
    if(this.paddle.getX() -step > this.paddle.getLeftBoundry()) {
      //self.clearPaddle();
      this.paddle.setX(this.paddle.getX() - step);
      //self.drawPaddle();
    } else  {
      //self.clearPaddle();
      this.paddle.setX(this.paddle.getLeftBoundry());
      //self.drawPaddle();
    }

  };

  this.init = function(paddle) {
    view.init();
    this.paddle = paddle;
    self.drawPaddle();
  };

}
