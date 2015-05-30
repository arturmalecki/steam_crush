Game.Preloader = {
  preload: function() {
    var loader = this.add.image(this.game.world.centerX - 146, 50, 'loader');
    this.load.setPreloadSprite(loader);

    this.load.spritesheet('playIconBtn', Game.assetsPath + 'play_icon.png', 58, 65.5);
    this.load.spritesheet('pauseIconBtn', Game.assetsPath + 'pause_icon.png', 30, 28);
    this.load.spritesheet('tiles', Game.assetsPath + 'tiles.png', 50, 50);
    this.load.spritesheet('explosion', Game.assetsPath + 'explosion.png', 50, 50);
    this.load.image('topBar', Game.assetsPath + 'top_bar.png');
    this.load.image('pauseMenuBg', Game.assetsPath + 'pause_menu_bg.png');
    this.load.image('background', Game.assetsPath + 'bg.png');
    this.load.image('groupBg', Game.assetsPath + 'group_bg.jpg');
    this.load.image('selectLevelBg', Game.assetsPath + 'select_level.png');
    this.load.image('cityBg', Game.assetsPath + 'sketch_city.jpg');

    this.load.image('home', Game.assetsPath + 'home.png');
    this.load.image('homeBg', Game.assetsPath + 'home_bg.jpg');
    this.load.image('playBtn', Game.assetsPath + 'play_button.png');
  },

  create: function() {
    this.state.start('MainMenu')
  }
}
