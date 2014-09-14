var PausePanel = function(game, playGameFunction, finishGameFunction, context) {
    this.game = game;

    Phaser.Group.call(this, game);

    bg = game.add.sprite(0, 0, 'pauseMenuBg');
    btnPlay = game.add.button(101 - 29, 60, 'playIconBtn', playGameFunction, this, 1,0,1,1);
    mainMenuBtn = game.add.button(101 - 76, 175, 'menuBtn', finishGameFunction, context);

    this.add(bg);
    this.add(btnPlay);
    this.add(mainMenuBtn);
    this.x = this.game.world.centerX - 101;
    this.y = -300;
    this.alpha = 0;
}

PausePanel.prototype = Object.create(Phaser.Group.prototype);
PausePanel.prototype.constructor = PausePanel;
PausePanel.prototype.show = function() {
    this.y = 65;
    this.game.add.tween(this).to(
        { alpha: 1.0 }, 150, Phaser.Easing.Linear.None, true 
    );   
}
PausePanel.prototype.hide = function() {
    var h = this.game.add.tween(this).to(
        { alpha: 0 }, 150, Phaser.Easing.Linear.None, true
    );

    h.onComplite.addOnce(function() {
        this.y = -300
    }, this);
}
