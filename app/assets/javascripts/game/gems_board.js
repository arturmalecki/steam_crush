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
  this.deadGemsGroup   = game.add.group();
  this.deadGemsGroup.x = -1000;
  this.deadGemsGroup.y = -1000;

  this.populate();

  this.scale = new Phaser.Point(Game.scaleValue, Game.scaleValue);
  this.x     = (game.width / 2) - (this.width / 2);
  this.y     = 100;
  this.states = {
    find_pairs: new Game.GemsBoardStates.FindPairs(this),
    check_win: new Game.GemsBoardStates.CheckWin(this),
    clear_state: new Game.GemsBoardStates.ClearState(this),
    idle: new Game.GemsBoardStates.Idle(this),
    process_action: new Game.GemsBoardStates.ProcessAction(this),
    refill: new Game.GemsBoardStates.Refill(this),
    drop: new Game.GemsBoardStates.Drop(this)
  }
  this.state = this.states.find_pairs;
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

  var testBoard = [
    [1, 1, 1, 3, 2],
    [1, 3, 2, 2, 3],
    [1, 3, 1, 3, 2],
    [1, 5, 4, 2, 3],
    [3, 1, 5, 1, 2],
    [2, 3, 3, 2, 3],
    [1, 2, 3, 1, 2]
  ];

  this.eachGem(function(x, y) {
    randomGem = Math.floor((Math.random() * self.level.numberOfTiles) + 1);
    randomGem = testBoard[y][x];
    gem = new Game.Gem(this.game, this.gemSize * x, this.gemSize * y, 'elements', randomGem);
    gem.events.onInputDown.add(this.selectGem, this);
    this.add(gem);
  }, this);
}

Game.GemsBoard.prototype.setStateTo = function(state) {
  this.state.exitAction();
  this.state = this.states[state];
  this.state.entryAction();
}

Game.GemsBoard.prototype.update = function() {
  var state = this.state.update();

  if(!!state) {
    this.state.exitAction();
    this.state = state;
    this.state.entryAction();
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
  console.log("Clicked: ", gem.id);
  if(this.state instanceof Game.GemsBoardStates.Idle) {
    if(!!this.selectedGem) {
      this.selectedGem2 = gem;
      this.setStateTo('process_action');
    } else {
      this.selectedGem = gem;
      this.selectedGem.angle = 10;
    }
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
  this.selectedGem2 = undefined;
}

