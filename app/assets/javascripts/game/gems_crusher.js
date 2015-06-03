Game.GemsCrusher = function(board) {
  this.board = board;
  this.crushCounter = 0;
}

Game.GemsCrusher.prototype = {
  run: function(gems) {
    var self = this,
        crushCounterTemHash = {};

    gems.forEach(function(gem) {
      if(!crushCounterTemHash[gem.id]) {
        self.crushCounter += 1;
        crushCounterTemHash[gem.id] = true;
      }
    });
    gems.forEach(function(gem) {
      var animation = gem.animations.add('explosion', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

      gem.loadTexture('explosion', 0);
      gem.destroying = true;

      animation.onComplete.add(function() {
        self.crushCounter--;
        self.board.deadGemsGroup.add(arguments[0]);
        if(self.crushCounter === 0) {
          self.board.setStateTo('refill');
        }
      }, self);
      animation.play(20, false);
    });
  },
}

