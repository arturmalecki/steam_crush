Game.paused = false;

var game = new Phaser.Game(320, 480, Phaser.CANVAS, Game.parentId);
game.state.add('Boot', Game.Boot);
game.state.add('Preloader', Game.Preloader);
//game.state.add('MainMenu', Game.MainMenu);
//game.state.add('SelectLevel', Game.SelectLevel);
game.state.add('Game', Game.Game);
//game.state.add('EndGame', Game.EndGame);
game.state.start('Boot');
