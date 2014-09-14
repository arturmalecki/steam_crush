Game.Game = {
    timeCounter: 0,
    foundedPairs: 0,
    score: 0,

    create: function() {
        var gameBoard,
            tilesClicks,
            pauseBtn;
         
        Game.Views.background(this.game);

        this.add.sprite(0, 0, 'topBar');

        pauseBtn = this.add.button(280, 10, 'pauseIconBtn', this.pauseGame, this, 1, 0, 1, 1)

        this.timeText = this.add.text(10, 12, "0s", { font: "20px Arial", fill: "#f6b020" });
        this.scoreText = this.add.text(120, 12, "0", { font: "20px Arial", fill: "#f6b020" });

        this.pausePanel = new PausePanel(this, this.playGame, this.finishGame, this);
        this.add.existing(this.pausePanel);

        this.time.events.loop(Phaser.Timer.SECOND, this.updateTimeText, this);

        Game.Views.footerInfo(this.game, {version: Game.version});
    },

    render: function() {
    },

    update: function() {
        if(!Game.paused) {
            this.scoreText.setText("" + this.score);
        }
    },
    pauseGame: function(){
        this.pausePanel.show();
        Game.paused = true;
    },

    playGame: function(){
        this.hide()
        Game.paused = false;
    },
    updateTimeText: function() {
        this.timeCounter++;
        this.timeText.setText(this.timeCounter + "s");
    },
    finishGame: function() {
        Game.paused = false;
        this.foundedPairs = 0;
        this.timeCounter = 0;
        Game.EndGame.score = this.score;
        this.score = 0;
        this.game.state.start('EndGame');
    }
}
