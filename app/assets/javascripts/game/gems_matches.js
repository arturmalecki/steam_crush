Game.GemsMatches = function(board) {
  this.board = board;
  this.matches = [];
}

Game.GemsMatches.prototype.fetch = function() {
  var level = this.board.level,
      x, y, gem;

  this.checkTable = [];
  this.matches = [];

  for(x = 0; x < level.xSize; x++) {
    this.checkTable[x] = [];
    for(y = 0; y < level.ySize; y++) {
      this.checkTable[x][y] = {};
    }
  }

  var currentFrame, hits = [], currentHorizontalFrame, horizontalHits = [];

  for(x = 0; x < level.xSize; x++) {
    currentFrame = undefined;
    hits = [];
    for(y = 0; y < level.ySize; y++) {
      gem = this.board.getGem(x, y);
      if(currentFrame === undefined) {
        currentFrame = gem.frame;
        hits.push(gem);
      } else if(currentFrame !== gem.frame) {
        currentFrame = gem.frame;
        this.pareseHits(hits);
        hits = [gem];
      } else {
        hits.push(gem);
      }

      if(y === level.ySize - 1) {
        this.pareseHits(hits);
      }
    }
  }
  for(y = 0; y < level.ySize; y++) {
    currentFrame = undefined;
    hits = [];
    for(x = 0; x < level.xSize; x++) {
      gem = this.board.getGem(x, y);
      if(currentFrame === undefined) {
        currentFrame = gem.frame;
        hits.push(gem);
      } else if(currentFrame !== gem.frame) {
        currentFrame = gem.frame;
        this.pareseHits(hits);
        hits = [gem];
      } else {
        hits.push(gem);
      }

      if(x === level.xSize - 1) {
        this.pareseHits(hits);
      }
    }
  }

  return this.matches;
}

Game.GemsMatches.prototype.pareseHits = function(hits) {
  var self = this;
  if(hits.length >= 3) {
    this.matches.push(hits);
    hits.forEach(function(hit) {
      if(hit.isBomb()) {
        self.activateBomb(hit);
      }
    });
  }
}

Game.GemsMatches.prototype.activateBomb = function(hits) {
  console.log('bomb');
}

