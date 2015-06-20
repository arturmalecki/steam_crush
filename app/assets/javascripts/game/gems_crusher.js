Game.GemsCrusher = function(board) {
  this.board = board;
}

Game.GemsCrusher.prototype = {
  run: function(setOfHits) {
    var self = this,
        crushCounterHash = {},
        index;

    setOfHits.forEach(function(gems) {
      if(gems.length >= 4) {
        index = Math.ceil((gems.length - 2)/2);
        gems[index].createBomb();
        gems[index] = undefined;
      }
      gems.forEach(function(gem) {
        var animation;
        
        if(gem) {
          animation = gem.animations.add('explosion', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

          gem.loadTexture('explosion', 0);
          gem.destroying = true;

          animation.onComplete.add(function() {
            self.board.deadGemsGroup.add(arguments[0]);
            self.board.runRefill = true;
          }, self);
          animation.play(20, false);
        }
      });
    });
    self.board.setStateTo('idle');
  }
}

