Game.GemsDrop = function(board) {
  this.board = board;
}

Game.GemsDrop.prototype.toFieldLock = function(x, y) {
  return x + 'x' + y;
}

Game.GemsDrop.prototype.run = function() {
  var level = this.board.level, 
      x, y, gem, gemToDrop;

  this.refillBoard();
  for(y = level.ySize - 1; y >=0; y--) {
    for(x = level.xSize - 1; x >= 0; x--) {
      if(level.board[y][x] !== 0) {
        gem = this.board.getGem(x, y);
        if(!gem || (gem && gem.dropping)) {
          gemToDrop = this.findToDrop(x, y, level.ySize);
          this.dropGem(gemToDrop, y); 
        }
      }
    }
  }
}

Game.GemsDrop.prototype.findToDrop = function(currentX, currentY, yMax) {
  var distance = -1, 
      gem, y;

  while(true) {
    y = currentY + distance;
    gem = this.board.getGem(currentX, y);
    if(gem && !gem.dropping) {
      return gem;
    }
    distance -= 1;
  }
};

Game.GemsDrop.prototype.refillBoard = function() {
  var x, y, gem, gemX, gemY,
      gemSize = this.board.gemSize,
      self = this;

  this.board.eachGem(function(x, y) {
    gem = this.board.getGem(x, y);
    if(!gem) {
      gemX = x;
      gemY = -1;
      while(this.board.getGem(gemX, gemY)) {
        gemY -= 1;
      }
      gem = new Game.Gem(this.board.game, gemX * gemSize, gemY * gemSize, 'tiles', Math.floor((Math.random() * self.board.level.numberOfTiles) + 1))
      gem.events.onInputDown.add(this.board.selectGem, this.board)
      this.board.add(gem);
    }
  }, this);
}

Game.GemsDrop.prototype.dropGem = function(gem, dropToY) {
  if(gem) {
    gem.dropping = true;
    this.board.game.add.tween(gem).to({y: dropToY * this.board.gemSize}, 500, Phaser.Easing.Bounce.Out, true).onComplete.add(function(gem) { gem.dropping = false; gem.refresh(); }, this);
  }
}
