Game.MainMenu = {
  create: function() {
      var btnX = this.game.world.centerX - 75,
          menuItemAnimation = new Game.Animations.MenuItem(this.game, Game.Global.menuItemFadeDelay),
          playBtn, creditsBtn;

      Game.background(this.game);
      this.add.sprite(this.game.world.centerX - 88, 25, 'title');
      this.add.sprite(this.game.world.centerX - 59, 100, 'logo');
      this.add.sprite(this.game.world.centerX - 129, 250, 'subtitle');

      playBtn = this.add.button(this.game.world.centerX - 72, 320, 'playBtn', Game.Actions.goToSelectLevel, this);
      menuItemAnimation.add(playBtn);

      // creditsBtn = this.add.button(this.game.world.centerX - 40, 380, 'creditsBtn', Game.Actions.goToCredits, this);
      // menuItemAnimation.add(creditsBtn);

      Game.addInfo(this.game);
  },
  render: function() {},
  update: function() {}
}
