Game.GemsSwipe = function(board, gemToSwipe) {
  this.board = board;
  this.gemToSwipe = gemToSwipe;
}

Game.GemsSwipe.prototype.proceed = function() {
  if(this.board.isGemSelected() && this.gemToSwipe) {
    if(this.isSwipePossible()) {
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
  return this.board.selectedGem.x === this.gemToSwipe.x && this.board.selectedGem.y === this.gemToSwipe.y;
}

Game.GemsSwipe.prototype.isCursorOutsideBoard = function() {
  return this.gemToSwipe.x < 0 || this.gemToSwipe.y < 0;
}

Game.GemsSwipe.prototype.isCursorIsOnValidPosition = function() {
  var cursorGemIndexX   = this.gemToSwipe.x / this.board.gemSize,
      cursorGemIndexY   = this.gemToSwipe.y / this.board.gemSize,
      selectedGemIndexX = this.board.selectedGem.x / this.board.gemSize,
      selectedGemIndexY = this.board.selectedGem.y / this.board.gemSize,
      indexX            = Math.abs(selectedGemIndexX - cursorGemIndexX),
      indexY            = Math.abs(selectedGemIndexY - cursorGemIndexY);
  
  return (indexX === 1 && indexY === 0) || (indexX === 0 && indexY === 1);
}

Game.GemsSwipe.prototype.swipe = function() {
  console.log('swipe');
}

