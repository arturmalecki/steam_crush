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
    if(game.device.desktop) {
      height = window.innerHeight - 70;
      scale = height / Game.height;
      game.scale.setGameSize(Game.width * scale, window.innerHeight - 70);
      Game.scaleValue = scale;
    } else {
      game.scale.setGameSize(window.innerWidth, window.innerHeight);
      Game.Core.calculateScale();
    }
  }
}
