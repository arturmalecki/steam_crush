Game.GemsCrusher = function(board) {
  this.board = board;
}

Game.GemsCrusher.prototype = {
  run: function() {
    var self = this,
        gems = this.board.gemsMatches.matches;

    gems.forEach(function(gem) {
      gem.loadTexture('explosion', 0);
      gem.destroying = true;
      gem.animations.add('explosion');
      gem.animations.play('explosion', 10, false, true);
    });
  }
}

