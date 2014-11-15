Game.GemsDrop = function(board) {
  this.board = board;
}


Game.GemsDrop.prototype.toFieldLock = function(x, y) {
  return x + 'x' + y;
}

Game.GemsDrop.prototype.run = function() {
  var x, y, emptyFieldsSize, gemY;

  this.refillBoard();
  for(x = 0; x < this.board.cols; x++) {
    for(y = 0; y < this.board.rows; y++) {
      if(!this.board.isEptyField(x, y)) {
        emptyFieldsSize = this.countEmptyFields(x, y);
        if(emptyFieldsSize > 0) {
          this.dropGem(x, y, emptyFieldsSize);
        }
      }
    }
  }
  for(x = 0; x < this.board.cols; x++) {
    for(y = 1; y <= this.board.rows; y++) {
      gemY = -1 * y;
      if(!this.board.isEptyField(x, gemY)) {
        emptyFieldsSize = this.countEmptyFields(x, gemY);
        if(emptyFieldsSize > 0) {
          this.dropGem(x, gemY, emptyFieldsSize);
        }
      }
    }
  }
}

Game.GemsDrop.prototype.refillBoard = function() {
  var x, y, gem, gemX, gemY,
      gemSize = this.board.gemSize;

  for(x = 0; x < this.board.cols; x++) {
    for(y = 0; y < this.board.rows; y++) {
      gem = this.board.getGem(x, y);
      if(!gem) {
        gemX = x;
        gemY = -1;
        while(this.board.getGem(gemX, gemY)) {
          gemY -= 1;
        }
        gem = new Game.Gem(this.board.game, gemX * gemSize, gemY * gemSize, 'tiles', Math.floor((Math.random() * 10) + 1))
        gem.events.onInputDown.add(this.board.selectGem, this.board)
        this.board.add(gem);
      }
    }
  }
}

Game.GemsDrop.prototype.countEmptyFields = function(x, y) {
  var emptySpaceCount = 0,
      nextY = y + 1;

  while(nextY < this.board.rows) {
    if(this.board.isEptyField(x, nextY)) {
      emptySpaceCount += 1;
    }
    nextY += 1;
  }
  return emptySpaceCount;
}

Game.GemsDrop.prototype.dropGem = function(x, y, size) {
  var height = size * this.board.gemSize,
      ySize = y * this.board.gemSize,
      gem = this.board.getGem(x, y);
  
  if(gem) {
    gem.dropping = true;
    this.board.game.add.tween(gem).to({y: ySize + height}, 600, Phaser.Easing.Bounce.Out, true).onComplete.add(function(gem) { gem.dropping = false; gem.refresh(); }, this);
  }
}
