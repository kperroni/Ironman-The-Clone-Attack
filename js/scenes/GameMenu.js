(function (window) {

    window.game = window.game || {}

    function GameMenu() {
        this.initialize();
    }

    var p = GameMenu.prototype = new createjs.Container();

    p.Container_initialize = p.initialize;

    p.titleTxt = null;
    p.count = 0;
    p.subTitle = null;

    p.initialize = function () {
        this.Container_initialize();
        this.addTitle();
        this.addButton("PLAY GAME", this.playGame, 400);
        this.addButton("CONTROLS", this.showControls, 460);
    }

    p.addTitle = function () {
        this.titleTxt = new createjs.Text("I R O N  M A N", '100px IronmanFont', '#FFF');
        this.titleTxt.x = canvas.width / 2;
        this.titleTxt.y = 50;
        this.titleTxt.textAlign = 'center';
        this.addChild(this.titleTxt);

        this.subTitle = new createjs.Text("The clone attack", '50px IronmanFont', '#FFF');
        this.subTitle.x = canvas.width / 2;
        this.subTitle.y = 140;
        this.subTitle.textAlign = 'center';
        this.addChild(this.subTitle);
    }

    p.addButton = function (text, onClick, y) {
        var btn, event;
        btn = new ui.SimpleButton(text, 150);
        btn.on('click',onClick,this);
        btn.regX = btn.width / 2;
        btn.x = canvas.width / 2;
        btn.y = y;
        btn.setButton({upColor:'FF0000', color:'#FFF', borderColor:'#FFF', overColor:'#900'});
        this.addChild(btn);
    }

    p.playGame = function (e) {
        createjs.Sound.stop();
        this.dispatchEvent(game.GameStateEvents.LEVEL1);
    }

    p.showControls = function (e) {
        this.dispatchEvent(game.GameStateEvents.CONTROLS_SCREEN);
    }

    p.run = function () {
        this.titleTxt.alpha = Math.cos(this.count++ * 0.1) * 0.4 + 0.9;
        this.subTitle.alpha = Math.cos(this.count++ * 0.1) * 0.4 + 0.9;
    }

    window.game.GameMenu = GameMenu;
}(window));