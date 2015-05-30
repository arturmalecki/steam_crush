Game.GemsBoard = function(game, gemSize) {
  Phaser.Group.call(this, game);

  this.game            = game;
  this.gemSize         = gemSize;
  this.selectedGem     = undefined;
  this.gemsSwipe       = new Game.GemsSwipe(this);
  this.gemsDrop        = new Game.GemsDrop(this);
  this.gemsCrusher     = new Game.GemsCrusher(this);
  this.level           = Game.Levels[Game.User.level][Game.User.sublevel];
  this.gemsMatches     = new Game.GemsMatches(this);
  this.points          = new Game.Points(this);

  this.populate();

  this.scale = new Phaser.Point(Game.scaleValue, Game.scaleValue);
  this.x     = (game.width / 2) - (this.width / 2);
  this.y     = 50; //(game.height / 2) - (this.rows * gemSize / 2);
}

Game.GemsBoard.prototype = Object.create(Phaser.Group.prototype);
Game.GemsBoard.prototype.constructor = Game.GemsBoard;

Game.GemsBoard.prototype.eachGem = function(func, context) {
  var level = this.level,
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
  var gem, randomGem,
      self = this;

  this.eachGem(function(x, y) {
    randomGem = Math.floor((Math.random() * self.level.numberOfTiles) + 1);
    gem = new Game.Gem(this.game, this.gemSize * x, this.gemSize * y, 'tiles', randomGem);
    gem.events.onInputDown.add(this.selectGem, this);
    this.add(gem);
  }, this);
}

Game.GemsBoard.prototype.update = function() {
  var level = this.level,
      x, y, gem;

  for(x = 0; x < level.xSize; x++) {
    for(y = 0; y < level.ySize; y++) {
      gem = this.getGem(x, y);
      if(gem && !gem.alive) {
        gem.destroy();
      }
    }
  };
  this.gemsMatches.run();

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

  this.points.flush();
  this.points.persist(Game.User.level + "_" + Game.User.sublevel);
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

/**
 * Converts absolute postion to relative one.
 * Includes position of the board and actual scale value.
 *
 * @this {Game.GemsBoard}
 * @params {number} posiion Position of the cursor
 * @params {string} cord Base on which coodinate
 */
Game.GemsBoard.prototype.convertToGemPosition = function(position, cord) {
  var p = (position - this[cord]) / Game.scaleValue;

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

