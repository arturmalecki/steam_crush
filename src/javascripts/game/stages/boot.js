Game.Boot = {
  preload: function() {
    this.load.image('title', Game.assetsPath + 'title.png');
    //this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    //this.game.scale.minWidth = Game.width / 2;
    //this.game.scale.minHeight = Game.height / 2;
    //this.game.scale.maxWidth = Game.width * 2;
    //this.game.scale.maxHeight = Game.height * 2;
    //this.game.canvas.width = window.innerWidth;
    //this.game.canvas.height = window.innerHeight;
    //this.game.canvas.style.height = "100px";
    //this.game.scale.setScreenSize(true);
    Game.Core.resizeGame(this.game);
  },
  create: function() {
    //this.scale.setMinMax(322, 480, 640, 960);
    //this.scale.pageAlignHorizontally = true;
    //this.scale.pageAlignVertically = true;

    this.state.start('Preloader');
  }
}
