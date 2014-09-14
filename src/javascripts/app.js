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
    Animations: {},
    version: '0.0.2',
    parentId: 'zmobi-crush-container'
};
