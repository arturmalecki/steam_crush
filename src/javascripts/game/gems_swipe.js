Game.GemsSwipe = function(board) {
  this.board          = board;
  this.gemToSwipe     = undefined;
  this.selectedGem    = undefined;
  this.gemsHistory    = undefined;
  this.swipeDoneCount = 0;
}

Game.GemsSwipe.prototype.proceed = function(gemToSwipe) {
  this.selectedGem = this.board.selectedGem;
  this.gemToSwipe  = gemToSwipe;

  if(this.board.isGemSelected() && this.gemToSwipe) {
    if(this.isSwipePossible()) {
      this.board.swipingBlocked = true;
      this.swipe();
    }
  }
}

Game.GemsSwipe.prototype.isSwipePossible = function() {
  if (this.isCursorOnSelectedGem()) {
    return false;
  } else if(this.isCursorOutsideBoard()) {
    return false;
  } else if(!this.isCursorIsOnValidPosition()) {
    return false;
  }
  return true;
}

Game.GemsSwipe.prototype.isCursorOnSelectedGem = function() {
  return this.selectedGem.x === this.gemToSwipe.x && this.selectedGem.y === this.gemToSwipe.y;
}

Game.GemsSwipe.prototype.isCursorOutsideBoard = function() {
  return this.gemToSwipe.x < 0 || this.gemToSwipe.y < 0;
}

Game.GemsSwipe.prototype.isCursorIsOnValidPosition = function() {
  var cursorGemIndexX   = this.gemToSwipe.x / this.board.gemSize,
      cursorGemIndexY   = this.gemToSwipe.y / this.board.gemSize,
      selectedGemIndexX = this.selectedGem.x / this.board.gemSize,
      selectedGemIndexY = this.selectedGem.y / this.board.gemSize,
      indexX            = Math.abs(selectedGemIndexX - cursorGemIndexX),
      indexY            = Math.abs(selectedGemIndexY - cursorGemIndexY);
  
  return (indexX === 1 && indexY === 0) || (indexX === 0 && indexY === 1);
}

Game.GemsSwipe.prototype.revert = function() {
  this.board.game.add.tween(this.gemsHistory.gem1).
    to({x: this.gemsHistory.gem1X, y: this.gemsHistory.gem1Y}, 200, Phaser.Easing.Linear.None, true).
    onComplete.add(this.swipingRevertingDone, this);
  this.board.game.add.tween(this.gemsHistory.gem2).
    to({x: this.gemsHistory.gem2X, y: this.gemsHistory.gem2Y}, 200, Phaser.Easing.Linear.None, true).
    onComplete.add(this.swipingRevertingDone, this);
}

Game.GemsSwipe.prototype.swipe = function() {
  var tmpX        = this.selectedGem.x,
      tmpY        = this.selectedGem.y;

  this.gemsHistory = new Game.GemsHistory(this.selectedGem, this.gemToSwipe);
  this.board.game.add.tween(this.selectedGem).
    to({x: this.gemToSwipe.x, y: this.gemToSwipe.y}, 200, Phaser.Easing.Linear.None, true).
    onComplete.add(this.swipingDone, this);
  this.board.game.add.tween(this.gemToSwipe).
    to({x: tmpX, y: tmpY}, 200, Phaser.Easing.Linear.None, true).
    onComplete.add(this.swipingDone, this);
}

Game.GemsSwipe.prototype.swipingDone = function(gem) { 
  gem.refresh();
  this.swipeDoneCount += 1;
  if(this.swipeDoneCount >= 2) {
    this.swipeDoneCount = 0;
    if(!this.board.gemsMatches.seekAndCrush()) {
      this.revert();
    }
  }
};

Game.GemsSwipe.prototype.swipingRevertingDone = function(gem) { 
  gem.refresh();
  this.swipeDoneCount += 1;
  if(this.swipeDoneCount >= 2) {
    this.swipeDoneCount = 0;
    this.board.allowSwiping();
  }
};
