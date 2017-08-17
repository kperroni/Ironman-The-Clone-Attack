(function () {
    window.game = window.game || {};

    var Player = function (spritesheet, x, y) {
        this.initialize(spritesheet, x, y);
    }

    var p = Player.prototype = new createjs.Sprite();

    p.velocity = 2;
    p.x = 30;
    p.y = 500;
    p.isGrounded = true;
    p.isJumping = false;
    p.isWalking = false;
    p.isShooting = false;
    p.isPunching = false;
    p.isAlive = true;
    p.direction = "RIGHT";
    p.currentSound = null;
    p.hitPoints = 10;
    p.invulnerable = false;
    p.energyLevel = 100;
    p.lastEnergyUse = null;

    p.Sprite_initialize = p.initialize;

    p.initialize = function (spritesheet, x, y) {
        this.Sprite_initialize(spritesheet);
        this.stand();
        this.regX = this.getBounds().width / 2;
        this.spritesheet = spritesheet;
        this.x = x;
        this.y = y;
    }

    p.checkIsGrounded = function () {
        var isGrounded = false;

        game.main.currentScene.floor.forEach(function (element) {
            if(element.x > 900){
                return;
            }

            if (ndgmr.checkRectCollision(this, element) != null && this.y + this.getBounds().height <= element.y + 24) {
                isGrounded = true;
            }
        }, this);

        if (!isGrounded && this.y >= 500) {
            isGrounded = true;
        }

        this.isGrounded = isGrounded;
    }

    p.walk = function (direction) {
        if (this.isShooting || !this.isAlive) {
            return;
        }

        this.checkIsGrounded();

        if (this.isGrounded && this.currentAnimation != "walk") {
            this.stopCurrentSound();
            this.gotoAndPlay('walk');
        }

        this.isWalking = true;

        var speed = 1;

        if (!this.isGrounded) {
            speed = 2;
        }

        switch (direction) {
            case "LEFT":
                if (this.x - this.getBounds().width > 3) {
                    this.x -= this.velocity * speed;
                }
                this.scaleX = -1;
                break;
            case "RIGHT":
                if (this.x < document.getElementById('canvas').width / 2) {
                    this.x += this.velocity * speed;
                }
                this.scaleX = 1;
                break;
        }

        this.direction = direction;
    }

    p.jump = function () {
        if (!this.hasEnoughEnergy(0.2) || !this.isAlive || this.isShooting) {
            this.isJumping = false;
            return;
        }

        if (this.currentAnimation != "fly") {
            this.gotoAndPlay('fly');
            this.stopCurrentSound();
            this.currentSound = createjs.Sound.play('jet', { loop: -1 });
            this.isJumping = true;
            this.isGrounded = false;
        }

        if (this.y > 0) {
            this.y -= this.velocity * 2;
        }
    }

    p.checkBattery = function(){
        if(this.lastEnergyUse!= null && Date.now() - this.lastEnergyUse > 2000 && this.energyLevel < 100 && this.isAlive){
            this.energyLevel += 0.1;
            game.main.currentScene.energyBar.changePercentage(this.energyLevel);
            game.main.currentScene.energyBarText.text = Math.round(this.energyLevel) + "%";
        }
    }

    p.hasEnoughEnergy = function (required) {
        if (this.energyLevel <= required) {
            return false;
        }

        this.energyLevel -= required;
        this.lastEnergyUse = Date.now();
        game.main.currentScene.energyBar.changePercentage(this.energyLevel);
        game.main.currentScene.energyBarText.text = Math.round(this.energyLevel) + "%";
        return true;
    }

    p.shoot = function () {
        if (!this.hasEnoughEnergy(5) || !this.isAlive) {
            return;
        }

        if (this.isGrounded && this.currentAnimation != "shoot" && !this.isShooting) {
            this.isShooting = true;
            this.on('animationend', this.shootComplete);
            this.gotoAndPlay('shoot');
            createjs.Sound.play("laser");
        }
    }

    p.shootComplete = function () {
        var laser = new game.Laser(this.spritesheet);

        switch (this.direction) {
            case "LEFT":
                laser.x = this.x - 110;
                laser.y = this.y + 6;
                break;
            case "RIGHT":
                laser.x = this.x + 55;
                laser.y = this.y + 6;
                break;
        }

        laser.direction = this.direction;
        game.main.currentScene.bullets.push(laser);
        game.main.currentScene.addChild(laser);

        this.isShooting = false;
        this.stop();
        this.removeAllEventListeners();
    }

    p.punch = function(){
        if (this.isGrounded && this.currentAnimation != "punch" && this.isAlive) {
            this.isShooting = true;
            this.on('animationend', this.punchComplete);
            this.gotoAndPlay('punch');
        }
    }

    p.punchComplete = function(){
        this.isShooting = false;
        this.stop();
        this.removeAllEventListeners();

        game.main.currentScene.enemy.forEach(function(element) {
            if(element.x > 900){
                return;
            }

            if(ndgmr.checkRectCollision(this, element) != null) {    
                element.die(this.damage);
                createjs.Sound.play("punch");
            }
        }, this);
    }

    p.fall = function () {
        this.checkIsGrounded();
        this.isJumping = false;

        if (!this.isGrounded) {
            if (this.currentAnimation != "fly") {
                this.gotoAndPlay('fly');
                this.stopCurrentSound();
                this.currentSound = createjs.Sound.play('jet', { loop: -1 });
            }

            this.y += this.velocity;
        }
    }

    p.stopCurrentSound = function () {
        if (this.currentSound != null) {
            this.currentSound.stop();
        }
    }

    p.stand = function () {
        if (this.isGrounded && !this.isShooting && this.isAlive) {
            this.gotoAndStop('stand');
            this.stopCurrentSound();
        }
    }

    p.attacked = function (damage) {
        console.log(this.invulnerable);
        this.invulnerable = true;
        this.hitPoints -= damage;
        game.main.currentScene.healthBar.decreaseLife(damage);
        createjs.Sound.play("punch");
        this.stop();
        this.gotoAndPlay('hit');
        this.on('animationend', this.attackedComplete, this, false, { health: this.hitPoints });
    }

    p.attackedComplete = function (evt, data) {
        this.stand();
        if (data.health <= 0)
            this.die();
        else {
            this.invulnerable = false;
        }
    }

    p.die = function () {
        if (this.isAlive) {
            this.isAlive = false;
            this.invulnerable = true;
            createjs.Sound.stop();
            createjs.Sound.play("death");
            if (this.direction == "RIGHT")
                createjs.Tween.get(this, { loop: false }).to({ x: this.x - 40, y: this.y - 15 }, 4000, createjs.Ease.circOut).to({ y: this.y + 60 }, 3000, createjs.Ease.bounceOut);

            if (this.direction == "LEFT")
                createjs.Tween.get(this, { loop: false }).to({ x: this.x + 40, y: this.y - 15 }, 4000, createjs.Ease.circOut).to({ y: this.y + 60 }, 3000, createjs.Ease.bounceOut);
            this.gotoAndPlay('die');
            this.on('animationend', this.dieComplete);
        }
    }

    p.dieComplete = function () {

        this.stop();
        this.removeAllEventListeners();
        game.main.currentScene.runningScene = false;
    }

    window.game.Player = Player;
}());