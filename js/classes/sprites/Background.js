(function () {
    window.game = window.game || {};

    var Background = function (img, startX, starty) {
        this.initialize(img, startX, starty);
    }

    var p = Background.prototype = new createjs.Bitmap();

    p.Bitmap_initialize = p.initialize;

    p.initialize = function (img, startX, startY) {
        this.Bitmap_initialize(img);
        this.x = startX;
        this.setTransform(startX, startY, document.getElementById('canvas').width / img.width, document.getElementById('canvas').height / img.height);
        this.width = img.width * document.getElementById('canvas').width / img.width;
    }

    p.run = function (){
        var player = game.main.currentScene.player;

        if(this.x + this.width <= 0){
            this.x = document.getElementById('canvas').width - player.velocity;
        }
        
        if(player.x >= document.getElementById('canvas').width / 2 && player.isWalking  && !player.isShooting && player.direction == "RIGHT"){
            this.x -= player.velocity;
        }
    }
    
    window.game.Background = Background;
}());