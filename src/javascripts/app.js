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
    level: 1,
    sublevel: 1
  },
  Views: {},
  Animations: {},
  Core: {},
  version: '0.3.1',
  parentId: 'steam-crush-container',
  width: 640,
  height: 960,
  maxWidth: 1280,
  maxHeight: 1920,
  scaleValue: 1
};

