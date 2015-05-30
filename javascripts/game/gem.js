Game.Gem = function(game, x, y, key, frame) {
  Phaser.Sprite.call(this, game, x, y, key, frame);

  this.scale.x = 1.5;
  this.scale.y = 1.5;
  this.inputEnabled = true;
  this.swapping = false;
  this.dropping = false;
  this.destroying = false;
  this.refresh();
}

Game.Gem.prototype = Object.create(Phaser.Sprite.prototype);
Game.Gem.prototype.constructor = Game.Gem;

Game.Gem.prototype.refresh = function() {
  this.id = this.x + "x" + this.y;
}

Game.Gem.prototype.changePosition = function(x, y) {
  this.x = x;
  this.y = y;
  this.refresh();
}

