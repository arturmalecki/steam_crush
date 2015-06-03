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
  /*var cursorX       = this.game.input.activePointer.x,
      cursorY       = this.game.input.activePointer.y,
      cursorGemPosX = this.board.convertToGemPosition(cursorX, 'x'),
      cursorGemPosY = this.board.convertToGemPosition(cursorY, 'y'),
      gemsMatches   = this.board.gemsMatches;

  this.gem1 = this.board.getGemByPos(cursorGemPosX, cursorGemPosY),
  this.gem2 = this.board.selectedGem;*/

  this.gem1 = gem1;
  this.gem2 = gem2;
  return this.isSwipePossible();
}

Game.GemsSwipe.prototype.isSwipePossible = function(gem1, gem2) {
  this.gem1 = gem1;
  this.gem2 = gem2;

  if (this.isCursorOnSelectedGem()) {
    return false;
  } else if(!this.areGemsInProperState()) {
    return false;
  } else if(this.isCursorOutsideBoard()) {
    return false;
  } else if(!this.isCursorIsOnValidPosition()) {
    return false;
  }
  return true;
}

Game.GemsSwipe.prototype.areGemsInProperState = function() {
  return !this.gem2.destroying && !this.gem1.destroying;
}

Game.GemsSwipe.prototype.isCursorOnSelectedGem = function() {
  return this.gem2.x === this.gem1.x && this.gem2.y === this.gem1.y;
}

Game.GemsSwipe.prototype.isCursorOutsideBoard = function() {
  return this.gem1.x < 0 || this.gem1.y < 0;
}

Game.GemsSwipe.prototype.isCursorIsOnValidPosition = function() {
  var cursorGemIndexX   = this.gem1.x / this.board.gemSize,
      cursorGemIndexY   = this.gem1.y / this.board.gemSize,
      selectedGemIndexX = this.gem2.x / this.board.gemSize,
      selectedGemIndexY = this.gem2.y / this.board.gemSize,
      indexX            = Math.abs(selectedGemIndexX - cursorGemIndexX),
      indexY            = Math.abs(selectedGemIndexY - cursorGemIndexY);
  
  return (indexX === 1 && indexY === 0) || (indexX === 0 && indexY === 1);
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
