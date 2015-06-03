Game.GemsBoardStates.ProcessAction = function(board) {
  this.board = board;
  this.swiping = false
};

Game.GemsBoardStates.ProcessAction.prototype = {
  update: function() {
    var gem1 = this.board.selectedGem,
        gem2 = this.board.selectedGem2;

    if(!this.swiping) {
      console.log("ProcessAction");
      if(this.board.gemsSwipe.isSwipePossible(gem1, gem2)) {
        this.swiping = true;
        this.board.gemsSwipe.swipe(gem1, gem2);
      } else {
        this.board.clearSelectedGem();
        return this.board.states.idle;
      }
    }
  },

  entryAction: function() {
    this.swiping = false
  },

  exitAction: function() {
    this.swiping = false
  }
};

Game.GemsBoardStates.ProcessAction.prototype.class = Game.GemsBoardStates.ProcessAction;
