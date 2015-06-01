Game.GemsBoardStates.ProcessAction = function(board) {
  this.board = board;
};

Game.GemsBoardStates.ProcessAction.prototype = {
  update: function() {
    console.log("ProcessAction");
  },

  entryAction: function() {
  },

  exitAction: function() {
  }
};

Game.GemsBoardStates.ProcessAction.prototype.class = Game.GemsBoardStates.ProcessAction;
