Game.GemsBoardStates.FindPairs = function(board) {
  this.board = board;
  this.destroyed = false;
};

Game.GemsBoardStates.FindPairs.prototype = {
  update: function() {
    var gemsMatches = this.board.gemsMatches;

    if(!this.destroyed) {
      this.destroyed = true;
      console.log('destroy');
      gemsMatches.run();
      if(gemsMatches.matches.length === 0) {
        return this.board.states.check_win;
      } else {
        this.board.gemsCrusher.run();
      }
    }
  },

  entryAction: function() {
  },

  exitAction: function() {
    this.destroyed = false;
  }
};

Game.GemsBoardStates.FindPairs.prototype.class = Game.GemsBoardStates.FindPairs;
