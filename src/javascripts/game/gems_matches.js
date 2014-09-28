Game.GemsMatches = function(board) {
  this.board = board;
  this.boardCols = board.cols;
  this.boardRows = board.rows;
  this.gemSize = board.gemSize;
  this.gemsFoundToCrush = false;
}

Game.GemsMatches.prototype.findAndMarkToCrush = function(gems) {
  var i, gem, x, y;

  this.gemsFoundToCrush = false;

  for(i = 0; i < gems.length; i++) {
    this.countSameGems(gems[i], 'horizontal');
    this.countSameGems(gems[i], 'vertical');
  }

  return this.gemsFoundToCrush;
}

Game.GemsMatches.prototype.countSameGems = function(gem, direction) {
  var gemToCheck, i, colsOrRows;

  if(direction === 'horizontal') {
    colsOrRows = this.board.cols;
  } else if(direction === 'vertical') {
    colsOrRows = this.board.rows;
  }

  for(i = 0; i < colsOrRows; i++) {
    if(direction === 'horizontal') {
      gemToCheck = this.board.getGemByPos(i * this.gemSize, gem.y);
    } else if(direction === 'vertical') {
      gemToCheck = this.board.getGemByPos(gem.x, i * this.gemSize);
    }
    this.findAndMarkToCrush(gemToCheck, gem.frame, direction, 0);
  }
}

Game.GemsMatches.prototype.findAndMarkToCrush = function(gem, frame, direction, count) {
  var nextGem,
      nextGemX,
      nextGemY,
      accumulateCount;

  if(!gem) { return count; }
  if(gem.frame !== frame) { return count; }

  nextGemX = gem.x;
  nextGemY = gem.y;

  if(direction === 'horizontal') {
    nextGemX += this.gemSize;
  } else if(direction === 'vertical') {
    nextGemY += this.gemSize;
  }

  nextGem = this.board.getGemByPos(nextGemX, nextGemY);

  accumulateCount = this.findAndMarkToCrush(nextGem, frame, direction, count + 1);
  
  if(accumulateCount >= 3) {
    this.gemsFoundToCrush = true;
    gem.markToCrush();
  }

  return accumulateCount;
}

