(function (window) {

    window.game = window.game || {}

    function ControlsView() {
        this.initialize();
    }

    var p = ControlsView.prototype = new createjs.Container();

    p.Container_initialize = p.initialize;

    p.titleTxt = null;
    p.count = 0;

    p.initialize = function () {
        this.Container_initialize();
        this.addTitle();
        this.addControlsImage();
        this.addButton();
    }

    p.addTitle = function () {
        this.titleTxt = new createjs.Text("CONTROLS", '60px IronmanFont', '#FFF');
        this.titleTxt.x = canvas.width / 2;
        this.titleTxt.y = 100;
        this.titleTxt.textAlign = 'center';
        this.addChild(this.titleTxt);
    }

    p.addControlsImage = function(){
        var img = new createjs.Bitmap(game.assets.getAsset(game.assets.KEYBOARD));
        img.x = 100;
        img.y = canvas.height / 2;
        this.addChild(img);
    }

    p.addButton = function () {
        var btn, event;
        btn = new ui.SimpleButton('BACK', 150);
        btn.on('click',this.showMenu,this);
        btn.regX = btn.width / 2;
        btn.x = canvas.width / 2;
        btn.y = canvas.height - btn.height;
        btn.setButton({upColor:'FF0000', color:'#FFF', borderColor:'#FFF', overColor:'#900'});
        this.addChild(btn);
    }

    p.showMenu = function (e) {
        this.dispatchEvent(game.GameStateEvents.MAIN_MENU);
    }

    p.run = function () {
        //this.titleTxt.alpha = Math.cos(this.count++ * 0.1) * 0.4 + 0.6;
    }

    window.game.ControlsView = ControlsView;
}(window));