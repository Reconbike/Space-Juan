var Player = function() 
{
	this.image = document.createElement("img");
	this.image.src = "Player.png"

	this.x = 570;
	this.y = 340;

    this.width= 63;
    this.height= 57;

    this.directionX = 0;
    this.directionY = 0;

    this.angularDirection = 0;
    this.rotation = 0;

    this.health = 2;

    this.shootTimer = 0;
}

Player.prototype.update = function(deltaTime)
{
    if(keyboard.isKeyDown(keyboard.KEY_W) == true){
    	player.directionY = -2;
    }else if (keyboard.isKeyDown(keyboard.KEY_S) == true) {
    	player.directionY = 1;
    }else{
    	player.directionY = 0;
    }

    if(keyboard.isKeyDown(keyboard.KEY_A) == true){
    	player.angularDirection = -2;
    }else if (keyboard.isKeyDown(keyboard.KEY_D) == true) {
    	player.angularDirection = 2;
    }else{
    	player.angularDirection = 0;
    }

    if(keyboard.isKeyDown(keyboard.KEY_Q) == true && this.shootTimer <= 0)
    {
        this.shootTimer += 0.000000000000001;
        PrimaryFire();
    }
    if(this.shootTimer > 0)
    {
      	this.shootTimer -= deltaTime;
    }
}

Player.prototype.draw = function()
{
	//context.drawImage(
	//player.image, -player.width/2, -player.height/2);
}