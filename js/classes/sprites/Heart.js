(function () {
    window.game = window.game || {};

    var Heart = function (spritesheet, x, y) {
        this.initialize(spritesheet, x, y);
    }

    var p = Heart.prototype = new createjs.Sprite();

    p.x = 300;
    p.y = 500;
    p.healthPoints = 3;
    p.collected = false;

    p.Sprite_initialize = p.initialize;

    p.initialize = function (spritesheet, x, y) {
        this.Sprite_initialize(spritesheet);
        this.x = x;
        this.y = y;
        this.regX = this.getBounds().width / 2;
        this.flicker();
    }

    p.flicker = function () {
        if (this.currentAnimation != "flicker") {
            this.gotoAndPlay('flicker');          
        }
    }

    p.catched = function () {
        this.collected = true;
        game.main.currentScene.healthBar.increaseLife(this.healthPoints);
        createjs.Sound.play("restore_hp");
    }

    p.run = function () {
        var player = game.main.currentScene.player;

        if (player.x >= document.getElementById('canvas').width / 2 && player.isWalking && !player.isShooting && player.direction == "RIGHT") {
            this.x -= player.velocity;
        }

        if(this.x > document.getElementById('canvas').width + 100){
            return;
        }

        if (ndgmr.checkRectCollision(this, player) != null && !this.collected) {
            this.catched();
        }
    }

    window.game.Heart = Heart;
}());