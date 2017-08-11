(function () {
    window.game = window.game || {};

    var EnergyBar = function () {
        this.initialize();
    }

    var p = EnergyBar.prototype = new createjs.Sprite();

    p.Sprite_initialize = p.initialize;

    p.initialize = function () {
        this.Sprite_initialize(new createjs.SpriteSheet(game.assets.getAsset(game.assets.ENERGY)), "level7");
        this.x = 20;
        this.y = 150;
    }

    p.changePercentage = function(percentage){
        var frame = percentage / 14.28;
        frame = Math.round(frame);

        this.gotoAndStop('level' + frame);
    }
    
    window.game.EnergyBar = EnergyBar;
}());