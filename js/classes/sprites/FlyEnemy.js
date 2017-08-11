(function () {
    window.game = window.game || {};

    var FlyEnemy = function (spritesheet, x) {
        this.initialize(spritesheet, x);
    }

    var p = FlyEnemy.prototype = new createjs.Sprite();

    p.moving = false;
    p.velocity = 1;
    p.x = 300;
    p.y = 500;
    p.isAlive = true;
    p.direction = "LEFT";
    p.spritesheet;
    p.damage = 1;

    p.Sprite_initialize = p.initialize;

    p.initialize = function (spritesheet, x) {
        this.Sprite_initialize(spritesheet, x);
        //this.stop();
        this.x = x;
        this.originalX = x;
        this.y = Math.floor(Math.random() * 400) + 100;
        this.originalY = this.y;
    }

    p.flyLeft = function () {
        if (this.currentAnimation != "flyLeft") {
            this.gotoAndPlay('flyLeft');
        }

        this.direction = "LEFT";
        this.x -= this.velocity;
    }

    p.flyRight = function () {
        if (this.currentAnimation != "flyRight") {
            this.gotoAndPlay('flyRight');
        }

        this.direction = "RIGHT";
        this.x += this.velocity;
    }

    p.flyUp = function (direction) {
        if (this.currentAnimation != "flyUp") {
            this.gotoAndPlay('flyUp');
        }

        this.y -= this.velocity;

        if(this.direction == "LEFT"){
           this.x -= this.velocity;
        }else{
            this.x += this.velocity;
        }
    }

    p.fall = function (direction) {
        if (this.currentAnimation != "stop") {
            this.gotoAndPlay('stop');
        }

        this.y += this.velocity;

        if(this.direction == "LEFT"){
           this.x -= this.velocity;
        }else{
            this.x += this.velocity;
        }
    }

    p.stop = function () {
        if (this.currentAnimation != "stop") {
            this.gotoAndPlay('stop');
        }
    }

    p.run = function () {
        var player = game.main.currentScene.player;

        if (player.x >= document.getElementById('canvas').width / 2 && player.isWalking && !player.isShooting && player.direction == "RIGHT") {
            this.x -= player.velocity;
            this.originalX -= player.velocity;
        }

        if(this.x > document.getElementById('canvas').width + 100){
            return;
        }

        if(Math.abs(this.x - player.x) <= 200 && Math.abs(this.y - player.y) <= 130){
            if(player.x < this.x){
                this.direction = "LEFT";
            }else{
                this.direction = "RIGHT";
            }
            
            if(player.y < this.y){
                this.flyUp();
            }else if(player.y > this.y){
                this.fall();
            }else{
                if(player.x < this.x){
                    this.flyLeft();
                }else{
                    this.flyRight();
                }
            }

            if (!player.invulnerable && ndgmr.checkRectCollision(this, player) != null && this.isAlive && player.isAlive) {
                this.die();
                player.attacked(this.damage);
            }
        }else{
            this.flyLeft();
        }
    }

    p.die = function () {
        this.isAlive = false;

        var explosion = new game.Explosion(new createjs.SpriteSheet(game.assets.getAsset(game.assets.EXPLOSION)), this.x, this.y);
        game.main.currentScene.addChild(explosion);
        game.main.currentScene.setChildIndex(game.main.currentScene.player, game.main.currentScene.getNumChildren()-1);
        game.main.currentScene.explosion.push(explosion);

        explosion.explode();
    }

    window.game.FlyEnemy = FlyEnemy;
}());