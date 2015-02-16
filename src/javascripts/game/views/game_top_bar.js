Game.Views.GameTopBar = function(game, context) {
  //var btnPlay = game.add.button(101 - 29, 60, 'playIconBtn', this.unpauseGame, this, 1,0,1,1);
  this.pausePanel = new PausePanel(game);
  //this.pausePanel.add(btnPlay);

  game.add.existing(this.pausePanel);
  //game.add.sprite(0, 0, 'topBar');
  //game.add.button(280, 10, 'pauseIconBtn', this.pauseGame, this, 1, 0, 1, 1);

  this.context = context;
  //this.timeText = game.add.text(10, 12, "0s", { font: "20px Arial", fill: "#f6b020" });
  this.scoreText = game.add.text(10, 12, "0", { font: "20px Arial", fill: "#f6b020" });
  game.add.text(90, 12, "MAX:", { font: "20px Arial", fill: "#f6b020" });
  this.maxScoreText = game.add.text(140, 12, "0", { font: "20px Arial", fill: "#f6b020" });
};

Game.Views.GameTopBar.prototype.updateTimeText = function(time) {
  this.timeText.setText(time + "s");
};

Game.Views.GameTopBar.prototype.updateScoreText = function(score) {
  this.scoreText.setText(score);
};

Game.Views.GameTopBar.prototype.updateMaxScoreText = function(score) {
  this.maxScoreText.setText(score);
};

Game.Views.GameTopBar.prototype.pauseGame = function() {
  this.pausePanel.show();
  this.context.pauseGame();
};

Game.Views.GameTopBar.prototype.unpauseGame = function() {
  this.pausePanel.hide();
  this.context.unpauseGame();
};

