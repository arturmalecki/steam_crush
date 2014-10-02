Game.GemsBoard = function(game, cols, rows, gemSize) {
  Phaser.Group.call(this, game);

  this.game        = game;
  this.cols        = cols;
  this.rows        = rows;
  this.gemSize     = gemSize;
  this.x           = (game.width / 2) - (this.cols * gemSize / 2);
  this.y           = (game.height / 2) - (this.rows * gemSize / 2);
  this.selectedGem = undefined;
  this.swiping     = false;
  this.gemsSwipe   = new Game.GemsSwipe();
  this.gemsMatches = new Game.GemsMatches(this);
  this.gemsDrop    = new Game.GemsDrop(this);

  this.populate();
}

Game.GemsBoard.prototype = Object.create(Phaser.Group.prototype);
Game.GemsBoard.prototype.constructor = Game.GemsBoard;

Game.GemsBoard.prototype.populate = function() {
  var gem, i, j;

  for(i = 0; i < this.cols; i++) {
    for(j = 0; j < this.rows; j++) {
      gem = new Game.Gem(this.game, this.gemSize * i, this.gemSize * j, 'tiles', Math.floor((Math.random() * 5) + 1))
      gem.events.onInputDown.add(this.selectGem, this)
      this.add(gem);
    }
  }
}

Game.GemsBoard.prototype.selectGem = function(gem) {
  if(!this.swiping) {
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

Game.GemsBoard.prototype.revertSwipe = function() {
  this.gemsSwipe.revert();
  this.finishSwipe();
}

Game.GemsBoard.prototype.finishSwipe = function() {
  this.swiping = false;
  this.clearSelectedGem();
}

Game.GemsBoard.prototype.swipe = function(cursorX, cursorY) {
  var cursorGemPosX = this.convertToGemPosition(cursorX, 'x'),
      cursorGemPosY = this.convertToGemPosition(cursorY, 'y'),
      gemToSwipe    = this.getGemByPos(cursorGemPosX, cursorGemPosY),
      gemsToCheck   = [this.selectedGem, gemToSwipe];

  if(!this.swiping && this.gemsSwipe.proceed(this, gemToSwipe)) {
    this.swiping = true;
    if(this.gemsMatches.seekAndCrush()) {
      //this.refillBoard();
      //this.gemsDrop.run();
      this.finishSwipe();
    } else {
      this.game.time.events.add(300, this.revertSwipe , this);
    }
  } 
}

Game.GemsBoard.prototype.refillBoard = function() {
  var x, y, gem, gemX, gemY;

  for(x = 0; x < this.cols; x++) {
    for(y = 0; y < this.rows; y++) {
      gem = this.getGemByPos(x * this.gemSize, y * this.gemSize);
      if(!gem) {
        gemX = x;
        gemY = -1;
        while(this.getGemByPos(gemX * this.gemSize, gemY * this.gemSize)) {
          gemY -= 1;
        }
        gem = new Game.Gem(this.game, gemX * this.gemSize, gemY * this.gemSize, 'tiles', Math.floor((Math.random() * 10) + 1))
        gem.events.onInputDown.add(this.selectGem, this)
        this.add(gem);
      }
    }
  }
}

