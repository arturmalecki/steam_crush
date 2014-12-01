Game.SelectLevel = {
  create: function() {
      var title, self = this;
          //menuItemAnimation = new Game.Animations.MenuItem(this.game, Game.Global.menuItemFadeDelay);

      //Game.background(this.game);
      //this.add.sprite(this.game.world.centerX - 88, 25, 'title');
      
      title = new Phaser.Text(this.game, 50, 50, "Select level:", {font: '66px Arial', fill: '#ffffff'});
      this.game.add.existing(title);

      Game.Levels.active.forEach(function(level, index) {
        var btnX = (index * 200) + 50,
            btnY = 200,
            btn;
        btn = new LabelButton(this.game, btnX, btnY, 'selectLevelBg', level, self.selectLevel, self);
        btn.level = level;
        self.game.add.existing(btn);
      });
      //menuItemAnimation.add(easyBtn);

      //mediumBtn = this.add.button(btnX, 170, 'mediumBtn', this.goToMediumGame, this);
      //menuItemAnimation.add(mediumBtn);

      //hardBtn = this.add.button(btnX, 240, 'hardBtn', this.goToHardGame, this);
      //menuItemAnimation.add(hardBtn);

      //backBtn = this.add.button(btnX, 310, 'backBtn', Game.Actions.goToMainMenu, this);
      //menuItemAnimation.add(backBtn);

      //Game.addInfo(this.game);
  },
  render: function() {},

  update: function() {},

  selectLevel: function() {
    Game.User.level = arguments[0].level;
    this.state.start('Game');
  }
}
