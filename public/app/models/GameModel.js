"use strict";

function GameModel() {
  var ball = new BallModel(),
      paddle = new PaddleModel(),
      paddle2 = new PaddleModel(),
      bricks = [],
      self = this;

  this.initBricks = function(rows, columns, width, height) {
    for(var i=0;i<rows;i++){
      for(var j=0;j<columns;j++) {
        var brick = new BrickModel();
        brick.init(j * width/columns ,
                    height/8+ i*height/32 ,
                      width/columns -1,
                        height/32 -1 );
        bricks.push(brick);
      }
    }
  };

  this.initSinglePlayer = function(width, height) {
    ball.init(width, height);
    paddle.init(height, 0, width);
    bricks = [];
    self.initBricks(4, 12, width, height);
    this.score = 0;
  };

  this.initTwoPlayer = function(width, height) {
    ball.init(width, height);
    paddle.init(height, 0, width/2);
    paddle2.init(height, width/2, width);
    bricks = [];
    self.initBricks(6, 12, width, height);
    this.score = 0;
  };

  this.getScore = function() {
    return this.score;
  };

  this.setScore = function(score) {
    this.score = score;
  };

  this.getBall = function() {
    return ball;
  };

  this.getPaddle = function() {
    return paddle;
  };

  this.getPaddle2 = function() {
    return paddle2;
  };

  this.setPaddle = function(newPaddle) {
    paddle = newPaddle;
  }

  this.getBricks = function() {
    return bricks;
  };
}
