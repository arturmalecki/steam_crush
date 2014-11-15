Game.Game = {
  timeCounter: 0,
  score: 0,

  create: function() {
    var cols = 8, rows = 8;

    Game.Views.background(this.game);
    this.time.events.loop(Phaser.Timer.SECOND, this.updateTimeText, this);

    this.gameTopBar = new Game.Views.GameTopBar(this.game, this);
    this.gemsBoard = new Game.GemsBoard(this.game, cols, rows, Game.G.gemSizeWithSpacing);

    Game.Views.footerInfo(this.game, {version: Game.version});
  },

  update: function() {
    if(!Game.G.paused) {
      this.gameTopBar.updateScoreText(this.score);
      this.gemsBoard.update();
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

  finishGame: function() {
    Game.paused = false;
    this.timeCounter = 0;
    Game.EndGame.score = this.score;
    this.score = 0;
    this.game.state.start('EndGame');
  }
}
