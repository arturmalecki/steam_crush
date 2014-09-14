Game.Views.footerInfo = function(game, options) {
  var textStyle = { font: "12px Arial", fill: "#f6b020" },
      group = game.add.group(),
      options = options || {},
      text;

  group.x = 10;
  group.y = game.world.height - 37;

  game.add.text(0, 0, "Created by gameboxZ.org\nVersion: " + options.version, textStyle, group);
};

