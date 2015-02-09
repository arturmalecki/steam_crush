Game.Points = function(board) {
  this.board = board;
  this.tmpPoints = 0;
  this.points = 0
}

Game.Points.prototype = {
  add: function(size) {
    if(size >= 3) {
      this.tmpPoints += size * 1
    }
    if(size >= 4) {
      this.tmpPoints += 100;
    }
  },

  flush: function() {
    this.points += this.tmpPoints;
    this.tmpPoints = 0;
  }
}
