"use strict";

function BasicPhysics() {
  var self = this;

  this.init = function(width, height){
    this.width = width;
    this.height = height;
  };

  this.detectBallWallCollisionX = function(ball) {
    if( ball.getX() - ball.getRadius() <= 0  ||
          ball.getX() + ball.getRadius() >= this.width ) {
      return true;
    }
    return false;
  };

  this.detectBallWallCollisionY = function(ball) {
    if( ball.getY() - ball.getRadius() <= 0 ) {
      return true;
    }
    return false;
  };

  this.detectEndGameCollision = function(ball) {
    if( ball.getY() + ball.getRadius() >= this.height ) {
      return true;
    }
    return false;
  };

  this.detectBallWallCollision = function(ball) {
    if(self.detectBallWallCollisionY(ball)) {
      ball.setVy(-1 * ball.getVy());
    }

    if(self.detectBallWallCollisionX(ball)) {
      ball.setVx(-1 * ball.getVx());
    }
  };

  this.detectBallPaddleCollisionX = function(ball, paddle) {
    if(ball.getY() + ball.getRadius() >= paddle.getY()) {
      if(ball.getX() + ball.getRadius() >= paddle.getX()) {
        return true;
      }
      if(ball.getX() - ball.getRadius() <= paddle.getX() + paddle.getWidth()) {
        return true;
      }
    }

    return false;
  };

  this.detectBallPaddleCollisionY = function(ball, paddle) {

    if(ball.getY() + ball.getRadius() >= paddle.getY() &&
        ball.getY() < paddle.getY() &&
          ball.getX() + ball.getRadius() >= paddle.getX() &&
            ball.getX() - ball.getRadius() <= paddle.getX() + paddle.getWidth()) {
      return true;
    }
    return false;
  };

  this.detectBallPaddleCollision = function(ball, paddle) {
    // if( self.detectBallPaddleCollisionX(ball, paddle) ) {
    //   ball.setVx(-1 * ball.getVx());
    // }
    if( self.detectBallPaddleCollisionY(ball, paddle) ) {
      ball.setVy(-1 * ball.getVy());
    }
  };

  this.detectBallBrickCollision = function(ball, bricks, callback) {
    bricks.map(function(brick) {
      // bottom wall

      if(ball.getY() - ball.getRadius() <= brick.getY() + brick.getHeight() &&
          ball.getY() > brick.getY() + brick.getHeight()) {
        if(ball.getX() - ball.getRadius() <= brick.getX() + brick.getWidth() &&
            ball.getX() + ball.getRadius() >= brick.getX()) {
          ball.setVy(-1 * ball.getVy());
          return callback(brick);
        }
      }


      //top wall

      if(ball.getY() + ball.getRadius() >= brick.getY() &&
          ball.getY() < brick.getY()) {
        if(ball.getX() + ball.getRadius() >= brick.getX() &&
            ball.getX() - ball.getRadius() <= brick.getX() + brick.getWidth()) {
              ball.setVy(-1* ball.getVy());
              return callback(brick);
            }
      }

      //right wall
      if(ball.getX() - ball.getRadius() <= brick.getX() + brick.getWidth() &&
          ball.getX() > brick.getX() + brick.getWidth()) {
        if(ball.getY() + ball.getRadius() >= brick.getY() &&
            ball.getY() - ball.getRadius() <= brick.getY() + brick.getHeight()) {
          ball.setVx(-1 * ball.getVx());
          return callback(brick);
        }
      }

      //left wall
      if(ball.getX() + ball.getRadius() >= brick.getX() &&
          ball.getX() < brick.getX()) {
        if(ball.getY() + ball.getRadius() >= brick.getY() &&
            ball.getY() - ball.getRadius() <= brick.getY() + brick.getHeight()) {
          ball.setVx(-1 * ball.getVx());
          return callback(brick);
        }
      }


    });
  };

}
