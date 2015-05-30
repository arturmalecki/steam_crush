Game.MainMenu = {
  create: function() {
    var group, playBtn, bg,
        homeBg = this.game.cache.getImage('homeBg');
        home = new Phaser.Image(this.game, 0, 0, 'home');

    home.alpha = 0;

    Game.Views.default(this.game);

    bg = this.game.add.image(0, 0, 'homeBg');

    group = this.game.add.group();

    group.add(home);

    playBtn = new Phaser.Button(this.game, 120, 330, 'playBtn', function() {
      this.state.start('SelectLevel');
    }, this);

    group.add(playBtn);

    this.game.add.tween(home).to({ alpha: 1.0 }, 700, Phaser.Easing.Linear.None).delay(500).start();

    group.scale = new Phaser.Point(Game.scaleValue, Game.scaleValue);
    bg.scale = new Phaser.Point(Game.scaleValue, Game.scaleValue);
    bg.x = -(bg.width / 2 - this.game.width / 2);
    bg.y = -(bg.height / 2 - this.game.height / 2);
    group.position = new PIXI.Point((this.game.width / 2) - (group.width / 2) , 300 * Game.scaleValue);
  },
  render: function() {},
  update: function() {}
}
