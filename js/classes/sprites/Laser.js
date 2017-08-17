(function (window) {

    window.game = window.game || {}

    function Laser(spritesheet) {
        this.initialize(spritesheet);
    }

    var p = Laser.prototype = new createjs.Sprite();

    p.Sprite_initialize = p.initialize;

    p.speed = 7;
    p.nextY = null;
    p.shouldDie = true;
    p.direction = "RIGHT";

    p.initialize = function (spritesheet) {
        this.Sprite_initialize(spritesheet, "laser");
        this.paused = true;
    }

    p.run = function(){
        switch (this.direction){
            case "LEFT":
                this.x -= this.speed;
                break;
            case "RIGHT":
                this.x += this.speed;
                break;
        }

        var enemies = game.main.currentScene.enemy;
        var flyEnemies = game.main.currentScene.flyEnemy;

        enemies.forEach(function(element) {
            if(ndgmr.checkRectCollision(this, element) && this.shouldDie && element.isAlive){
                this.shouldDie = false;
                this.hurt();
                element.die();
            };
        }, this);

        flyEnemies.forEach(function(element) {
            if(ndgmr.checkRectCollision(this, element) && this.shouldDie && element.isAlive){
                this.shouldDie = false;
                element.die();
            };
        }, this);
    }

    p.hurt = function(){
        var blood = new game.Blood(new createjs.SpriteSheet(game.assets.getAsset(game.assets.BLOOD)));
        blood.y = this.y - 100;

        switch (this.direction){
            case "LEFT":
                blood.x = this.x + blood.getBounds().width / 2;
                blood.scaleX = -1;
                break;
            case "RIGHT":
                blood.x = this.x - blood.getBounds().width / 4;
                blood.scaleX = 1;
                break;
        }
        
        game.main.currentScene.addChild(blood);
        game.main.currentScene.setChildIndex(game.main.currentScene.player, game.main.currentScene.getNumChildren()-1);
        game.main.currentScene.blood.push(blood);
        blood.explode();
    }

    window.game.Laser = Laser;
}(window));