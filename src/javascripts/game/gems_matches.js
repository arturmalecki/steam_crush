Game.GemsMatches = function(board) {
  this.board = board;
  this.gemsToKill = 0;
  this.matches = [];
  this.boardChecked = [];
}

Game.GemsMatches.prototype.hasMatches = function() {
  return this.matches.length > 0;
}

Game.GemsMatches.prototype.run = function() {
  var level = this.board.level,
      x, y, gem, frame;

  this.matches = [];
  this.boardChecked = [];

  for(x = 0; x < level.xSize; x++) {
    this.boardChecked[x] = new Array(level.ySize);
  }

  for(x = 0; x < level.xSize; x++) {
    for(y = 0; y < level.ySize; y++) {
      if(this.boardChecked[x][y] !== 1) {
        this.findMatchesFor(this.board.getGemFrame(x, y), x, y);
      }
    }
  }
}

Game.GemsMatches.prototype.findMatchesFor = function(gemFrame, gemX, gemY) {
  var countDown = this.countSameGems(gemFrame, gemX, gemY, 0, 1),
      countRight = this.countSameGems(gemFrame, gemX, gemY, 1, 0);

  if(countRight >= 3) {
    this.addRangeMatches(gemX, gemY, (gemX + countRight) - 1, gemY);
  }

  if(countDown >= 3) {
    this.addRangeMatches(gemX, gemY, gemX, (gemY + countDown) - 1);
  }

  this.board.points.add(countRight); 
  this.board.points.add(countDown); 
}

Game.GemsMatches.prototype.countSameGems = function(gemFrame, gemX, gemY, moveX, moveY) {
  var x = gemX,
      y = gemY,
      count = 0,
      level = this.board.level;

  this.boardChecked[x][y] = 1

  while(gemFrame && x < level.xSize && x >= 0 && y < level.ySize && y >= 0 && this.board.getGemFrame(x, y) === gemFrame) {
    count += 1;
    this.boardChecked[x][y] = 1
    x += moveX;
    y += moveY;
  }
  
  return count;
}

Game.GemsMatches.prototype.addRangeMatches = function(x1, y1, x2, y2) {
  var x, y, gem, self = this;
  for(x = x1; x <= x2; x++) {
    for(y = y1; y <= y2; y++) {
      gem = this.board.getGem(x, y);
      this.matches.push(gem);
    }
  }
}

