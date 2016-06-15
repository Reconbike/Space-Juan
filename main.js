var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");



var SCREEN_WIDTH = canvas.width;
var SCREEN_HEIGHT = canvas.height;
 
var ASTROID_SPEED = 1;//0.8;
var PLAYER_SPEED = 1;
var PLAYER_TURN_SPEED = 0.04
var BULLET_SPEED = 10.5;
var STATE_SPLASH = 0;
var STATE_GAME = 1;
var STATE_GAMEOVER = 2;
var splashTimer = 3;
var gameState = STATE_SPLASH;
var shootTimer = 0;
var startFrameMillis = Date.now();
var endFrameMillis = Date.now();
var spawnTimer = 0;
var speed = 0;


var asteroids = [];
var player = new Player();
var keyboard = new Keyboard();


function rand(floor, ceil)
{
    return Math.floor( (Math.random()* (ceil-floor)) +floor );
}
 
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

function spawnAsteroid()
{
    var type = rand(0, 3);
    
    var asteroid = {};
    
    asteroid.image = document.createElement("img");
    asteroid.image.src = "asteroid.png";
    asteroid.width = 100;
    asteroid.height = 100;
    
    var x = SCREEN_WIDTH/2;
    var y = SCREEN_HEIGHT/2;
    
    
    var dirX = rand(-10,10);
    var dirY = rand(-10,10);
    
    var magnitude = (dirX * dirX) + (dirY * dirY);
    if(magnitude != 0)
    {
        var oneOverMag = 1 / Math.sqrt(magnitude);
        dirX *= oneOverMag;
        dirY *= oneOverMag;
    }
    
    var movX = dirX * SCREEN_WIDTH;
    var movY = dirY * SCREEN_HEIGHT;
    
    asteroid.x = x + movX;
    asteroid.y = y + movY;
    
    asteroid.velocityX = -dirX * ASTROID_SPEED;
    asteroid.velocityY = -dirY * ASTROID_SPEED;
    
    asteroids.push(asteroid);
}

function runSplash(deltaTime)
    {
        splashTimer -= deltaTime;
        if(splashTimer <= 0)
        {
            gameState = STATE_GAME;
            return;
        }
        context.fillStyle = "#000";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "#ffffff";
        context.font="24px Arial";
        context.fillText("Space-Juan", 450, 350);
        context.fillText("By Jaymie Gobbett and Brendon Bano", 450, 400);
}

function runGame(deltaTime)
{
    var s = Math.sin(player.rotation);
    var c = Math.cos(player.rotation);

    var XDir = (player.directionX * c) - (player.directionY * s);
    var YDir = (player.directionX * s) + (player.directionY * c);
    var XVel = XDir * PLAYER_SPEED;
    var YVel = YDir * PLAYER_SPEED;

    //player.draw();
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

    for(var i=0; i<asteroids.length; i++)
    {
        asteroids[i].x = asteroids[i].x + asteroids[i].velocityX;
        asteroids[i].y = asteroids[i].y + asteroids[i].velocityY;
    }
     
    for(var i=0; i<asteroids.length; i++)
    {
        context.drawImage(asteroids[i].image, asteroids[i].x, asteroids[i].y);
    }

    spawnTimer -= deltaTime;
    if(spawnTimer <= 0)
    {
        spawnTimer = 1;
        spawnAsteroid();
    }
}

function runGameOver(deltaTime) //here is where once switched the game over screen is shown, 
    {
        context.fillStyle = "#000";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "#ffffff";
        context.font="24px Arial";
        context.fillText("YOU HAVE DIED!!!", 450, 450);
}

function run() {
    context.fillStyle = "#1dad78";
    context.fillRect(0, 0, canvas.width, canvas.height);

    var deltaTime = getDeltaTime();

        switch(gameState)
        {
            case STATE_SPLASH:
            runSplash(deltaTime);
            break;
            case STATE_GAME:
            runGame(deltaTime);
            break;
            case STATE_GAMEOVER:
            runGameOver(deltaTime);
            break;
        }
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