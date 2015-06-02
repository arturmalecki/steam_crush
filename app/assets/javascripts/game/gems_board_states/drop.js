Game.GemsBoardStates.Drop = function(board) {
  this.board = board;
  this.dropping = false;
};

Game.GemsBoardStates.Drop.prototype = {
  update: function() {
    if(this.dropping === false) {
      this.dropping = true;
      console.log("Drop");
      this.board.gemsDrop.run();
    }
  },

  entryAction: function() {
  },

  exitAction: function() {
    this.dropping = false;
  }
};

Game.GemsBoardStates.Drop.prototype.class = Game.GemsBoardStates.Drop;
