Game.GemsSwipe = function() {
  this.selectedGem = undefined;
  this.board       = undefined;
  this.gemToSwipe  = undefined;
  this.gemsHistory = undefined;
}

Game.GemsSwipe.prototype.proceed = function(board, gemToSwipe) {
  this.selectedGem = board.selectedGem;
  this.board       = board;
  this.gemToSwipe  = gemToSwipe;

  if(this.board.isGemSelected() && this.gemToSwipe) {
    if(this.isSwipePossible()) {
      this.swipe();
      return true;
    }
  }
  return false;
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
  this.gemsHistory.revert();
}

Game.GemsSwipe.prototype.swipe = function() {
  var tmpX        = this.selectedGem.x,
      tmpY        = this.selectedGem.y;

  this.gemsHistory = new Game.GemsHistory(this.selectedGem, this.gemToSwipe);
  this.selectedGem.changePosition(this.gemToSwipe.x, this.gemToSwipe.y);
  this.gemToSwipe.changePosition(tmpX, tmpY);
}

