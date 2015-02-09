Game.Boot = {
  preload: function() {
    this.load.image('loader', Game.assetsPath + 'loading.png');
    Game.Core.resizeGame(this.game);
  },
  create: function() {
    this.state.start('Preloader');
  }
}
