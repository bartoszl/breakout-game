
function GameController() {
  var game = new GameModel(),
      gameView = new GameView(),
      ballController = new BallController(),
      physics = new BasicPhysics(),
      paddleController = new PaddleController(),
      paddle2Controller = new PaddleController(),
      self = this,
      brickController = new BrickController(),
      twoPlayer = false,
      playerId = 0;

  var socket = io();

  this.repaintAll = function() {
    gameView.clearCanvas();
    paddleController.drawPaddle();
    brickController.paintBricks(game.getBricks());
    if(twoPlayer) {
      paddle2Controller.drawPaddle();
    }
    ballController.drawBall();
  };

  this.startBallMovement = function() {
    self.gameTicker = setInterval(function() {
      if(physics.detectEndGameCollision(game.getBall())) {
        clearInterval(self.gameTicker);
        gameView.openGameOver();
      }
      physics.detectBallWallCollision(game.getBall());
      physics.detectBallPaddleCollision(game.getBall(), game.getPaddle());
      physics.detectBallPaddleCollision(game.getBall(), game.getPaddle2());
      physics.detectBallBrickCollision(game.getBall(), game.getBricks(), function(brick) {
        var bricks = game.getBricks();
        var i = bricks.indexOf(brick);
        bricks.splice(i, 1);
        game.setScore(game.getScore() + 1);
        gameView.setScore(game.getScore());

      });
      ballController.moveByTimestep();
      self.repaintAll();
    }, 10);
  };

  this.pause = function() {
    clearInterval(self.gameTicker);
  };

  this.initSinglePlayerGame = function() {
    gameView.setScore(0);
    gameView.clearCanvas();
    game.initSinglePlayer(gameView.getCanvasWidth(), gameView.getCanvasHeight());
    paddleController.init(game.getPaddle());
    ballController.init(game.getBall());
    brickController.paintBricks(game.getBricks());

    window.setTimeout(self.startBallMovement, 1000);
  };

  this.initTwoPlayerGame = function() {
    gameView.setScore(0);
    gameView.clearCanvas();
    game.initTwoPlayer(gameView.getCanvasWidth(), gameView.getCanvasHeight());
    ballController.init(game.getBall());
    paddleController.init(game.getPaddle());
    paddle2Controller.init(game.getPaddle2());
    brickController.paintBricks(game.getBricks());
  };

  this.init = function() {
    gameView.init();
    physics.init(gameView.getCanvasWidth(), gameView.getCanvasHeight());
    gameView.setPauseCallback(function(){
      self.pause();
      if(twoPlayer) {
        socket.emit('stop');
      }
    });

    gameView.setContinueCallback(function() {
      if(!twoPlayer) {
        self.startBallMovement();
      } else {
        socket.emit('continue');
      }
    });

    gameView.setRestartCallback(function() {
      clearTimeout(window);
      self.pause();
      if(twoPlayer) {
        socket.emit('reset');
      } else {
        self.initSinglePlayerGame();
      }
    });
    gameView.setPlayAgainCallback(function() {
      if(twoPlayer) {
        socket.emit('reset');
      } else {
        self.initSinglePlayerGame();
      }
    });
    gameView.setSelectSingleCallback(function() {
      clearTimeout(window);
      self.pause();
      twoPlayer = false;
      self.initSinglePlayerGame();
    });
    gameView.setSelectTwoCallback(function() {
      self.pause();
      self.initTwoPlayerGame();
      twoPlayer = true;
      socket.emit('twoplayer');
    });
    gameView.goBackToMenu(function() {
      self.pause();
      if(twoPlayer) {
        socket.emit('quit');
      }
    });
    gameView.goBackToMenuOver(function() {
      if(twoPlayer) {
        socket.emit('quit');
      }
    });


    if(window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', function(event) {
        var g = event.gamma, a = event.alpha, b = event.beta;
        if( g > 10 ) {
          var val = 200;
          if(twoPlayer) {
            socket.emit('paddle', {
              direction: "right",
              value: val
            });
          } else {
            paddleController.moveRight(gameView.getCanvasWidth()/val);
          }
        }
        if( g < -10 ) {
          var val = 200;
          if(twoPlayer) {
            socket.emit('paddle', {
              direction: "left",
              value: val
            });
          } else {
            paddleController.moveLeft(gameView.getCanvasWidth()/val);
          }
        }
      });
    }

    window.addEventListener("keypress", function(e) {

      switch(e.keyCode) {
        case 97:
          socket.emit('paddle', {
            direction: "left",
            value: 50
          });
          break;
        case 100:
          socket.emit('paddle', {
            direction: "right",
            value: 50
          });
          break;
      }
    });

  };

  socket.on('continue', function() {
    gameView.closePauseModal();
  });

  socket.on('stop', function() {
    gameView.openPauseModal();
  });

  socket.on('playerid', function(data) {
    playerId = data.player_id;
  });

  socket.on('paddle', function(data) {
    if(data.direction === "left") {
      if(data.player_id === 1) {
        paddleController.moveLeft(gameView.getCanvasWidth()/data.value);
      }
      if(data.player_id === 2) {
        paddle2Controller.moveLeft(gameView.getCanvasWidth()/data.value);
      }
    } else {
      if(data.player_id === 1) {
        paddleController.moveRight(gameView.getCanvasWidth()/data.value);
      }
      if(data.player_id === 2) {
        paddle2Controller.moveRight(gameView.getCanvasWidth()/data.value);
      }
    }
  });

  socket.on('brick', function(data) {
    if(playerId === 2) {
      var bricks = game.getBricks();
      var brick = bricks[data.index];
      bricks.splice(data.index, 1);
      game.setScore(game.getScore() + 1);
      gameView.setScore(game.getScore());
    }
  });

  socket.on('moveball', function() {
    if(physics.detectEndGameCollision(game.getBall())) {
      socket.emit('gameover');
      gameView.openGameOver();
    }
    var pastVx = game.getBall().getVx();
    var pastVy = game.getBall().getVy();
    if(playerId === 1) {
      physics.detectBallWallCollision(game.getBall());
      physics.detectBallPaddleCollision(game.getBall(), game.getPaddle());
      physics.detectBallPaddleCollision(game.getBall(), game.getPaddle2());
      physics.detectBallBrickCollision(game.getBall(), game.getBricks(), function(brick) {
        var bricks = game.getBricks();
        var i = bricks.indexOf(brick);
        bricks.splice(i, 1);
        game.setScore(game.getScore() + 1);
        gameView.setScore(game.getScore());

        socket.emit("brick", {
          index: i
        });
      });
      if(pastVx / game.getBall().getVx() === -1) {
        socket.emit('xcollision');
      }
      if(pastVy / game.getBall().getVy() === -1) {
        socket.emit('ycollision');
      }

      ballController.moveByTimestep();

      socket.emit('changeballposition', {
        x: game.getBall().getX()/gameView.getCanvasWidth(),
        y: game.getBall().getY()/gameView.getCanvasHeight()
      });
      self.repaintAll();
    }

  });

  socket.on('changeballposition', function(data) {
    if(playerId === 2){
      var ball = game.getBall();
      ballController.clearBall();
      ball.setX(gameView.getCanvasWidth() * data.x);
      ball.setY(gameView.getCanvasHeight() * data.y);
      self.repaintAll();
    }
  });

  socket.on('xcollision', function() {
    if(playerId === 2) {
      game.getBall().setVx(-1 * game.getBall().getVx());
    }
  });

  socket.on('ycollision', function() {
    if(playerId === 2) {
      game.getBall().setVy(-1 * game.getBall().getVy());
    }
  });

  socket.on('reset', function() {
    if(twoPlayer) {
      self.initTwoPlayerGame();
      gameView.closePauseModal();
      gameView.closeGameOverModal();
    }
  });

}

var gameController = new GameController();
window.addEventListener("load", gameController.init);
