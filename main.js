var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");



var SCREEN_WIDTH = canvas.width;
var SCREEN_HEIGHT = canvas.height;
 
var ASTROID_SPEED = 1;//0.8;
var ALIEN_SPEED = 4
var PLAYER_SPEED = 2;
var PLAYER_TURN_SPEED = 0.07
var BULLET_SPEED = 10.5;
var LAZER_SPEED = 2.5;
var STATE_SPLASH = 0;
var STATE_GAME = 1;
var STATE_GAMEOVER = 2;
var splashTimer = 3;
var gameState = STATE_SPLASH;
var shootTimer = 0;
var startFrameMillis = Date.now();
var endFrameMillis = Date.now();
var spawnTimer = 0;
var spawn2Timer= 0;
var speed = 0;
var Score = 0;

var asteroids = [];
var aliens = [];
var bullets = [];
var lazers = [];
var player = new Player();
var keyboard = new Keyboard();

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


function PrimaryFire()
{
    var bullet = {
        image: document.createElement("img"),
        x: player.x,
        y: player.y,
        width: 5,
        height: 5,
        velocityX: 0,
        velocityY: 0
    };
    bullet.image.src = "bullet.png";
 
    var velX = 0;
    var velY = -1;
    var s = Math.sin(player.rotation);
    var c = Math.cos(player.rotation);
    var xVel = (velX * c) - (velY * s);
    var yVel = (velX * s) + (velY * c);
 
    bullet.velocityX = xVel * BULLET_SPEED;
    bullet.velocityY = yVel * BULLET_SPEED;
 
    bullets.push(bullet);
}

