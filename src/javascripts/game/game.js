Game.Game = {
  timeCounter: 0,
  score: 0,

  create: function() {
    var x = 8, y = 8;
    Game.Views.background(this.game);

    this.gameTopBar = new Game.Views.GameTopBar(this.game, this);
    this.time.events.loop(Phaser.Timer.SECOND, this.updateTimeText, this);

    this.itemsGroup = this.add.group();
    this.itemsGroup.x = (this.game.width / 2) - (x * Game.G.gemSizeWithSpacing / 2);
    this.itemsGroup.y = (this.game.height / 2) - (y * Game.G.gemSizeWithSpacing / 2);

    console.log(this.game.width);

    for(var i = 0; i < x; i++) {
      for(var j = 0; j < y; j++) {
        var a = this.itemsGroup.create(
            Game.G.gemSizeWithSpacing * j,
            Game.G.gemSizeWithSpacing * i,
            'tiles', Math.floor((Math.random() * 10) + 1)
            );
        a.scale.x = 1.5;
        a.scale.y = 1.5;
      }
    }


    Game.Views.footerInfo(this.game, {version: Game.version});
  },

  render: function() {
  },

  update: function() {
    if(!Game.G.paused) {
      game.physics.arcade.collide(this.itemsGroup);
      this.gameTopBar.updateScoreText(this.score)
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
