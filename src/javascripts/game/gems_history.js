Game.GemsHistory = function(gem1, gem2) {
  this.gem1  = gem1;
  this.gem1X = gem1.x;
  this.gem1Y = gem1.y;
  this.gem2  = gem2;
  this.gem2X = gem2.x;
  this.gem2Y = gem2.y;
}

Game.GemsHistory.prototype.revert = function() {
  this.gem1.changePosition(this.gem1X, this.gem1Y);
  this.gem2.changePosition(this.gem2X, this.gem2Y);
}
