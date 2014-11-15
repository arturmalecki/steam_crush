Game.Views.footerInfo = function(game, options) {
  var textStyle = { font: "20px Arial", fill: "#000000" },
      group = game.add.group(),
      options = options || {},
      text;

  group.x = 10;
  group.y = game.world.height - 57;

  game.add.text(0, 0, "Created by gameboxZ.org\nVersion: " + options.version, textStyle, group);
};

