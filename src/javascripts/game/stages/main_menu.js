Game.MainMenu = {
  create: function() {
    var group; 

    Game.Views.default(this.game);

    group = this.game.add.group();
    group.add(
      new Phaser.TileSprite(this.game, 0, 0, 600, 600, 'groupBg')
    );

    group.add(
      new Phaser.Text(this.game, 50, 25, "Main Menu", {font: '50px Arial', fill: '#ffffff'})
    );

    group.add(
      new LabelButton(this.game, 50, 100, 'selectLevelBg', 'Play', this.goToSelectLevel, this)
    );

    group.scale = new Phaser.Point(Game.scaleValue, Game.scaleValue);
    group.position = new PIXI.Point((this.game.width / 2) - (group.width / 2) , 50);
  },
  render: function() {},
  update: function() {},
  goToSelectLevel: function() {
    this.state.start('SelectLevel');
  }
}
