Game.MainMenu = {
  create: function() {
    var group, playBtn;

    Game.Views.default(this.game);

    group = this.game.add.group();
    group.add(
      new Phaser.Image(this.game, 0, 0, 'home')
    );

    playBtn = new Phaser.Button(this.game, 200, 410, 'playBtn', function() {
      this.state.start('SelectLevel');
    }, this);

    group.add(playBtn);

    group.scale = new Phaser.Point(Game.scaleValue, Game.scaleValue);
    group.position = new PIXI.Point((this.game.width / 2) - (group.width / 2) , 50);
  },
  render: function() {},
  update: function() {}
}
