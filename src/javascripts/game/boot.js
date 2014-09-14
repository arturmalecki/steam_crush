Game.Boot = {
  preload: function() {
    this.load.image('title', Game.assetsPath + 'title.png');
  },
  create: function() {
    if(this.game.device.desktop) {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    }
    // this.scale.minWidth = 480;
    // this.scale.minHeight = 260;
    // this.scale.maxWidth = 1024;
    // this.scale.maxHeight = 768;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    this.scale.setScreenSize(true);

    this.state.start('Preloader');
  }
}
