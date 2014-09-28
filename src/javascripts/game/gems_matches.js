Game.GemsMatches = function(board) {
  this.board = board;
  this.boardCols = board.cols;
  this.boardRows = board.rows;
  this.gemSize = board.gemSize;
  this.gemsFoundToCrush = false;
}

Game.GemsMatches.prototype.findAndMarkToCrush = function(gems) {
  var i, gem, x, y;

  for(i = 0; i < gems.length; i++) {
    this.countSameGems(gems[i], 'right', 1);
    this.countSameGems(gems[i], 'left', 1);
    this.countSameGems(gems[i], 'up', 1);
    this.countSameGems(gems[i], 'down', 1);
  }

  return this.gemsFoundToCrush;
}

Game.GemsMatches.prototype.countSameGems = function(gem, direction,  count) {
  var gemCol = gem.x / this.gemSize,
      nextGem,
      nextGemX = gem.x,
      nextGemY = gem.y,
      accumulateCount;
  
  switch(direction) {
    case 'right':
      nextGemX += this.gemSize;
      break;
    case 'left':
      nextGemX -= this.gemSize;
      break;
    case 'up':
      nextGemY += this.gemSize;
      break;
    case 'down':
      nextGemY -= this.gemSize;
      break;
  }

  nextGem = this.board.getGemByPos(nextGemX, nextGemY);

  if(nextGem && nextGem.frame === gem.frame) {
    accumulateCount = this.countSameGems(nextGem, direction, count + 1);
  } else {
    accumulateCount = count;
  }
  
  if(accumulateCount >= 3) {
    this.gemsFoundToCrush = true;
    gem.markToCrush();
  }

  return accumulateCount;
}

