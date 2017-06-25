var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

var players = 0;
var player1 = false, player2 = false;
var timer;

function startBall() {
  if(player1 && player2) {
     return setInterval(function(){
      io.emit('moveball');
    }, 20);
  }
  return null;
}

io.on('connection', function(client){

  client.on('twoplayer', function(){
    if(player1 === false) {
      client.player_id = 1;
      player1 = true;
    } else if(player2 === false) {
      client.player_id = 2;
      player2 = true;
    }

    client.emit('playerid', {
      player_id: client.player_id
    });


    timer = startBall();
  });

  client.on('reset', function() {
    io.emit('reset');
    timer = startBall();
  });

  client.on('continue', function() {
    timer = startBall();
    io.emit('continue');
  });

  client.on('singleplayer', function() {
    if(client.player_id === 1) {
      player1 = false;
      clearInterval(timer);
    }

    if(client.player_id === 2) {
      player2 = false;
      clearInterval(timer);
    }
  });

  client.on('quit', function() {
    if(client.player_id === 1) {
      player1 = false;
      clearInterval(timer);
      io.emit('reset');
    }

    if(client.player_id === 2) {
      player2 = false;
      clearInterval(timer);
      io.emit('reset');
    }
  });

  client.on('disconnect', function() {
    if(client.player_id === 1) {
      player1 = false;
      clearInterval(timer);
      io.emit('reset');
    }
    if(client.player_id == 2) {
      player2 = false;
      clearInterval(timer);
      io.emit('reset');
    }


  });

  client.on('xcollision', function() {
    io.emit('xcollision');
  });

  client.on('ycollision', function() {
    io.emit('ycollision');
  });

  client.on('changeballposition', function(data){
    io.emit('changeballposition', {
      x: data.x,
      y: data.y
    });
  });

  client.on('paddle', function(data){
    console.log('paddle');
    io.emit('paddle', {
      player_id: client.player_id,
      direction: data.direction,
      value: data.value
    });
  });

  client.on('brick', function(data) {
    io.emit('brick', {
      index: data.index
    });
  });

  client.on('gameover', function() {
    clearInterval(timer);
  });

  client.on('stop', function() {
    clearInterval(timer);
    io.emit('stop');
  });

});

app.use(express.static(__dirname + '/public'));

server.listen(port, function() {
  console.log("App listening on port: " + port);
});

app.use("/", function(req, res) {
  res.send("index.html");
});
