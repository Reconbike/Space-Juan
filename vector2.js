var Vector2 = function(nX,nY)
{
	this.x = nX;
	this.y = nY;
}

Vector2.prototype.Set = function (nX, nY)
{
	this.x = nX;
	this.y = nY;
}

Vector2.prototype.Magnitude = function ()
{
	var mag = this.x*this.x + this.y*this.y
	mag = Math.sqrt(mag);
	return mag;
}

Vector2.prototype.Normalize = function ()// makes THIS vector normalized
{
	var mag = this.Magnitude();
	this.x = this.x / mag;
	this.y = this,y / mag;
}

Vector2.prototype.GetNormal = function () //returns a new vector 2 that is normalized
{
	var mag = this.Magnitude();
	Vector = new Vector2(0,0);

	v2.x = thix.x / mag;
	v2.y = this.y / magL

	return v2;
}

Vector2.prototype.add = function (other)
{

	this.x += other.x;
	this.y += other.y;
}

Vector2.prototype.Subtract = function (other)
{
	this.x -= other.x;
	this.y -= other.y;
}

Vector2.prototype.Multiply = function (scalar)
{
	this.x *= scalar;
	this.y *= scalar;
}

Vector2.prototype.Divide = function (scalar)
{
	this.x /= scalar;
	this.y /= scalar;
} 