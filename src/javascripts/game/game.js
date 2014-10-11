Game.Game = {
  timeCounter: 0,
  score: 0,

  create: function() {
    var cols = 8, rows = 8;

    Game.Views.background(this.game);
    this.time.events.loop(Phaser.Timer.SECOND, this.updateTimeText, this);

    this.gameTopBar = new Game.Views.GameTopBar(this.game, this);
    this.gemsBorad = new Game.GemsBoard(this.game, cols, rows, Game.G.gemSizeWithSpacing);

    Game.Views.footerInfo(this.game, {version: Game.version});
  },

  update: function() {
    if(!Game.G.paused) {
      this.gameTopBar.updateScoreText(this.score);

      this.gemsBorad.swipe(this.game.input.activePointer.x, this.game.input.activePointer.y);
      if(this.game.input.activePointer.justReleased()) {
        this.gemsBorad.clearSelectedGem();
      }
    }
  },

  pauseGame: function(){
    Game.G.paused = true;
  },

  unpauseGame: function(){
    Game.G.paused = false;
  },
  
  updateTimeText: function() {
    this.timeCounter++;
    this.gameTopBar.updateTimeText(this.timeCounter)
  },

  render: function() {
    this.game.debug.text("Gem selected: " + !!this.gemsBorad.selectedGem, 10, 70);
    if(this.gemsBorad.selectedGem) {
      this.game.debug.text("x: " + this.gemsBorad.selectedGem.x + "  y: " + this.gemsBorad.selectedGem.y, 200, 70);
    }
    this.game.debug.text("Pointer postion x: " + this.game.input.activePointer.x + "  y: " + this.game.input.activePointer.y, 10, 82);
  },

  finishGame: function() {
    Game.paused = false;
    this.timeCounter = 0;
    Game.EndGame.score = this.score;
    this.score = 0;
    this.game.state.start('EndGame');
  }
}
