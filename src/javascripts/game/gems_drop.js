Game.GemsDrop = function(board) {
  this.board = board;
  this.lockedFields = {};
}

Game.GemsDrop.prototype.clearLockedField = function() {
  this.lockedFields = {};
}

Game.GemsDrop.prototype.toFieldLock = function(x, y) {
  return x + 'x' + y;
}

Game.GemsDrop.prototype.isFieldLocked = function(x, y) {
  return this.lockedFields[this.toFieldLock(x, y)];
}

Game.GemsDrop.prototype.lockField = function(x, y) {
  this.lockedFields[this.toFieldLock(x, y)] = true;
}

Game.GemsDrop.prototype.run = function() {
  var x, y, emptyFieldsSize;

  this.clearLockedField();

  for(x = 0; x < this.board.cols; x++) {
    for(y = 0; y < this.board.rows; y++) {
      if(this.board.isEptyField(x, y)) {
        if(!this.isFieldLocked(x, y)) {
          emptyFieldsSize = this.countEmptyFields(x, y);
          this.dropGems(x, y, emptyFieldsSize);
        }
      }
    }
  }
}

Game.GemsDrop.prototype.countEmptyFields = function(x, y) {
  var emptySpaceCount = 1,
      nextY = y + 1;

  this.lockField(x, y);
  while(this.board.isEptyField(x, nextY)) {
    this.lockField(x, nextY);
    emptySpaceCount += 1;
    nextY += 1;
  }
  return emptySpaceCount;
}

Game.GemsDrop.prototype.dropGems = function(x, y, size) {
  var prevGem, 
      prevGemY = y - 1,
      height = size * this.board.gemSize;

  if(y > 0) {
    while(prevGemY >= 0) {
      prevGem = this.board.getGem(x, prevGemY);
      if(prevGem) {
        prevGem.changePosition(prevGem.x, prevGem.y + height);
        prevGemY -= 1;
      }
    }
  }
}
