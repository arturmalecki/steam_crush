Game.Gem = function(game, x, y, key, frame) {
  Phaser.Sprite.call(this, game, x, y, key, frame);

  this.scale.x = 1.5;
  this.scale.y = 1.5;
  this.inputEnabled = true;
  this.id = x + "x" + y;
}

Game.Gem.prototype = Object.create(Phaser.Sprite.prototype);
Game.Gem.prototype.constructor = Game.Gem;
