(function () {
    window.game = window.game || {};

    var Health = function (hitPoints) {
        this.initialize(hitPoints);
    }

    var p = Health.prototype = new createjs.Sprite();
    p.Sprite_initialize = p.initialize;
    p.life;
    p.changingLife;
    p.initialize = function (hitPoints) {

        this.life = this.changingLife = hitPoints;
        this.Sprite_initialize(new createjs.SpriteSheet(game.assets.getAsset(game.assets.HEALTH), "healthBar"));
        this.x = 90;
        this.y = 20;
        this.scaleX = 1;

    }

    p.decreaseLife = function (damage) {

        game.main.currentScene.player.hitPoints -= damage;

        if (this.changingLife - damage < 0) {
            this.scaleX = 0;
        }

        else {
            this.changingLife -= damage;
            this.scaleX = this.changingLife / this.life;

        }
    }

    p.increaseLife = function (healthPoints) {

        if (!game.main.currentScene.player.isAlive)
            return;

        game.main.currentScene.player.hitPoints += healthPoints;
        if (this.changingLife + healthPoints > this.life) {
            this.scaleX = 1;
        }

        else {
            this.changingLife += healthPoints;
            this.scaleX = this.changingLife / this.life;

        }

    }
    window.game.Health = Health;
}());