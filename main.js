var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");



var SCREEN_WIDTH = canvas.width;
var SCREEN_HEIGHT = canvas.height;
 
var ASTROID_SPEED = 2;//0.8;
var PLAYER_SPEED = 1;
var PLAYER_TURN_SPEED = 0.04
var BULLET_SPEED = 10.5;
var STATE_SPLASH = 0;
var STATE_GAME = 1;
var STATE_GAMEOVER = 2;
var splashTimer = 3;
var gameState = STATE_SPLASH;
var gameover = 0


var KEY_SPACE = 32;
var KEY_LEFT =37;
var KEY_UP = 38;
var KEY_RIGHT = 39;
var KEY_DOWN = 40;
var shootTimer = 0;
var startFrameMillis = Date.now();
var endFrameMillis = Date.now();
var spawnTimer = 0;
var speed = 0;

var player = new Player();
var keyboard = new Keyboard();

window.addEventListener('keydown', function(evt) { onKeyDown(evt); }, false);
window.addEventListener('keyup', function(evt) { onKeyUp(evt); }, false);
 
 
 function getDeltaTime()
{
    endFrameMillis = startFrameMillis;
    startFrameMillis = Date.now();
    var deltaTime = (startFrameMillis - endFrameMillis) * 0.001;
    if (deltaTime > 1)
    {
        deltaTime = 1;
    }
    return deltaTime;
}  




function rand(floor, ceil)
{
    return Math.floor( (Math.random()* (ceil-floor)) +floor );
}

function onKeyDown(event)
{
      if(event.keyCode == KEY_UP)
      {
           //player.directionY = 10;
      }
 
      if(event.keyCode == KEY_DOWN)
      {
           //player.directionY = -1.5;
      }      
      if(event.keyCode == KEY_LEFT)
      {
            //player.angularDirection = -2;
      }
      if(event.keyCode == KEY_RIGHT)
      {
            //player.angularDirection = 2;
      }
      if(event.keyCode == KEY_SPACE && shootTimer <=0)
      {
          
      }
      if(event.keyCode == KEY_R)
      {
          var gameover = false
          console.log(cheek)
      }
      
}
function onKeyUp(event)
{
      if(event.keyCode == KEY_UP)
      {
           //player.directionY = 0;
      }
 
      if(event.keyCode == KEY_DOWN)
      {
           //player.directionY = 0;
      }      
      if(event.keyCode == KEY_LEFT)
      {
            //player.angularDirection = 0;
      }
      if(event.keyCode == KEY_RIGHT)
      {
            //player.angularDirection = 0;
      }/*
      if(event.keyCode == KEY_SPACE)
      {
           // playerShoot();
      }*/
}

function run() {
    context.fillStyle = "#1dad78";
    context.fillRect(0, 0, canvas.width, canvas.height);

    var deltaTime = getDeltaTime();

    var s = Math.sin(player.rotation);
    var c = Math.cos(player.rotation);

    var XDir = (player.directionX * c) - (player.directionY * s);
    var YDir = (player.directionX * s) + (player.directionY * c);
    var XVel = XDir * PLAYER_SPEED;
    var YVel = YDir * PLAYER_SPEED;
    
    player.draw();
    player.update(deltaTime);

    player.x += XVel;
    player.y += YVel;

    player.rotation += player.angularDirection * PLAYER_TURN_SPEED;

    context.save();
    context.translate(player.x, player.y);
    context.rotate(player.rotation);
    context.drawImage(
        player.image, -player.width / 2, -player.height / 2);
    context.restore();

}

(function () {
    var onEachFrame;
    if (window.requestAnimationFrame) {
        onEachFrame = function (cb) {
            var _cb = function () { cb(); window.requestAnimationFrame(_cb); }
            _cb();
        };
    } else if (window.mozrequestAnimationFrame) {
        onEachFrame = function (cb) {
            var _cb = function () {
                cb();
                window.mozRequestAnimationFrame(_cb);
            }
            _cb();
        };
    } else {
        onEachFrame = function (cb) {
            setInterval(cb, 1000 / 60);
        }
    }

    window.onEachFrame = onEachFrame;
})();

window.onEachFrame(run);