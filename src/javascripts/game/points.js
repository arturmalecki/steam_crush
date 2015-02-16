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
  },

  persist: function(level) {
    var base_key    = "level_" + level,
        current_key = base_key + "_current",
        max_key     = base_key + "_max",
        max_value   = localStorage.getItem(max_key);

    localStorage.setItem(current_key, this.points);
    if(max_value === null) {
      localStorage.setItem(max_key, this.points);
    } else if(parseInt(this.points) > parseInt(max_value)) {
      localStorage.setItem(max_key, this.points);
    }
  }
}
