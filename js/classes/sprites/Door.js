(function () {
    window.game = window.game || {};

    var Door = function (spritesheet, x, y) {
        this.initialize(spritesheet, x, y);
    }

    var p = Door.prototype = new createjs.Sprite();

    p.x = 300;
    p.y = 500;
    p.isOpen = false;
    p.isChanging = false;
    p.exited = null;

    p.Sprite_initialize = p.initialize;

    p.initialize = function (spritesheet, x, y) {
        this.Sprite_initialize(spritesheet);
        this.x = x;
        this.y = y;
        this.scaleX = 2;
        this.scaleY = 2;
        this.regX = this.getBounds().width / 2;
    }

    p.open = function () {
        if (this.currentAnimation != "open") {
            this.on('animationend', this.openComplete);
            this.isChanging = true;
            this.gotoAndPlay('open');          
        }
    }

    p.openComplete = function () {
        this.stop();
        this.removeAllEventListeners();
        this.isChanging = false;
        this.isOpen = true;
    }

    p.close = function () {
        if (this.currentAnimation != "close") {
            this.on('animationend', this.closeComplete);
            this.isChanging = true;
            this.gotoAndPlay('close');          
        }
    }

    p.closeComplete = function () {
        this.stop();
        this.removeAllEventListeners();
        this.isChanging = false;
        this.isOpen = false;
        game.main.currentScene.finishLevel();
    }

    p.run = function () {
        var player = game.main.currentScene.player;

        if (player.x >= document.getElementById('canvas').width / 2 && player.isWalking && !player.isShooting && player.direction == "RIGHT" && game.main.currentScene.exitDoor.x > document.getElementById('canvas').width / 2) {
            this.x -= player.velocity;
        }

        if(this.x > document.getElementById('canvas').width + 100){
            return;
        }

        if (Math.abs(this.x - player.x) <= 200 && Math.abs(Math.abs(this.y - player.y) <= 50) && !this.isOpen && !this.isChanging && !game.main.currentScene.exited) {
            this.open();
        }

        if (ndgmr.checkRectCollision(this, player) != null && this.isOpen && !this.isChanging && this.exited == null) {
            game.main.currentScene.exited = true;
            player.gotoAndPlay('walk');
            this.exited = Date.now();
            createjs.Tween.get(player, { loop: false }).to({ x: this.x + 15}, 1000).to({ x: this.x + 20, y: this.y + 30}, 1000).to({ alpha: 0}, 1000);
        }

        if(this.exited != null){
            if(Date.now() - this.exited > 3000){
                this.close();
            }
        }
    }

    window.game.Door = Door;
}());