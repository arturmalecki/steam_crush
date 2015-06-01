Game.GemsBoardStates.Idle = function(board) {
  this.board = board;
};

Game.GemsBoardStates.Idle.prototype = {
  update: function() {
    //console.log("Idle");
  },

  entryAction: function() {
  },

  exitAction: function() {
  }
};

Game.GemsBoardStates.Idle.prototype.class = Game.GemsBoardStates.Idle;
