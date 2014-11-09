Game.GemsCrusher = function(board) {
  this.board = board;
  this.gemsToKill = 0;
}

Game.GemsCrusher.prototype = {
  run: function() {
    var self = this,
        gemsMatches = new Game.GemsMatches(this.board),
        gems;

    gemsMatches.run();
    gems = gemsMatches.matches;
 
    this.gemsToKill = gems.length;
    gems.forEach(function(gem) {
      gem.loadTexture('explosion', 0);
      gem.animations.add('explosion');
      gem.animations.play('explosion', 30, false);
      gem.events.onAnimationComplete.add(self.destroyGem, self);
    });
  },

  destroyGem: function(gem) {
    var x, y, gem, destroyed = false;
    this.gemsToKill -= 1;
    gem.kill();
    if(this.gemsToKill <= 0) {
      this.gemsToKill = 0;
      //delete all
      //this.board.gemsDrop.run();
    }
  }
}

