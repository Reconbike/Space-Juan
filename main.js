var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

var SCREEN_WIDTH = canvas.width;
var SCREEN_HEIGHT = canvas.height;

//Variables open to change to control the game
var ASTROID_SPEED = 1.25;//0.8;
var ALIEN_SPEED = 4
var PLAYER_SPEED = 2;
var PLAYER_TURN_SPEED = 0.07
var BULLET_SPEED = 10.5;
var LAZER_SPEED = 2.5;
var MATTER_SPEED = 5;
var STATE_SPLASH = 0;
var STATE_GAME = 1;
var STATE_GAMEOVER = 2;
var splashTimer = 10;
var gameState = STATE_SPLASH;
var shootTimer = 0;
var startFrameMillis = Date.now();
var endFrameMillis = Date.now();
var spawnTimer = 0;
var spawn2Timer= 10;
var spawn3Timer= 30;
var speed = 0;
var Score = 0;
var TimerCoolDown = 0;
var Timer = 0;
var xxx = 0.4;
var yyy = 30;

//Variables to control all sounds in the game
var sfxlazer;
var sfxbullet;
var sfxUFO;
var sfxMENU;
var sfxGG;
var sfxExplosion;
var sfxripUFO;
var sfxMixtape;
var sfxUltimateShot;
var sfxUltimateCharge;
var sfxAlarm;

//All arrays used in the game
var asteroids = [];
var asteroid2s = [];
var aliens = [];
var bullets = [];
var lazers = [];
var matters = [];
var player = new Player();
var keyboard = new Keyboard();

//images used in the HUD

var Bar = document.createElement("img");
Bar.src = "Bar.png"
var Functional = document.createElement("img");
Functional.src = "Functional.png";
var Critical = document.createElement("img");
Critical.src = "Critical.png";
var Charged = document.createElement("img");
Charged.src = "Charged.png";
var Charging = document.createElement("img");
Charging.src = "Charging.png";


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

