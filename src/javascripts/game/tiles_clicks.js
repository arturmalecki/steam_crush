Game.TilesClicks = function() {
    this.counter = 0;
}

Game.TilesClicks.prototype.addClick = function() {
    this.counter++;
}

Game.TilesClicks.prototype.isMaxed = function() {
    if(this.counter >= 2) {
        return true;
    } else {
        return false;
    }
}

Game.TilesClicks.prototype.reset = function() {
    this.counter = 0;
}
