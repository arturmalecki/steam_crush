Game.Core = {
  calculateScale: function() {
    var widthScale = window.innerWidth / Game.width,
        heightScale = window.innerHeight / Game.height;

    if(widthScale > heightScale) {
      Game.scaleValue = heightScale;
    } else {
      Game.scaleValue = widthScale;
    }
  },
  resizeGame: function(game) {
    //height = window.innerHeight;
    //scale = height / Game.height;
    //game.scale.setGameSize(Game.width * scale, window.innerHeight);
    //Game.scaleValue = scale;
    if(game.device.desktop) {
      document.getElementsByClassName('top_ad')[0].hidden = true;
      game.scale.setGameSize(window.innerWidth, window.innerHeight);
    } else {
      game.scale.setGameSize(window.innerWidth, window.innerHeight - 50);
    }
    Game.Core.calculateScale();
  },
  setupLocalStorage: function() {
    Game.Levels.active.forEach(function(level) {
      Game.Levels[level].active.forEach(function(sublevel) {
        var max_key = "level_" + level + "_" + sublevel + "_max",
            value = localStorage.getItem(max_key);

        if(value === null) {
          localStorage.setItem(max_key, 0);
        }
      });
    });
  }
}
