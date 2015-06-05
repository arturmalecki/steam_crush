Game.SelectLevel = {
  create: function() {
      var title, self = this, group, btnY, bg;

      Game.Views.default(this.game);

      bg = this.game.add.image(0, 0, 'homeBg');

      group = this.game.add.group();

      Game.Levels.active.forEach(function(level, index) {
        var btnX = 0,
            btn;

        btnY = 0 + (index * 200),
        btn = new LabelButton(this.game, btnX, btnY, 'selectLevelBg', level, self.selectLevel, self);
        btn.level = level;
        group.add(btn);
      });
      
      group.add(new LabelButton(this.game, 0, btnY + 200, 'selectLevelBg', 'Back', this.back, this));
      group.scale = new Phaser.Point(Game.scaleValue, Game.scaleValue);
      group.position = new PIXI.Point((this.game.width / 2) - (group.width / 2) , 50);

      bg.scale = new Phaser.Point(Game.scaleValue, Game.scaleValue);
      bg.x = -(bg.width / 2 - this.game.width / 2);
      bg.y = -(bg.height / 2 - this.game.height / 2);
  },
  render: function() {},

  update: function() {},

  selectLevel: function() {
    Game.User.level = arguments[0].level;
    this.state.start('SelectSublevel');
  },
  
  back: function() {
    this.state.start('MainMenu');
  }
}
