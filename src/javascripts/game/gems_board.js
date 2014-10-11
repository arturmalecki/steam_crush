Game.GemsBoard = function(game, cols, rows, gemSize) {
  Phaser.Group.call(this, game);

  this.game           = game;
  this.cols           = cols;
  this.rows           = rows;
  this.gemSize        = gemSize;
  this.x              = (game.width / 2) - (this.cols * gemSize / 2);
  this.y              = (game.height / 2) - (this.rows * gemSize / 2);
  this.selectedGem    = undefined;
  this.gemsMatches    = new Game.GemsMatches(this);
  this.gemsSwipe      = new Game.GemsSwipe(this);
  this.gemsDrop       = new Game.GemsDrop(this);
  this.swipingBlocked = false;

  this.populate();
}

Game.GemsBoard.prototype = Object.create(Phaser.Group.prototype);
Game.GemsBoard.prototype.constructor = Game.GemsBoard;

Game.GemsBoard.prototype.populate = function() {
  var gem, i, j, randomGem, debugBoard = [];

  for(i = 0; i < this.cols; i++) {
    debugBoard.push([]);
    for(j = 0; j < this.rows; j++) {
      randomGem = Math.floor((Math.random() * 3) + 1);
      debugBoard[i].push(randomGem);
      gem = new Game.Gem(this.game, this.gemSize * i, this.gemSize * j, 'tiles', randomGem);
      gem.events.onInputDown.add(this.selectGem, this);
      this.add(gem);
    }
  }
  console.log(debugBoard.toString().split(','));
}

Game.GemsBoard.prototype.selectGem = function(gem) {
  if(!this.swipingBlocked) {
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

Game.GemsBoard.prototype.swipe = function(cursorX, cursorY) {
  var cursorGemPosX = this.convertToGemPosition(cursorX, 'x'),
      cursorGemPosY = this.convertToGemPosition(cursorY, 'y'),
      gemToSwipe    = this.getGemByPos(cursorGemPosX, cursorGemPosY),
      gemsToCheck   = [this.selectedGem, gemToSwipe];

  if(!this.swipingBlocked) {
    this.gemsSwipe.proceed(gemToSwipe);
  }

  //if(this.gemsSwipe.isDone()) {
  //  this.gemsMatches.seekAndCrush();
  //}

  //if(this.gemsSwipe.proceed(this, gemToSwipe)) {
    //if(this.gemsMatches.seekAndCrush()) {
      //this.refillBoard();
      //this.gemsDrop.run();
      //this.finishSwipe();
    //} else {
      //this.game.time.events.add(300, this.revertSwipe , this);
    //}
  //} 
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

Game.GemsBoard.prototype.allowSwiping = function() {
  this.swipingBlocked = false;  
  this.clearSelectedGem();
}
