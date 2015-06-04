Game.GemsBoardStates.Idle = function(board) {
  this.board = board;
};

Game.GemsBoardStates.Idle.prototype = {
  update: function() {
    var pointer = this.board.game.input.activePointer;
    if(pointer.isDown) {
      if(!!this.board.selectedGem && !this.board.selectedGem2) {
        var gemPosX = this.board.convertToGemPosition(pointer.x, 'x'),
            gemPosY = this.board.convertToGemPosition(pointer.y, 'y'),
            gem = this.board.getGemByPos(gemPosX, gemPosY);

        if(gem.id !== this.board.selectedGem.id) {
          this.board.selectedGem2 = gem;
          this.board.setStateTo('process_action');
        }
      }
    }
  },

  entryAction: function() {
  },

  exitAction: function() {
  }
};

Game.GemsBoardStates.Idle.prototype.class = Game.GemsBoardStates.Idle;
