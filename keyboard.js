var Keyboard = function() {
	var self = this;

	window.addEventListener('keydown', function(evt) { self.onKeyDown(evt); }, false);
	window.addEventListener('keyup', function(evt) { self.onKeyUp(evt); }, false);

	this.keyListeners = new Array();
	this.keys = new Array();

// List of all controls that could be inputed into the game
	this.KEY_SPACE = 32;
	this.KEY_LEFT = 37;
	this.KEY_UP = 38;
	this.KEY_RIGHT = 39;
	this.KEY_DOWN = 40;
	this.KEY_A = 65;
	this.KEY_D = 68;
	this.KEY_S = 83;
	this.KEY_W = 87;
	this.KEY_SHIFT = 16;
	this.KEY_R = 82;
	this.KEY_Q = 81;
	this.KEY_E = 69;

};

Keyboard.prototype.onKeyDown = function(evt)
{
this.keys[evt.keyCode] = true;
};
Keyboard.prototype.onKeyUp = function(evt)
{
this.keys[evt.keyCode] = false;
};
Keyboard.prototype.isKeyDown = function(keyCode)
{
return this.keys[keyCode];
};

