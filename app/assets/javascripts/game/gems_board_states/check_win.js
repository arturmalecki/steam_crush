Game.GemsBoardStates.CheckWin = function(board) {
  this.board = board;
};

Game.GemsBoardStates.CheckWin.prototype = {
  update: function() {
    console.log("Check Win");
    return this.board.states.clear_state;
  },

  entryAction: function() {
  },

  exitAction: function() {
  }
};

Game.GemsBoardStates.CheckWin.prototype.class = Game.GemsBoardStates.CheckWin;
