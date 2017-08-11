(function () {
    window.game = window.game || {};

    var Floor = function (spritesheet, x, y) {
        this.initialize(spritesheet, x, y);
    }

    var p = Floor.prototype = new createjs.Sprite();

    p.Sprite_initialize = p.initialize;

    p.initialize = function (spritesheet, x, y) {
        this.Sprite_initialize(spritesheet, "floor");
        this.x = x;
        this.y = y;
    }

    p.run = function (){
        var player = game.main.currentScene.player;

        if(player.x >= document.getElementById('canvas').width / 2 && player.isWalking  && !player.isShooting && player.direction == "RIGHT"){
            this.x -= player.velocity;
        }
    }
    
    window.game.Floor = Floor;
}());