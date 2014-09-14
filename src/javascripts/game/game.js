Game.Game = {
    timeCounter: 0,
    foundedPairs: 0,
    score: 0,

    create: function() {
        Game.Views.background(this.game);

        this.gameTopBar = new Game.Views.GameTopBar(this.game, this);
        this.time.events.loop(Phaser.Timer.SECOND, this.updateTimeText, this);

        Game.Views.footerInfo(this.game, {version: Game.version});
    },

    render: function() {
    },

    update: function() {
        if(!Game.Global.paused) {
            this.gameTopBar.updateScoreText(this.score)
        }
    },
    pauseGame: function(){
        Game.Global.paused = true;
    },

    unpauseGame: function(){
        Game.Global.paused = false;
    },
    updateTimeText: function() {
        this.timeCounter++;
        this.gameTopBar.updateTimeText(this.timeCounter)
    },
    finishGame: function() {
        Game.paused = false;
        this.timeCounter = 0;
        Game.EndGame.score = this.score;
        this.score = 0;
        this.game.state.start('EndGame');
    }
}
