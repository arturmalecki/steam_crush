Game.GemsSwipe = function(board) {
  this.board = board;
  this.game  = this.board.game;
  this.gem1;
  this.gem2;
  this.gem1Tween;
  this.gem2Tween;
  this.gemsHistory;
}

Game.GemsSwipe.prototype.run = function() {
  var cursorX       = this.game.input.activePointer.x,
      cursorY       = this.game.input.activePointer.y,
      cursorGemPosX = this.board.convertToGemPosition(cursorX, 'x'),
      cursorGemPosY = this.board.convertToGemPosition(cursorY, 'y'),
      gemsMatches   = new Game.GemsMatches(this.board);

  this.gem1 = this.board.getGemByPos(cursorGemPosX, cursorGemPosY),
  this.gem2 = this.board.selectedGem;

  if(this.gemsHistory) {
    if(!gemsMatches.hasMatches()) {
      this.revert();
    } else {
      this.gemsHistory = undefined;
    }
  } else if(this.gem1 && this.gem2 && this.isSwipePossible()) {
    this.swipe();
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
  this.gem1 = this.gemsHistory.gem1;
  this.gem1.swapping = true;
  this.gem2 = this.gemsHistory.gem2;
  this.gem2.swapping = true;

  this.game.add.tween(this.gemsHistory.gem1).
    to({x: this.gemsHistory.gem1X, y: this.gemsHistory.gem1Y}, 200, Phaser.Easing.Linear.None, true).
    onComplete.add(function() { this.gem1.refresh(); this.gem1.swapping = false; }, this);
  this.game.add.tween(this.gemsHistory.gem2).
    to({x: this.gemsHistory.gem2X, y: this.gemsHistory.gem2Y}, 200, Phaser.Easing.Linear.None, true).
    onComplete.add(function() { this.gem2.refresh(); this.gem2.swapping = false; }, this);

  this.gemsHistory = undefined;
  this.board.clearSelectedGem();
}

Game.GemsSwipe.prototype.swipe = function() {
  var tmpX = this.gem2.x,
      tmpY = this.gem2.y,
      gem1Tween, gem2Tween;

  this.gemsHistory = new Game.GemsHistory(this.gem1, this.gem2);
  this.gem1.swapping = true;
  this.gem2.swapping = true;

  gem1Tween = this.game.add.tween(this.gem1).to({x: tmpX, y: tmpY}, 200, Phaser.Easing.Linear.None);
  gem2Tween = this.game.add.tween(this.gem2).to({x: this.gem1.x, y: this.gem1.y}, 200, Phaser.Easing.Linear.None);
  gem1Tween.onComplete.add(function() { this.gem1.swapping = false; this.gem1.refresh(); }, this);
  gem2Tween.onComplete.add(function() { this.gem2.swapping = false; this.gem2.refresh(); }, this);

  gem1Tween.start();
  gem2Tween.start();
}

