"use strict";

function BallController() {
  var view = new BallView(),
      self = this;

  this.drawBall = function() {
    view.drawBall(this.ball.getX(), this.ball.getY(), this.ball.getRadius());
  };

  this.clearBall = function() {
    view.clear(this.ball.getX(), this.ball.getY(), this.ball.getRadius());
  };

  this.moveBall = function() {
    this.ball.setX(this.ball.getX() + this.ball.getVx());
    this.ball.setY(this.ball.getY() + this.ball.getVy());
  };

  this.moveByTimestep = function() {
    //self.clearBall();
    self.moveBall(this.ball.getVx(), this.ball.getVy());
    //self.drawBall();
  };

  this.init = function(ball) {
    view.init();
    this.ball = ball;
    self.drawBall();
  };

}
