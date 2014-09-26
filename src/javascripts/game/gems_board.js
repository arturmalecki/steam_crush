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
  this.gemsSwipe   = new Game.GemsSwipe(),

  this.populate();
}

Game.GemsBoard.prototype = Object.create(Phaser.Group.prototype);
Game.GemsBoard.prototype.constructor = Game.GemsBoard;

Game.GemsBoard.prototype.populate = function() {
  var gem, i, j;

  for(i = 0; i < this.cols; i++) {
    for(j = 0; j < this.rows; j++) {
      gem = new Game.Gem(this.game, this.gemSize * j, this.gemSize * i, 'tiles', Math.floor((Math.random() * 10) + 1))
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

Game.GemsBoard.prototype.clearSelectedGem = function() {
  if(this.selectedGem) {
    this.selectedGem.angle = 0;
  }
  this.selectedGem = undefined;
}

Game.GemsBoard.prototype.revertSwipe = function() {
  this.gemsSwipe.revert();
  this.swiping = false;
  this.clearSelectedGem();
}

Game.GemsBoard.prototype.swipe = function(cursorX, cursorY) {
  var cursorGemPosX = this.convertToGemPosition(cursorX, 'x'),
      cursorGemPosY = this.convertToGemPosition(cursorY, 'y'),
      gemToSwipe    = this.getGemByPos(cursorGemPosX, cursorGemPosY);

  if(this.gemsSwipe.proceed(this, gemToSwipe)) {
    this.swiping = true;
    this.game.time.events.add(300, this.revertSwipe , this);
  } 
}
