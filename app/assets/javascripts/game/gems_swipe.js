Game.GemsSwipe = function(board) {
  this.board = board;
  this.game  = this.board.game;
  this.gem1;
  this.gem2;
  this.gem1Tween;
  this.gem2Tween;
  this.gemsHistory;
}

Game.GemsSwipe.prototype.run = function(gem1, gem2) {
  this.gem1 = gem1;
  this.gem2 = gem2;
  return this.isSwipePossible();
}

Game.GemsSwipe.prototype.isSwipePossible = function(gem1, gem2) {
  var xDiff = Math.abs((gem1.x - gem2.x) / Game.G.gemSize),
      yDiff = Math.abs((gem1.y - gem2.y) / Game.G.gemSize);

  if(xDiff > 1) { return false }
  if(yDiff > 1) { return false }

  return true;
}

Game.GemsSwipe.prototype.revert = function() {
  var gem1, gem2;

  this.revertCount = 0;
  gem1 = this.gemsHistory.gem1;
  gem1.swapping = true;
  gem2 = this.gemsHistory.gem2;
  gem2.swapping = true;

  this.game.add.tween(this.gemsHistory.gem1).
    to({x: this.gemsHistory.gem1X, y: this.gemsHistory.gem1Y}, 200, Phaser.Easing.Linear.None, true).
    onComplete.add(this.revertOnComplete, this);
  this.game.add.tween(this.gemsHistory.gem2).
    to({x: this.gemsHistory.gem2X, y: this.gemsHistory.gem2Y}, 200, Phaser.Easing.Linear.None, true).
    onComplete.add(this.revertOnComplete, this);

  this.gemsHistory = undefined;
  this.board.clearSelectedGem();
}

Game.GemsSwipe.prototype.swipe = function(gem1, gem2) {
  var tmpX = gem2.x,
      tmpY = gem2.y,
      gem1Tween, gem2Tween,
      self = this;

  this.swipeCount = 0,
  this.gemsHistory = new Game.GemsHistory(gem1, gem2);
  gem1.swapping = true;
  gem2.swapping = true;

  gem1Tween = this.game.add.tween(gem1).to({x: tmpX, y: tmpY}, 200, Phaser.Easing.Linear.None);
  gem2Tween = this.game.add.tween(gem2).to({x: gem1.x, y: gem1.y}, 200, Phaser.Easing.Linear.None);
  gem1Tween.onComplete.add(this.swipeOnComplete, this);
  gem2Tween.onComplete.add(this.swipeOnComplete, this);

  gem1Tween.start();
  gem2Tween.start();
}

Game.GemsSwipe.prototype.swipeOnComplete = function(gem) {
  gem.swapping = false;
  gem.refresh();
  this.swipeCount += 1;
  if(this.swipeCount === 2) {
    if(this.board.gemsMatches.fetch().length > 0) {
      this.board.setStateTo('find_pairs'); 
    } else {
      this.revert();
    }
  }
}

Game.GemsSwipe.prototype.revertOnComplete = function(gem) {
  gem.swapping = false;
  gem.refresh();
  this.revertCount += 1;
  if(this.revertCount === 2) {
    this.board.setStateTo('idle'); 
  }
}
