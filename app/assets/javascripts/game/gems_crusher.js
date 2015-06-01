Game.GemsCrusher = function(board) {
  this.board = board;
  this.crushCounter = 0;
}

Game.GemsCrusher.prototype = {
  run: function() {
    var self = this,
        gems = this.board.gemsMatches.matches;

    this.crushCounter = 0;
    gems.forEach(function(gem) {
      self.crushCounter++;
      var animation = gem.animations.add('explosion', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

      gem.loadTexture('explosion', 0);
      gem.destroying = true;

      animation.onComplete.add(function() {
        self.crushCounter--;
        if(self.crushCounter === 0) {
          self.board.setStateTo('refill');
        }
      }, self);
      animation.play(20, false, true);
    });
  },
}

