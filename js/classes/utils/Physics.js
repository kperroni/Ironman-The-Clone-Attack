(function () {
    window.game = window.game || {};

    var Physics = function () {
        this.initialize();
    }

    var p = Physics.prototype;

    p.initialize = function () {
        
    }

    p.run = function (){
        var player = game.main.currentScene.player;

        if(!player.isGrounded && !player.isJumping){
            player.fall();
        }

        game.main.currentScene.enemy.forEach(function(element) {
            if(!element.isGrounded && !element.isJumping){
                element.fall();
            }
        }, this);
    }
    
    window.game.Physics = Physics;
}());