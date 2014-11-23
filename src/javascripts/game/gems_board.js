Game.GemsBoard = function(game, cols, rows, gemSize) {
  Phaser.Group.call(this, game);

  this.game            = game;
  this.cols            = cols;
  this.rows            = rows;
  this.gemSize         = gemSize;
  this.x               = (game.width / 2) - (this.cols * gemSize / 2);
  this.y               = (game.height / 2) - (this.rows * gemSize / 2);
  this.selectedGem     = undefined;
  this.gemsSwipe       = new Game.GemsSwipe(this);
  this.gemsDrop        = new Game.GemsDrop(this);
  this.gemsCrusher     = new Game.GemsCrusher(this);

  this.populate();
}

Game.GemsBoard.prototype = Object.create(Phaser.Group.prototype);
Game.GemsBoard.prototype.constructor = Game.GemsBoard;

Game.GemsBoard.prototype.eachGem = function(func, context) {
  var level = Game.Levels[Game.User.level],
      x, y;
  for(y = 0; y < level.ySize; y++) {
    for(x = 0; x < level.xSize; x++) {
      if(level.board[y][x] === 1) {
        func.call(context, x, y);
      }
    }
  }
}


Game.GemsBoard.prototype.populate = function() {
  var gem, randomGem;

  this.eachGem(function(x, y) {
    randomGem = Math.floor((Math.random() * 5) + 1);
    gem = new Game.Gem(this.game, this.gemSize * x, this.gemSize * y, 'tiles', randomGem);
    gem.events.onInputDown.add(this.selectGem, this);
    this.add(gem);
  }, this);
}

Game.GemsBoard.prototype.update = function() {
  var x, y, gem;

  for(x = 0; x < this.cols; x++) {
    for(y = 0; y < this.rows; y++) {
      gem = this.getGem(x, y);
      if(gem && !gem.alive) {
        gem.destroy();
      }
    }
  };

  if(!this.isSwapping()){
    if(this.selectGem) {
      this.gemsSwipe.run();
    }
    this.gemsCrusher.run();
  }
  if(!this.isSwapping() && !this.isDropping()){
    this.gemsDrop.run();
  }

  if(this.game.input.activePointer.justReleased()) {
    this.clearSelectedGem();
  }
}

Game.GemsBoard.prototype.isSwapping = function() {
  return this.children.filter(function(gem) {
    return gem.swapping;
  }).length > 0;
}

Game.GemsBoard.prototype.isDropping = function() {
  return this.children.filter(function(gem) {
    return gem.dropping;
  }).length > 0;
}

Game.GemsBoard.prototype.selectGem = function(gem) {
  if(!this.isSwapping() && !this.selectedGem) {
    this.selectedGem = gem;
    this.selectedGem.angle = 10;
  }
}

Game.GemsBoard.prototype.isGemSelected = function() {
  return !!this.selectedGem;
}

Game.GemsBoard.prototype.convertToGemPosition = function(position, cord) {
  var p = position - this[cord];

  return Math.floor(p / this.gemSize) * this.gemSize;
}

Game.GemsBoard.prototype.getGemByPos = function(x, y) {
  var gemId = x + 'x' + y;

  return this.iterate('id', gemId, Phaser.Group.RETURN_CHILD);
}

Game.GemsBoard.prototype.getGem = function(x, y) {
  return this.getGemByPos(x * this.gemSize, y * this.gemSize)
}

Game.GemsBoard.prototype.getGemFrame = function(x, y) {
  var gem = this.getGem(x, y);

  if(gem) {
    return gem.frame;
  } else {
    return undefined;
  }
}

Game.GemsBoard.prototype.isEptyField = function(x, y) {
  return !this.getGem(x, y);
}

Game.GemsBoard.prototype.clearSelectedGem = function() {
  if(this.selectedGem) {
    this.selectedGem.angle = 0;
  }
  this.selectedGem = undefined;
}

