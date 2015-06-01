Game.GemsBoardStates.Drop = function(board) {
  this.board = board;
};

Game.GemsBoardStates.Drop.prototype = {
  update: function() {
    console.log("Drop");
    return this.board.states.find_pairs;
  },

  entryAction: function() {
  },

  exitAction: function() {
  }
};

Game.GemsBoardStates.Drop.prototype.class = Game.GemsBoardStates.Drop;
