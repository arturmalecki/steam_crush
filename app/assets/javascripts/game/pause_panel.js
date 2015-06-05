var PausePanel = function(game) {
    //var bg = game.add.sprite(0, 0, 'pauseMenuBg');
    this.game = game;

    Phaser.Group.call(this, game);

    //this.add(bg);
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
    ).start();

    h.onComplete.add(function() {
        this.y = -300
    }, this);
}
