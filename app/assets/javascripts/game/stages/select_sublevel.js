Game.SelectSublevel = {
  create: function() {
      var title, self = this, group, btnY, bt;

      bg = this.game.add.image(0, 0, Game.Levels[Game.User.level].bg);

      Game.Views.default(this.game);

      group = this.game.add.group();

      Game.Levels[Game.User.level].active.forEach(function(level, index) {
        var btnX = (index * 200),
            btn, max,
            points = localStorage.getItem('level_' + Game.User.level + '_' + level + '_max');

        btnY = 100;
        btn = new LabelButton(this.game, btnX, btnY, 'selectLevelBg', level, self.selectLevel, self);
        max = new Phaser.Text(this.game, btnX, btnY + 100, points.toString(), {font: '50px Arial', fill: '#ffffff'});
        btn.level = level;
        group.add(btn);
        group.add(max);
      });

      group.add(new LabelButton(this.game, 0, btnY + 225, 'selectLevelBg', 'Back', this.back, this));
      group.scale = new Phaser.Point(Game.scaleValue, Game.scaleValue);
      group.position = new PIXI.Point((this.game.width / 2) - (group.width / 2) , 50);

      bg.scale = new Phaser.Point(Game.scaleValue, Game.scaleValue);
      bg.x = -(bg.width / 2 - this.game.width / 2);
      bg.y = -(bg.height / 2 - this.game.height / 2);
  },
  render: function() {},

  update: function() {},

  selectLevel: function() {
    Game.User.sublevel = arguments[0].level;
    this.state.start('Game');
  },
  
  back: function() {
    this.state.start('MainMenu');
  }
}
