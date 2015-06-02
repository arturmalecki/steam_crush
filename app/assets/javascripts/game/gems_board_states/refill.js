Game.GemsBoardStates.Refill = function(board) {
  this.board = board;
};

Game.GemsBoardStates.Refill.prototype = {
  update: function() {
    console.log("refill");
    this.board.gemsDrop.refillBoard();
    return this.board.states.drop;
  },

  entryAction: function() {
    var level = this.board.level;
  },

  exitAction: function() {
  }
};

Game.GemsBoardStates.Refill.prototype.class = Game.GemsBoardStates.Refill;
