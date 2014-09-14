Game.Logic = function(game, gameBoard, tilesClick) {
  this.game = game;
  this.gameBoard = gameBoard;
  this.tilesClick = tilesClick;

  this.timeCheck;
}

Game.Logic.prototype.flipTile = function(tile) {
  this.gameBoard.flipTile(tile);
  this.tilesClick.addClick();
  if(this.tilesClick.isMaxed()) {
    this.timeCheck = this.game.time.now;
  }
}

Game.Logic.prototype.hitTiles = function() {
  this.gameBoard.clearFlippedTiles();
  this.tilesClick.reset();
  Game.Game.foundedPairs++;
  this.addScore();
}

Game.Logic.prototype.addScore = function() {
  Game.Game.score += (1 * Game.scoreLevel) * this.scoreMultiplier();
}

Game.Logic.prototype.scoreMultiplier = function() {
  var multiplier = 10 - parseInt(Game.Game.timeCounter / 5);
  if(multiplier > 0) {
    return multiplier;
  } else {
    return 1;
  }
}

Game.Logic.prototype.missTiles = function() {
  this.gameBoard.flipBackTiles();
  this.tilesClick.reset();
}

Game.Logic.prototype.run = function() {
  var tile;
  if(this.game.input.activePointer.isDown) {
    tile = this.gameBoard.getClickedTile();

    if(this.gameBoard.isTileNotFlipped(tile)) {
      if(this.tilesClick.isMaxed()) {
        if(this.gameBoard.isHitTheSameTiles()) {
          this.hitTiles();
        } else {
          this.missTiles();
        }
      }
      if(!this.tilesClick.isMaxed()) {
        this.flipTile(tile);
      }
    }
  }
  if(this.tilesClick.isMaxed()) {
    if(this.gameBoard.isHitTheSameTiles()) {
      this.hitTiles()
    } else {
      if(this.game.time.now - this.timeCheck > 1000) {
        this.missTiles();
      }
    }
  }
  if(Game.Game.foundedPairs >= Game.pairsToFind) {
    this.game.finishGame();
  }
}
