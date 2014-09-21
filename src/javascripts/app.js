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
    S: {

    },
    Views: {},
    Animations: {},
    version: '0.0.2',
    parentId: 'zmobi-crush-container'
};
