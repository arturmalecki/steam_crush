Game.GemsDrop = function(board) {
  this.board = board;
  this.dropGemsCount = 0;
}


Game.GemsDrop.prototype.toFieldLock = function(x, y) {
  return x + 'x' + y;
}

Game.GemsDrop.prototype.run = function() {
  var x, y, emptyFieldsSize;

  for(x = 0; x < this.board.cols; x++) {
    for(y = 0; y < this.board.rows; y++) {
      if(!this.board.isEptyField(x, y)) {
        emptyFieldsSize = this.countEmptyFields(x, y);
        this.dropGem(x, y, emptyFieldsSize);
      }
    }
  }
  //On case when there was no dropings.
  //this.dropingDone();
}

Game.GemsDrop.prototype.countEmptyFields = function(x, y) {
  var emptySpaceCount = 0,
      nextY = y + 1;

  while(nextY < this.board.rows && this.board.isEptyField(x, nextY)) {
    emptySpaceCount += 1;
    nextY += 1;
  }
  return emptySpaceCount;
}

Game.GemsDrop.prototype.dropGem = function(x, y, size) {
  var height = size * this.board.gemSize,
      gem = this.board.getGem(x, y);
  
  if(gem) {
    this.dropGemsCount += 1;
    this.board.game.add.tween(gem).to({y: y + height}, 600, Phaser.Easing.Bounce.Out, true).
      onComplete.add(this.dropingDone, this);
  }
}

Game.GemsDrop.prototype.dropingDone = function() {
  this.dropGemsCount -= 1;

  if(this.dropGemsCount <= 0) {
    this.dropGemsCount = 0;
    this.board.gemsFindMatches.run(false);
  }
}
