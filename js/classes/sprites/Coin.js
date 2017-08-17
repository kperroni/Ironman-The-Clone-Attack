(function () {
    window.game = window.game || {};

    var Coin = function (spritesheet, x, y) {
        this.initialize(spritesheet, x, y);
    }

    var p = Coin.prototype = new createjs.Sprite();

    p.x = 300;
    p.y = 500;
    p.collected = false;

    p.Sprite_initialize = p.initialize;

    p.initialize = function (spritesheet, x, y) {
        this.Sprite_initialize(spritesheet);
        this.x = x;
        this.y = y;
        this.regX = this.getBounds().width / 2;
        this.spin();
    }

    p.spin = function () {
        if (this.currentAnimation != "spin") {
            this.gotoAndPlay('spin');          
        }
    }

    p.catched = function () {
        this.collected = true;

        var score = game.main.currentScene.scoreText.text;
        score = Number(score) + 5;
        game.main.currentScene.scoreText.text = score;
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
            createjs.Sound.play("cash");
            this.catched();
        }
    }

    window.game.Coin = Coin;
}());