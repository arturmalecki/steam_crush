Game.EndGame = {
  create: function() {
    var centerX = this.world.centerX,
        menuItemAnimation = new Game.Animations.MenuItem(this.game, Game.Global.menuItemFadeDelay),
        playBtn, menuBtn;

    Game.background(this.game);

    timeText = this.add.image(this.game.world.centerX - 77, 25, "scoreText");

    scoreText = this.add.text(0, 100, "" + this.score, { font: "40px Arial", fill: "#f6b020"});
    scoreText.x = centerX - scoreText.width / 2;

    playBtn = this.add.button(centerX - 75, 180, 'playBtn', Game.Actions.goToGame, this);
    menuItemAnimation.add(playBtn);

    menuBtn = this.add.button(centerX - 75, 270, 'menuBtn', Game.Actions.goToMainMenu, this);
    menuItemAnimation.add(menuBtn);

    Game.addInfo(this.game);
  },
  update: function() {
  
  }
}
