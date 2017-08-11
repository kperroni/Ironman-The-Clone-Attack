(function () {
    window.game = window.game || {};

    var Enemy = function (spritesheet, x, y) {
        this.initialize(spritesheet, x, y);
    }

    var p = Enemy.prototype = new createjs.Sprite();

    p.moving = false;
    p.velocity = 1;
    p.falling = false;
    p.x = 300;
    p.y = 500;
    p.isGrounded = true;
    p.isJumping = false;
    p.isWalking = false;
    p.isShooting = false;
    p.isAlive = true;
    p.isPlataform = false;
    p.direction = "RIGHT";
    p.originalX = p.x;
    p.spritesheet;
    p.damage = 2;

    p.Sprite_initialize = p.initialize;

    p.initialize = function (spritesheet, x, y) {
        this.Sprite_initialize(spritesheet, x, y);
        this.stand();
        this.x = x;
        this.originalX = x;
        this.y = y;
        this.originalY = y;
        this.regX = this.getBounds().width / 2;
        this.spritesheet = spritesheet;
    }

    p.checkIsGrounded = function () {
        var isGrounded = false;
        var isPlataform = false;

        game.main.currentScene.floor.forEach(function (element) {
            if(element.x > 900){
                return;
            }

            if (ndgmr.checkRectCollision(this, element) != null && this.y + this.getBounds().height <= element.y + 24) {
                isGrounded = true;
                isPlataform = true;
            }
        }, this);

        if (!isGrounded && this.y >= 500) {
            isGrounded = true;
        }

        this.isGrounded = isGrounded;
        this.isPlataform = isPlataform;
    }

    p.walk = function (direction) {
        if (this.isShooting) {
            return;
        }

        this.checkIsGrounded();

        if (this.currentAnimation != "walk" && this.isGrounded) {
            this.gotoAndPlay('walk');
        }

        this.isWalking = true;

        var speed = 1;

        if (!this.isGrounded) {
            speed = 2;
        }

        switch (direction) {
            case "LEFT":
                this.x -= this.velocity * speed;
                this.scaleX = -1;
                break;
            case "RIGHT":
                this.x += this.velocity * speed;
                this.scaleX = 1;
                break;
        }
    }

    p.jump = function () {
        if (this.currentAnimation != "fly") {
            this.gotoAndPlay('fly');
            this.isJumping = true;
            this.isGrounded = false;
        }

        if (this.y > 0) {
            this.y -= this.velocity * 2;
        }
    }

    p.shoot = function () {
        if (this.isGrounded && this.currentAnimation != "shoot" && !this.isShooting && this.isAlive) {
            this.isShooting = true;
            this.on('animationend', this.shootComplete);
            this.gotoAndPlay('shoot');
            this.y -= 20;
        }
    }

    p.shootComplete = function () {
        this.isShooting = false;
        this.stop();
        this.removeAllEventListeners();

        var player = game.main.currentScene.player;
        
        if(ndgmr.checkRectCollision(this, player) != null && !player.invulnerable && this.isAlive && player.isAlive && player.isGrounded && !player.isJumping) {
            console.log(this.damage);    
            player.attacked(this.damage);
        }
    }

    p.fall = function () {
        this.checkIsGrounded();

        if (!this.isGrounded) {
            this.y += this.velocity;
        }
    }

    p.stand = function () {
        if (this.isGrounded && !this.isShooting) {
            this.gotoAndStop('stand');
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

        if (this.isPlataform) {
            var futurePosition = new game.Enemy(this.spritesheet, this.x, this.y);
            futurePosition = Object.assign(futurePosition, this);
            futurePosition.walk(futurePosition.direction);
            futurePosition.checkIsGrounded();

            if (!futurePosition.isGrounded && !this.isShooting) {
                if (this.direction == "RIGHT") {
                    this.direction = "LEFT";
                } else {
                    this.direction = "RIGHT";
                }
            }
        } else {
            if(Math.abs(this.x - player.x) <= 200 && Math.abs(this.y - player.y) <= 100 && player.isAlive){
                if(player.x < this.x){
                    this.direction = "LEFT";
                }else{
                    this.direction = "RIGHT";
                }
            }else{
                this.direction = "LEFT";
            }
        }

        if (this.isAlive && this.isGrounded) {
            this.walk(this.direction);
        }

        if (Math.abs(this.x - player.x) <= 200 && Math.abs(Math.abs(this.y - player.y) <= 50)) {
            this.velocity = 2;

            if (((player.x < this.x && this.direction == "LEFT") || (player.x > this.x && this.direction == "RIGHT")) && !player.invulnerable && ndgmr.checkRectCollision(this, player) != null) {
                this.shoot();
            }
        }
        else{
            this.velocity = 1;
        }
    }

    p.die = function () {
        var player = game.main.currentScene.player;

        if (this.isAlive) {
            this.isAlive = false;
            this.on('animationend', this.dieComplete);

            if(player.direction == "LEFT"){
                this.direction = "RIGHT";
                createjs.Tween.get(this, { loop: false }).to({y: this.y - 15}, 600, createjs.Ease.circOut).to({y: this.y + 60 }, 1000, createjs.Ease.bounceOut);
            }
               
            
            if(player.direction == "RIGHT"){
                this.direction = "LEFT";
                createjs.Tween.get(this, { loop: false }).to({y: this.y - 15}, 600, createjs.Ease.circOut).to({y: this.y + 60 }, 1000, createjs.Ease.bounceOut);
            }
                
            this.gotoAndPlay('die');
        }
    }

    p.dieComplete = function () {
        this.y += 40;
        this.stop();
        this.removeAllEventListeners();
        
        var score = game.main.currentScene.scoreText.text;
        score = Number(score) + 10;
        game.main.currentScene.scoreText.text = score;
    }

    window.game.Enemy = Enemy;
}());