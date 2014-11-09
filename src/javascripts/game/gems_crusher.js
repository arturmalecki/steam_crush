Game.GemsCrusher = function(board) {
  this.board = board;
}

Game.GemsCrusher.prototype = {
  run: function() {
    var self = this,
        gemsMatches = new Game.GemsMatches(this.board),
        gems;

    gemsMatches.run();
    gems = gemsMatches.matches;
 
    gems.forEach(function(gem) {
      gem.loadTexture('explosion', 0);
      gem.animations.add('explosion');
      gem.animations.play('explosion', 30, false, true);
    });
  }
}

