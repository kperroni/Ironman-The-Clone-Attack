(function () {
    window.game = window.game || {}

    function Explosion(spritesheet, x, y) {
        this.initialize(spritesheet, x, y);
    }

    var p = Explosion.prototype = new createjs.Sprite();

    p.exploded = false;

    p.Sprite_initialize = p.initialize;

    p.initialize = function (spritesheet, x, y) {
        this.Sprite_initialize(spritesheet);
        this.x = x;
        this.y = y;
    }

    p.run = function(){
        var player = game.main.currentScene.player;

        if(player.x >= document.getElementById('canvas').width / 2 && player.isWalking && !player.isShooting && player.direction == "RIGHT"){
            this.x -= player.velocity;
            this.originalX -= player.velocity;
        }
    }

    p.explode = function(){
        this.on('animationend', this.explodeComplete);
        this.gotoAndPlay('explode');
        createjs.Tween.get(this, { loop: false }).to({y: this.y - 100 }, 1000);
    }

    p.explodeComplete = function(){
        this.exploded = true;
        this.stop();
        this.removeAllEventListeners();
    }

    window.game.Explosion = Explosion;
}());