function UltimateFire()
{
    var matter = {
        image: document.createElement("img"),
        x: player.x,
        y: player.y,
        width: 150,
        height: 150,
        velocityX: 0,
        velocityY: 0
    };
    matter.image.src = "DarkMatter.png";
 
    var velX = 0;
    var velY = -1;
    var s = Math.sin(player.rotation);
    var c = Math.cos(player.rotation);
    var xVel = (velX * c) - (velY * s);
    var yVel = (velX * s) + (velY * c);
 
    matter.velocityX = xVel * MATTER_SPEED;
    matter.velocityY = yVel * MATTER_SPEED;
 
    matters.push(matter);
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

function spawnAsteroid2()
{
    var type = rand(0, 3);
    
    var asteroid2 = {};
    
    asteroid2.image = document.createElement("img");
    asteroid2.image.src = "asteroid_l_01_by_skazdal-d8v7rzq.png";
    asteroid2.width = 100;
    asteroid2.height = 100;
    
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
    
    asteroid2.x = x + movX;
    asteroid2.y = y + movY;
    
    asteroid2.velocityX = -dirX * (ASTROID_SPEED - (ASTROID_SPEED / 2));
    asteroid2.velocityY = -dirY * (ASTROID_SPEED - (ASTROID_SPEED / 2));
    
    asteroid2s.push(asteroid2);
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

//initialize holds all sound files that are going to be used in the game

function initialize() 
{
    sfxlazer = new Howl(
    {
        urls:["LazerFire.ogg"],
        buffer: true,
        volume: 0.25,
        onend: function(){
            isSfxPlaying = false;
        }
    });

    sfxbullet = new Howl(
    {
        urls:["Bulletfire.ogg"],
        buffer: true,
        volume: 0.25,
        onend: function(){
            isSfxPlaying = false;
        }
    });

    sfxUltimateCharge = new Howl(
    {
        urls:["UltimateCharge.ogg"],
        buffer: true,
        volume: 0.15,
        onend: function(){
            isSfxPlaying = false;
        }
    });


    sfxUltimateShot = new Howl(
    {
        urls:["UltimateShot.ogg"],
        buffer: true,
        volume: 0.25,
        onend: function(){
            isSfxPlaying = false;
        }
    });

    sfxExplosion = new Howl(
    {
        urls:["Explosion.ogg"],
        buffer: true,
        volume: 0.10,
        onend: function(){
            isSfxPlaying = false;
        }

    });

    sfxripUFO = new Howl(
    {
        urls:["ripUFO.ogg"],
        buffer: true,
        volume: 0.25,
        onend: function(){
            isSfxPlaying = false;
        }

    });

    sfxUFO = new Howl(
    {
        urls:["UFO.ogg"],
        buffer: true,
        volume: 0.25,
        onend: function(){
            isSfxPlaying = false;
        }
    });

    sfxGG = new Howl(
    {
        urls:["GG.ogg"],
        loop: false,
        buffer: true,
        volume: 0.5,

    });

    sfxMixtape = new Howl(
    {
        urls:["Mixtape.ogg"],
        loop: true,
        buffer: true,
        volume: 0.5,

    });
    
    sfxAlarm = new Howl(
    {
        urls:["Alarm.ogg"],
        buffer: true,
        volume: 0.5,
        onend: function(){
            isSfxPlaying = false;
        }
    });

    sfxMENU = new Howl(
    {
        urls:["MENU.ogg"],
        loop: false,
        buffer: true,
        volume: 0.5,

    });

    sfxMENU.play();
    sfxMixtape.play();
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
        context.font="14px Arial";

        context.fillText("Controls:", 0, 50);
        context.fillText("W A S D - To move Forward, Backward, Turn Left and to Turn Right", 0, 75);
        context.fillText("Q to Fire the Machine Gun (1 hit 1 kill) ", 0, 100);
        context.fillText("E To Fire Lazers Balls (can penetrate asteroids) ", 0, 125);
        context.fillText("R To Fire Dark Matter Cannon (Can penetrate asteroids and destroy the super asteroid, requires charging before firing again)", 0, 150);
        context.font="32px Arial";
        context.fillText("Space-Juan", 470, 300);
        context.fillText("An Asteroid Space Shooter", 390, 350);
        context.fillText("By Jaymie Gobbett and Brendon Bano", 300, 400);
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

    for(var i=0; i<asteroid2s.length; i++)
    {
        asteroid2s[i].x = asteroid2s[i].x + asteroid2s[i].velocityX;
        asteroid2s[i].y = asteroid2s[i].y + asteroid2s[i].velocityY;
    }
     
    for(var i=0; i<asteroids.length; i++)
    {
        context.drawImage(asteroids[i].image, asteroids[i].x, asteroids[i].y);
    }

    for(var i=0; i<asteroid2s.length; i++)
    {
        context.drawImage(asteroid2s[i].image, asteroid2s[i].x, asteroid2s[i].y);
    }

    spawnTimer -= deltaTime;
    if(spawnTimer <= 0)
    {
        spawnTimer = xxx;
        spawnAsteroid();
    }

    if(Score >= 1200)
    {
        xxx = 0.15;
        yyy = 10;
    }
    spawn3Timer -= deltaTime;
    if(spawn3Timer <= 0)
    {
        spawn3Timer = yyy;
        spawnAsteroid2();
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
        spawn2Timer = 25;
        spawnAlien();
        sfxUFO.play();
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
            sfxAlarm.play();
            break;
        }
    }
    for(var i=0; i<asteroid2s.length; i++)
    {
        if(intersects(
            asteroid2s[i].x, asteroid2s[i].y,
            asteroid2s[i].width, asteroid2s[i].height,
            player.x - player.width/2, player.y - player.height/2,
            player.width, player.height) == true)
        {
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
            sfxAlarm.play();
            sfxUFO.stop();
            sfxripUFO.play();
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
            sfxExplosion.play();
            Score += 10;
            break;
           
            }
        }
    }

    for(var i=0; i<asteroid2s.length; i++) // Here we see if a bullet has collided with an asteroid and deletes both accordingly
    {
    for(var j=0; j<matters.length; j++)
    {
        if(intersects(
            matters[j].x, matters[j].y,
            matters[j].width, matters[j].height,
            asteroid2s[i].x, asteroid2s[i].y,
            asteroid2s[i].width, asteroid2s[i].height) == true)
            {
            asteroid2s.splice(i, 1);
            sfxExplosion.play();
            Score += 500;
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
            sfxUFO.stop();
            sfxripUFO.play();
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
            sfxExplosion.play();
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
            sfxUFO.stop();
            sfxripUFO.play();
            Score += 250;
            break;
           
            }
        }
    }

    for(var i=0; i<matters.length; i++)
    {
        matters[i].x += matters[i].velocityX;
        matters[i].y += matters[i].velocityY;
    }
    for(var i=0; i<matters.length; i++)
    {
     
        if(matters[i].x < -matters[i].width ||
            matters[i].x > SCREEN_WIDTH ||
            matters[i].y < -matters[i].height ||
            matters[i].y > SCREEN_HEIGHT)
        {
     
            matters.splice(i, 1);
            break;
        }
    }
    for(var i=0; i<matters.length; i++)
    {
        context.drawImage(matters[i].image,
            matters[i].x - matters[i].width/2,
            matters[i].y - matters[i].height/2);
    }

    for(var i=0; i<asteroids.length; i++) // Here we see if a Matter Cannon has collided with an asteroid and deletes ONLY the asteroid
    {
    for(var j=0; j<matters.length; j++)
    {
        if(intersects(
            matters[j].x, matters[j].y,
            matters[j].width, matters[j].height,
            asteroids[i].x, asteroids[i].y,
            asteroids[i].width, asteroids[i].height) == true)
            {
            asteroids.splice(i, 1);
            sfxExplosion.play();
            Score += 25;
            break;
           
            }
        }
    }

    for(var i=0; i<aliens.length; i++) // Here we see if a Matter Cannon has collided with an asteroid and deletes ONLY the asteroid
    {
    for(var j=0; j<matters.length; j++)
    {
        if(intersects(
            matters[j].x, matters[j].y,
            matters[j].width, matters[j].height,
            aliens[i].x, aliens[i].y,
            aliens[i].width, aliens[i].height) == true)
            {
            aliens.splice(i, 1);
            sfxUFO.stop();
            sfxripUFO.play();
            Score += 1000;
            break;
           
            }
        }
    }

    if(player.health == 0)
    {
        sfxMixtape.stop();
        sfxGG.play();
        sfxUFO.stop();
        sfxUltimateCharge.stop();
        gameState = STATE_GAMEOVER;
    }
    if(player.health == 2){
        context.drawImage(Functional,0,630)
    }
    if(player.health == 1){
        context.drawImage(Critical,0,630)
    }

    if(player.shoot3Timer <= 0)
    {
        context.drawImage(Charged,940,630)
    }
    if(player.shoot3Timer > 0)
    {
        context.drawImage(Charging,940,630)
    }

    // Our version of creating a timer
    if(TimerCoolDown > 0)
    {
        TimerCoolDown -= deltaTime;
    }

    if(Timer >=0 && TimerCoolDown <=0)
    {
        Timer +=1;
        TimerCoolDown +=1;
    }

    context.font="24px Arial";
    context.fillStyle = "#FFFFFF";
    context.drawImage(Bar,460,0)
    context.fillText("SCORE: " + Score,500,30)
    context.fillText("Ship's Condition:",0,620)
    context.fillText("Dark Matter Cannon",925,620)
    context.fillText(Timer,550,75)


}

function runGameOver(deltaTime) //here is where once switched the game over screen is shown, 
    {
        sfxAlarm.stop();
        context.fillStyle = "#000";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "#ffffff";
        context.font="32px Arial";
        context.fillText("YOU HAVE DIED!!!", 450, 350);
        context.fillText("Your score was " + Score +" :D", 450, 400);
        context.fillText("Press Shift to restart", 450, 450);

    if(keyboard.isKeyDown(keyboard.KEY_SHIFT) == true) 
    {
        window.location.reload(false);
    }
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

initialize();

//===========================================DO NOT EDIT BELOW THIS LINE =================================================

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