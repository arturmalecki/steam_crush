Game.GemsMatches = function(board) {
  this.board = board;
  this.gemsToKill = 0;
  this.matches = [];
}

Game.GemsMatches.prototype.hasMatches = function() {
  this.run();
  return this.matches.length > 0;
}

Game.GemsMatches.prototype.run = function() {
  var x, y, gem;

  this.matches = [];

  for(x = 0; x < this.board.cols; x++) {
    for(y = 0; y < this.board.rows; y++) {
      this.findMatchesFor(this.board.getGemFrame(x, y), x, y);
    }
  }
}

Game.GemsMatches.prototype.findMatchesFor = function(gemFrame, gemX, gemY) {
  var countUp = this.countSameGems(gemFrame, gemX, gemY, 0, -1),
      countDown = this.countSameGems(gemFrame, gemX, gemY, 0, 1),
      countLeft = this.countSameGems(gemFrame, gemX, gemY, -1, 0),
      countRight = this.countSameGems(gemFrame, gemX, gemY, 1, 0),
      countHorizontal = countLeft + 1 + countRight,
      countVertical = countUp + 1 + countDown;


  if(countHorizontal >= 3) {
    this.addRangeMatches(gemX - countLeft, gemY, gemX + countRight, gemY);
  }

  if(countVertical >= 3) {
    this.addRangeMatches(gemX, gemY - countUp, gemX, gemY + countDown);
  }
}

Game.GemsMatches.prototype.countSameGems = function(gemFrame, gemX, gemY, moveX, moveY) {
  var x = gemX + moveX,
      y = gemY + moveY,
      count = 0;

  while(gemFrame && x < this.board.cols && x >= 0 && y < this.board.rows && y >= 0 && this.board.getGemFrame(x, y) === gemFrame) {
    count += 1;
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
      if(gem && this.matches.filter(function(g) { return g.id === gem.id }).length === 0) {
        this.matches.push(gem);
      }
    }
  }
}

