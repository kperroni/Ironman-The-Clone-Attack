(function (window) {
    
        window.game = window.game || {}
    
        function EndGame() {
            this.initialize();
        }
    
        var p = EndGame.prototype = new createjs.Container();
    
        p.Container_initialize = p.initialize;
    
        p.msgTxtTitle = null;
        p.msgTxtBody = null;
        p.endGameContainer = null;
        p.background;  
    
        p.initialize = function () {     
            this.Container_initialize();
            this.addBG();
            this.addMessages();
            this.endGameContainer();
            this.addButton("RETURN TO GAME MENU", this.gameMenu, 400);
            this.playEndGame();
        }
        p.addBG = function () {
            this.background = new createjs.Bitmap(game.assets.getAsset(game.assets.ENDGAME_BACKGROUND));
            this.background.x = 0;
            this.background.y = 0;
            this.addChild(this.background);
        }
    
        p.addMessages = function () {
            this.msgTxtTitle = new createjs.Text("YOU WIN!", '100px IronmanFont', '#fff');
            this.msgTxtTitle.x = 0;              
            this.msgTxtTitle.y = 50;
            this.msgTxtTitle.textAlign = 'left';
            this.addChild(this.msgTxtTitle);

            this.msgTxtBody = new createjs.Text("YOU SURVIVED \n\n THE HULK MENACE!", '50px IronmanFont', '#fff');
            this.msgTxtBody.x = 0;              
            this.msgTxtBody.y = 200;
            this.msgTxtBody.textAlign = 'left';
            this.addChild(this.msgTxtBody);
        }
    
        p.endGameContainer = function () {
            this.endGameContainer = new createjs.Container();
            this.addChild(this.endGameContainer);
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
    
        p.playEndGame = function (){
            createjs.Sound.play('win_music');
        }
    
        p.gameMenu = function (e) {
            createjs.Sound.stop();
            createjs.Sound.play('intro', {loop: -1});
            this.dispatchEvent(game.GameStateEvents.MAIN_MENU);
        }
    
        window.game.EndGame = EndGame;
    }(window));