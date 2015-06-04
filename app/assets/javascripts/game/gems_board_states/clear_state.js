Game.GemsBoardStates.ClearState = function(board) {
  this.board = board;
};

Game.GemsBoardStates.ClearState.prototype = {
  update: function() {
    console.log("Clear State");
    this.board.clearSelectedGem();
    this.board.points.flush();
    this.board.points.persist(Game.User.level + "_" + Game.User.sublevel);
    return this.board.states.idle;
  },

  entryAction: function() {
  },

  exitAction: function() {
  }
};

Game.GemsBoardStates.ClearState.prototype.class = Game.GemsBoardStates.ClearState;
