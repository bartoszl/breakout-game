"use strict";

function GameView() {
  var canvas = document.getElementById("canv"),
      context = canvas.getContext("2d"),
      nav = document.getElementById("nav"),
      closeNav = document.getElementById("close-nav"),
      self = this,
      modal = document.getElementById("myModal"),
      closeModal = document.getElementById("close-modal"),
      pauseContinue = document.getElementById("pause-continue"),
      pauseRestart = document.getElementById("pause-restart"),
      selectSingle = document.getElementById("select-single"),
      selectTwo = document.getElementById("select-two"),
      pauseMenu = document.getElementById("pause-menu"),
      overMenu = document.getElementById("over-menu"),
      gameOver = document.getElementById("game-over"),
      playAgain = document.getElementById("play-again"),
      scoreCount = document.getElementById("score-count");

  this.openNav = function() {
    nav.style.height = "100vh";
  };

  this.closeNav = function() {
    nav.style.height = "0vh";
  };

  this.setScore = function(score) {
    scoreCount.innerText = score;
  };

  this.clearCanvas = function() {
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  this.openPauseModal = function() {
    modal.style.display = "block";
  };

  this.closePauseModal = function() {
    modal.style.display = "none";
  };

  this.closeGameOverModal = function() {
    gameOver.style.display = "none";
  }

  this.init = function() {
    canvas.height = window.innerHeight * 0.9;
    canvas.width = window.innerWidth;

  };

  this.setPauseCallback = function(callback) {
    canvas.addEventListener("click", function() {
      self.openPauseModal();
      callback();
    });
  };

  this.setContinueCallback = function(callback) {
    pauseContinue.addEventListener("click", function() {
      self.closePauseModal();
      callback();
    });
  };

  this.setRestartCallback = function(callback) {
    pauseRestart.addEventListener("click", function() {
      self.closePauseModal();
      callback();
    });
  };

  this.setSelectSingleCallback = function(callback) {
    selectSingle.addEventListener("click", function() {
      self.closeNav();
      callback();
    });
  };

  this.setSelectTwoCallback = function(callback) {
    selectTwo.addEventListener("click", function() {
      self.closeNav();
      callback();
    });
  };

  this.goBackToMenu = function(callback) {
    pauseMenu.addEventListener("click", function() {
      self.closePauseModal();
      self.openNav();
      callback();
    });
  };

  this.goBackToMenuOver = function(callback) {
    overMenu.addEventListener("click", function() {
      gameOver.style.display = "none";
      self.openNav();
      callback();
    });
  };

  this.setPlayAgainCallback = function(callback) {
    playAgain.addEventListener("click", function() {
      gameOver.style.display = "none";
      callback();
    });
  };

  this.openGameOver = function() {
    gameOver.style.display = "block";
  };

  this.getCanvasHeight = function() {
    return canvas.height;
  };

  this.getCanvasWidth = function() {
    return canvas.width;
  };
}
