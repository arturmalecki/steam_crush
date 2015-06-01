Game.GemsBoardStates.Refill = function(board) {
  this.board = board;
};

Game.GemsBoardStates.Refill.prototype = {
  update: function() {
    console.log("refill");
    return this.board.states.drop;
  },

  entryAction: function() {
  },

  exitAction: function() {
  }
};

Game.GemsBoardStates.Refill.prototype.class = Game.GemsBoardStates.Refill;
