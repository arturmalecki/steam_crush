Game.SelectLevel = {
  create: function() {
      var title, self = this, group;

      Game.Views.default(this.game);

      group = this.game.add.group();
      group.add(new Phaser.TileSprite(this.game, 0, 0, 600, 600, 'groupBg'));
      
      title = new Phaser.Text(this.game, 50, 25, "Select Level:", {font: '50px Arial', fill: '#ffffff'});
      group.add(title);

      Game.Levels.active.forEach(function(level, index) {
        var btnX = 50,
            btnY = 100 + (index * 125),
            btn;
        btn = new LabelButton(this.game, btnX, btnY, 'selectLevelBg', level, self.selectLevel, self);
        btn.level = level;
        group.add(btn);
      });

      group.scale = new Phaser.Point(Game.scaleValue, Game.scaleValue);
      group.position = new PIXI.Point((this.game.width / 2) - (group.width / 2) , 50);
  },
  render: function() {},

  update: function() {},

  selectLevel: function() {
    Game.User.level = arguments[0].level;
    this.state.start('SelectSublevel');
  }
}
