Game.Preloader = {
  preload: function() {
    this.load.spritesheet('playIconBtn', Game.assetsPath + 'play_icon.png', 58, 65.5);
    this.load.spritesheet('pauseIconBtn', Game.assetsPath + 'pause_icon.png', 30, 28);
    this.load.image('tiles', Game.assetsPath + 'tiles.png');
    this.load.image('topBar', Game.assetsPath + 'top_bar.png');
    this.load.image('pauseMenuBg', Game.assetsPath + 'pause_menu_bg.png');
    this.load.image('background', Game.assetsPath + 'bg.png');
  },

  create: function() {
    this.state.start('Game')
  }
}