(function (window) {

    window.game = window.game || {}

    function GameOver() {
        this.initialize();
    }

    var p = GameOver.prototype = new createjs.Container();

    p.Container_initialize = p.initialize;

    p.msgTxt = null;
    p.GameOverContainer = null;
    p.background;  

    p.initialize = function () {     
        this.Container_initialize();
        this.addBG();
        this.addMessages();
        this.gameOverContainer();
        this.addButton("RETURN TO GAME MENU", this.gameMenu, 400);
        this.playGameOver();
    }
    p.addBG = function () {
        this.background = new createjs.Bitmap(game.assets.getAsset(game.assets.GAMEOVER_BACKGROUND));
        this.background.x = 0;
        this.background.y = 0;
        this.addChild(this.background);
    }

    p.addMessages = function () {
        this.msgTxt = new createjs.Text("G A M E  O V E R", '100px IronmanFont', '#000');
        this.msgTxt.x = canvas.width / 2;
        this.msgTxt.y = 50;
        this.msgTxt.textAlign = 'center';
        this.addChild(this.msgTxt);
    }

    p.gameOverContainer = function () {
        this.GameOverContainer = new createjs.Container();
        this.addChild(this.GameOverContainer);
    }

    p.addButton = function (text, onClick, y) {
        var btn, event;
        btn = new ui.SimpleButton(text, 200);
        btn.on('click',onClick,this);
        btn.regX = btn.width / 2;
        btn.x = canvas.width / 2;
        btn.y = y;
        btn.setButton({upColor:'FF0000', color:'#FFF', borderColor:'#FFF', overColor:'#900'});
        this.addChild(btn);
    }

    p.playGameOver = function (){
        createjs.Sound.play("gameOver_Music");
        createjs.Sound.play("gameOver_Voice");
    }

    p.gameMenu = function (e) {
        createjs.Sound.stop();
        createjs.Sound.play('intro', {loop: -1});
        this.dispatchEvent(game.GameStateEvents.MAIN_MENU);
    }

    window.game.GameOver = GameOver;
}(window));