Game.Animations.MenuItem = function(game, delay) {
  this.game = game;
  this.delay = delay;
  this.currentDelay = 0;
}


Game.Animations.MenuItem.prototype = Object.create(Phaser.Group.prototype);
Game.Animations.MenuItem.prototype.constructor = Game.Animations.MenuItem;

Game.Animations.MenuItem.prototype.add = function(button) {
  button.alpha = 0.0;
  this.game.add.tween(button).
    delay(this.currentDelay).
    to({ alpha: 1.0 }, 1000, Phaser.Easing.Linear.None).
    start();
  this.incrementCurrentDelay();
};

Game.Animations.MenuItem.prototype.incrementCurrentDelay = function(button) {
  this.currentDelay += this.delay;
}