function SecondaryFire()
{
    var lazer = {
        image: document.createElement("img"),
        x: player.x,
        y: player.y,
        width: 30,
        height: 30,
        velocityX: 0,
        velocityY: 0
    };
    lazer.image.src = "lazer.png";
 
    var velX = 0;
    var velY = -1;
    var s = Math.sin(player.rotation);
    var c = Math.cos(player.rotation);
    var xVel = (velX * c) - (velY * s);
    var yVel = (velX * s) + (velY * c);
 
    lazer.velocityX = xVel * LAZER_SPEED;
    lazer.velocityY = yVel * LAZER_SPEED;
 
    lazers.push(lazer);
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

function spawnAlien()
{
    var type = rand(0, 3);
    
    var alien = {};
    
    alien.image = document.createElement("img");
    alien.image.src = "Enemy.png";
    alien.width = 62;
    alien.height = 59;
    
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
    
    alien.x = x + movX;
    alien.y = y + movY;
    
    alien.velocityX = -dirX * ALIEN_SPEED;
    alien.velocityY = -dirY * ALIEN_SPEED;
    
    aliens.push(alien);
}


 function intersects(x1, y1, w1, h1, x2, y2, w2, h2)
    {
        if(y2 + h2 < y1 ||
            x2 + w2 < x1 ||
            x2> x1 + w1 ||
            y2 > y1 + h1)
        {
            return false;
        }
        return true;
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
    context.fillStyle = "#000";
    context.fillRect(0, 0, canvas.width, canvas.height);
    
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

    for(var i=0; i<aliens.length; i++)
    {
        aliens[i].x = aliens[i].x + aliens[i].velocityX;
        aliens[i].y = aliens[i].y + aliens[i].velocityY;
    }
     
    for(var i=0; i<aliens.length; i++)
    {
        context.drawImage(aliens[i].image, aliens[i].x, aliens[i].y);
    }

    spawn2Timer -= deltaTime;
    if(spawn2Timer <= 0)
    {
        spawn2Timer = 10;
        spawnAlien();
    }

    for(var i=0; i<asteroids.length; i++)
    {
        if(intersects(
            asteroids[i].x, asteroids[i].y,
            asteroids[i].width, asteroids[i].height,
            player.x - player.width/2, player.y - player.height/2,
            player.width, player.height) == true)
        {
            asteroids.splice(i,1);
            player.health -= 1;
            break;
        }
    }
    for(var i=0; i<aliens.length; i++)
    {
        if(intersects(
            aliens[i].x, aliens[i].y,
            aliens[i].width, aliens[i].height,
            player.x - player.width/2, player.y - player.height/2,
            player.width, player.height) == true)
        {
            aliens.splice(i,1);
            player.health -= 1;
            break;
        }
    }


    for(var i=0; i<bullets.length; i++)
    {
        bullets[i].x += bullets[i].velocityX;
        bullets[i].y += bullets[i].velocityY;
    }
    for(var i=0; i<bullets.length; i++)
    {
     
        if(bullets[i].x < -bullets[i].width ||
            bullets[i].x > SCREEN_WIDTH ||
            bullets[i].y < -bullets[i].height ||
            bullets[i].y > SCREEN_HEIGHT)
        {
     
            bullets.splice(i, 1);
            break;
        }
    }
    for(var i=0; i<bullets.length; i++)
    {
        context.drawImage(bullets[i].image,
            bullets[i].x - bullets[i].width/2,
            bullets[i].y - bullets[i].height/2);
    }

    for(var i=0; i<asteroids.length; i++) // Here we see if a bullet has collided with an asteroid and deletes both accordingly
    {
    for(var j=0; j<bullets.length; j++)
    {
        if(intersects(
            bullets[j].x, bullets[j].y,
            bullets[j].width, bullets[j].height,
            asteroids[i].x, asteroids[i].y,
            asteroids[i].width, asteroids[i].height) == true)
            {
            asteroids.splice(i, 1);
            bullets.splice(j, 1);
            Score += 10;
            break;
           
            }
        }
    }

    for(var i=0; i<aliens.length; i++) // Here we see if a bullet has collided with an asteroid and deletes both accordingly
    {
    for(var j=0; j<bullets.length; j++)
    {
        if(intersects(
            bullets[j].x, bullets[j].y,
            bullets[j].width, bullets[j].height,
            aliens[i].x, aliens[i].y,
            aliens[i].width, aliens[i].height) == true)
            {
            aliens.splice(i, 1);
            bullets.splice(j, 1);
            Score += 100;
            break;
           
            }
        }
    }

    for(var i=0; i<lazers.length; i++)
    {
        lazers[i].x += lazers[i].velocityX;
        lazers[i].y += lazers[i].velocityY;
    }
    for(var i=0; i<lazers.length; i++)
    {
     
        if(lazers[i].x < -lazers[i].width ||
            lazers[i].x > SCREEN_WIDTH ||
            lazers[i].y < -lazers[i].height ||
            lazers[i].y > SCREEN_HEIGHT)
        {
     
            lazers.splice(i, 1);
            break;
        }
    }
    for(var i=0; i<lazers.length; i++)
    {
        context.drawImage(lazers[i].image,
            lazers[i].x - lazers[i].width/2,
            lazers[i].y - lazers[i].height/2);
    }

    for(var i=0; i<asteroids.length; i++) // Here we see if a lazer has collided with an asteroid and deletes ONLY the asteroid
    {
    for(var j=0; j<lazers.length; j++)
    {
        if(intersects(
            lazers[j].x, lazers[j].y,
            lazers[j].width, lazers[j].height,
            asteroids[i].x, asteroids[i].y,
            asteroids[i].width, asteroids[i].height) == true)
            {
            asteroids.splice(i, 1);
            Score += 25;
            break;
           
            }
        }
    }

    for(var i=0; i<aliens.length; i++) // Here we see if a lazer has collided with an asteroid and deletes ONLY the asteroid
    {
    for(var j=0; j<lazers.length; j++)
    {
        if(intersects(
            lazers[j].x, lazers[j].y,
            lazers[j].width, lazers[j].height,
            aliens[i].x, aliens[i].y,
            aliens[i].width, aliens[i].height) == true)
            {
            aliens.splice(i, 1);
            Score += 250;
            break;
           
            }
        }
    }

    if(player.health == 0)
    {
        gameState = STATE_GAMEOVER;
    }
}

function runGameOver(deltaTime) //here is where once switched the game over screen is shown, 
    {
        context.fillStyle = "#000";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "#ffffff";
        context.font="24px Arial";
        context.fillText("YOU HAVE DIED!!!", 450, 400);
        context.fillText("Your score was " + Score, 450, 450);
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