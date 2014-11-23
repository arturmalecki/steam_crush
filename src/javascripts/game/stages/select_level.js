Game.SelectLevel = {
  create: function() {
      var btnX = this.game.world.centerX - 75,
          easyBtn, mediumBtn, hardBtn, backBtn,
          menuItemAnimation = new Game.Animations.MenuItem(this.game, Game.Global.menuItemFadeDelay);

      Game.background(this.game);
      this.add.sprite(this.game.world.centerX - 88, 25, 'title');

      easyBtn = this.add.button(btnX, 100, 'easyBtn', this.goToEasyGame, this);
      menuItemAnimation.add(easyBtn);

      mediumBtn = this.add.button(btnX, 170, 'mediumBtn', this.goToMediumGame, this);
      menuItemAnimation.add(mediumBtn);

      hardBtn = this.add.button(btnX, 240, 'hardBtn', this.goToHardGame, this);
      menuItemAnimation.add(hardBtn);

      backBtn = this.add.button(btnX, 310, 'backBtn', Game.Actions.goToMainMenu, this);
      menuItemAnimation.add(backBtn);

      Game.addInfo(this.game);
  },
  render: function() {},
  update: function() {},
  goToEasyGame: function() {
    Game.level = 'easy';
    Game.scoreLevel = 10;
    Game.pairsToFind = 6;
    Game.tilesWidth = 150;
    Game.tilesHeight = 200;
    Game.Actions.goToGame.call(this);
  },
  goToMediumGame: function() {
    Game.level = 'medium';
    Game.scoreLevel = 10;
    Game.pairsToFind = 10;
    Game.tilesWidth = 200;
    Game.tilesHeight = 250;
    Game.Actions.goToGame.call(this);
  },
  goToHardGame: function() {
    Game.level = 'hard';
    Game.scoreLevel = 10;
    Game.pairsToFind = 21;
    Game.tilesWidth = 300;
    Game.tilesHeight = 350;
    Game.Actions.goToGame.call(this);
  }
}
