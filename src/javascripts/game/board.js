Game.Board = function(phaserGame, gameBoardPictures) {
    this.phaserGame        = phaserGame;
    this.x = this.phaserGame.world.centerX - (Game.tilesWidth/2);
    this.y = 65;
    group                  = new Phaser.Group(this.phaserGame);
    group.x = this.x;
    group.y = this.y;

    this.tilemap           = this.phaserGame.add.tilemap(Game.level);
    this.tilemap.addTilesetImage('Desert', 'tiles');
    this.tilemapLayer      = this.tilemap.createLayer('Board', Game.tilesWidth, Game.tilesHeight, group);

    this.flippedTiles      = [];
    this.gameBoardPictures = new Game.BoardPictures({
        x: this.tilemapLayer.layer.width - 1,
        y: this.tilemapLayer.layer.height - 1
    });

}

Game.Board.prototype.getClickedTile = function() {
    var x, y,
        layer   = this.tilemapLayer.layer,
        tile    = undefined,
        activeX = this.phaserGame.input.activePointer.worldX - this.x,
        activeY = this.phaserGame.input.activePointer.worldY - this.y;

    if(activeX >= 0 && activeY >= 0) {
        x = this.tilemapLayer.getTileX(activeX);
        y = this.tilemapLayer.getTileY(activeY);
        if(x < layer.width && y < layer.height) {
            tile = this.tilemap.getTile(x, y);
        }
    }
    return tile;
}

Game.Board.prototype.isHitTheSameTiles = function() {
    if(this.flippedTiles.length < 2) {
        return false;
    }
    if(this.flippedTiles[0][2] === this.flippedTiles[1][2]) {
        return true;
    } else {
        return false;
    }
}

Game.Board.prototype.clearFlippedTiles = function() {
    this.flippedTiles = [];
}

Game.Board.prototype.isTileFlipped = function(tile) {
    if(tile === undefined) { return false; }
    return tile.index === 1 ? false : true;
}

Game.Board.prototype.isTileNotFlipped = function(tile) {
    if(tile === undefined) { return false; }
    return tile.index === 1 ? true : false;
}

Game.Board.prototype.flipTile = function(tile) {
    var tileIndex = this.gameBoardPictures.getTileIndex(tile.x, tile.y);

    this.tilemap.putTile(tileIndex, tile.x, tile.y);
    this.flippedTiles.push([tile.x, tile.y, tileIndex]);
}

Game.Board.prototype.flipBackTiles = function() {
    var index, x, y;
    for(index in this.flippedTiles) {
        x = this.flippedTiles[index][0];
        y = this.flippedTiles[index][1];
        this.tilemap.putTile(1, x, y);
    }
    this.clearFlippedTiles();
}
