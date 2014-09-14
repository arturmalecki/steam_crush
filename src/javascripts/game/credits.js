Game.Credits = {
  create: function() {
      var btnX = this.game.world.centerX - 75,
      menuItemAnimation = new Game.Animations.MenuItem(this.game, Game.Global.menuItemFadeDelay),
      exitBtn;

      Game.background(this.game);

      this.game.add.text(20, 40, 'Created by:', { font: "32px Arial", fill: "#fff" });
      this.game.add.text(20, 100, 'Michal Kostecki', { font: "32px Arial", fill: "#fff" });
      this.game.add.text(20, 160, 'Artur Malecki', { font: "32px Arial", fill: "#fff" });

      exitBtn = this.add.button(btnX, this.game.world.height - 120, 'backBtn', Game.Actions.goToMainMenu, this);
      menuItemAnimation.add(exitBtn);

      Game.addInfo(this.game);
  }
}
