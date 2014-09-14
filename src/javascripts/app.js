var Game = {
    assetsPath: function() {
      if(window.gameAssetsPath === undefined) {
        return 'assets/';
      } else {
        return window.gameAssetsPath;
      }
    }(),
    Global: {
        menuItemFadeDelay: 75
    },
    Views: {},
    Helpers: {},
    Animations: {},
    version: '0.0.1',
    parentId: 'zmobi-crush-container'
};
