(function () {
    window.game = window.game || {}

    function Blood(spritesheet) {
        this.initialize(spritesheet);
    }

    var p = Blood.prototype = new createjs.Sprite();

    p.Sprite_initialize = p.initialize;

    p.initialize = function (spritesheet) {
        this.Sprite_initialize(spritesheet, "blood");
        this.paused = true;
    }

    p.run = function(){
        var player = game.main.currentScene.player;

        if(player.x >= document.getElementById('canvas').width / 2 && player.isWalking && !player.isShooting && player.direction == "RIGHT"){
            this.x -= player.velocity;
            this.originalX -= player.velocity;
        }
    }

    p.explode = function(){
        this.on('animationend', this.bloodComplete);
        this.gotoAndPlay('blood');
    }

    p.bloodComplete = function(){
        this.stop();
        this.removeAllEventListeners();
    }

    window.game.Blood = Blood;
}());