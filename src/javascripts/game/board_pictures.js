Game.BoardPictures = function(options) {
        this.board         = [];
        this.xLen          = options.x;
        this.yLen          = options.y;
        this.picturesIndex = [];

        this.generatePicturesIndex();
        this.init();
    }

Game.BoardPictures.prototype.generatePicturesIndex = function() {
    var picturesIndexLength = ((this.xLen + 1) * (this.yLen + 1) / 2),
        i, index;

    for(i = 0; i < picturesIndexLength; i++) {
        index = i + 2
        this.picturesIndex.push(index, index);
    }
}

Game.BoardPictures.prototype.init = function() {
    var x, y, randomPictureIndex, picturesIndexLength;

    for(y = 0; y <= this.yLen; y++) {
        this.board[y] = []
        for(x = 0; x <= this.xLen; x++) {
            picturesIndexLength = this.picturesIndex.length;
            randomPictureIndex  = Math.floor(Math.random() * picturesIndexLength);
            this.board[y][x] = this.picturesIndex.splice(randomPictureIndex, 1)[0];
        }
    }
}

Game.BoardPictures.prototype.getTileIndex = function(x, y) {
    return this.board[y][x];
}
