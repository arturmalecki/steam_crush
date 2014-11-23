var Game = {
  assetsPath: function() {
    if(window.gameAssetsPath === undefined) {
      return 'assets/';
    } else {
      return window.gameAssetsPath;
    }
  }(),
  G: {
    menuItemFadeDelay: 75,
    paused: false,
    gemSize: 75,
    gemSpacing: 2,
    gemSizeWithSpacing: 77
  },
  User: {
    level: 1
  },
  Views: {},
  Animations: {},
  version: '0.1.0',
  parentId: 'steam-crush-container'
};
