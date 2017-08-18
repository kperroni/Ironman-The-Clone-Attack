(function (window) {

    window.game = window.game || {}

    function Level3() {
        this.initialize();
    }

    var p = Level3.prototype = new createjs.Container();

    p.Container_initialize = p.initialize;

    p.scoreText = null
    p.energyBarText = null;
    p.level3Container = null;
    p.background;
    p.secondBackground;
    p.player;
    p.exitDoor;
    p.energyBar;
    p.portrait;
    p.healthBar;
    p.physics;
    p.flyEnemy = Array();
    p.enemy = Array();
    p.bullets = Array();
    p.blood = Array();
    p.explosion = Array();
    p.floor = Array();
    p.coin = Array();
    p.heart = Array();
    p.runningScene = true;
    p.exited = false;
    p.map = [
        [0,0,0,0,0,0,0,0,0,0,0,0,3,3,3,3,0,0,0 ,0,0,0,3,3,3,3,0,0,0,0,3,3,3,3,3,0,0,0 ,0,0,0,0,0,3,0,0,3,0,0,3,0,0,0,0,0,0,0 ,0,0,0,0,0,0,3,0,0,3,0,0,3,0,0,0,0,0,0 ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,2,5,0 ,0,3,0,3,0,3,0,3,0,3,0,3,0,3,0,3,0,3,0 ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ,0,0,0,0,0,0,0,0,5,5,0,0,0,0,0,0,0,0,0 ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0 ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ,0,6,0,0,0,0,0,0,0,0,2,5,0,2,0,0,0,0,0 ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ,0,0,0,0,5,5,0,0,1,1,0,0,0,0,0,0,0,0,0 ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ,0,0,0,0,0,0,0,0,6,0,0,5,0,2,0,5,0,0,0 ,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0 ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,6,0,0,0,0,0,0,0,0,0,0,0,0 ,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0 ,0,0,0,0,0,0,5,2,5,5,2,5,0,0,0,0,0,0,0 ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0 ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0 ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0 ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ,0,0,0,5,0,5,0,5,0,5,0,5,0,5,0,5,0,5,0 ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,5,0,5,0,5,0,0,0,0,0,0,0,0,0 ,0,0,0,2,5,0,2,0,0,0,0,0,0,0,0,0,0,0,0 ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ,0,0,0,0,5,2,5,0,0,0,0,0,0,0,0,0,0,0,0 ,0,0,0,0,0,0,2,0,0,0,2,0,0,0,0,0,2,0,0 ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ,0,0,0,0,0,0,0,0,7,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0 ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0 ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0 ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ,0,0,0,0,0,0,0,0,0,0,6,0,0,0,0,0,0,0,0 ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,5,0,0,0,0,5,0,0,0,0,0,0 ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,4,0,0,0,0,0,0,0,0,2,0,0,2,0,0,0,0,0 ,0,0,0,0,0,0,2,0,0,2,0,0,2,0,0,0,0,0,0 ,0,0,0,2,0,0,0,0,2,0,0,0,0,0,0,2,0,0,0 ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0 ,0,0,0,2,0,2,0,0,0,0,0,0,0,2,2,0,0,0,0 ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ];

    p.initialize = function () {    
        createjs.Sound.play('level3_SN', {loop: -1}); 
        window.onkeydown = onDPadDown;
        window.onkeyup = onDPadUp;
        this.Container_initialize();
        this.readMap();
        this.addBG();
        this.addEnemy();
        this.addPhysics();
        this.addFloor();
        this.addCoin();
        this.addHeart();
        this.addMessages();
        this.addEnergyBar();
        this.addHealth();
        this.addPortrait();
        this.addDoor();
        this.addPlayer();
        this.createlevel3Container();
    }

    p.readMap = function(){
        this.enemy = Array();
        this.flyEnemy = Array();
        this.bullets = Array();
        this.blood = Array();
        this.floor = Array();
        this.coin = Array();
        this.heart = Array();

        for(i = 0; i < this.map.length; i++){
            for(j = 0; j < this.map[i].length; j++){
                switch (this.map[i][j]){
                    case 1: //Floors
                        this.floor.push(new game.Floor(new createjs.SpriteSheet(game.assets.getAsset(game.assets.FLOOR)), j * 48, i * 48));
                        break;
                    case 2: //Enemie - Hulk
                        this.enemy.push(new game.Enemy(new createjs.SpriteSheet(game.assets.getAsset(game.assets.HULK)), j * 48, i * 48 - 80));
                        break;
                    case 3: //FlyEnemies
                        this.flyEnemy.push(new game.FlyEnemy(new createjs.SpriteSheet(game.assets.getAsset(game.assets.FLYENEMY)), j * 48));
                        break;
                    case 4: //Player
                        this.player = new game.Player(new createjs.SpriteSheet(game.assets.getAsset(game.assets.IRONMAN)), j * 48, i * 48 - 80);
                        break;
                    case 5: //Coin
                        this.coin.push(new game.Coin(new createjs.SpriteSheet(game.assets.getAsset(game.assets.COIN)), j * 48, i * 48));
                        break;
                    case 7: //Door
                        this.exitDoor = new game.Door(new createjs.SpriteSheet(game.assets.getAsset(game.assets.DOOR)), j * 48, i * 60 - 30);
                        break;
                        case 6: //Heart
                        this.heart.push(new game.Heart(new createjs.SpriteSheet(game.assets.getAsset(game.assets.HEART)), j * 48, i * 48));
                        break; 
                    default:
                        break;
                }
            }
        }
    }

    p.addBG = function () {
        this.background = new game.Background(game.assets.getAsset(game.assets.LEVEL3_BACKGROUND), 0, 0);
        this.secondBackground = new game.Background(game.assets.getAsset(game.assets.LEVEL3_BACKGROUND), document.getElementById('canvas').width, 0);
        this.addChild(this.secondBackground);
        this.addChild(this.background);
    }

    p.addEnergyBar = function () {
        this.energyBar = new game.EnergyBar();
        this.addChild(this.energyBar);
    }

    p.addHealth = function (){
        this.healthBar = new game.Health(this.player.hitPoints);
        this.addChild(this.healthBar);
    }

    p.addPortrait = function (){
        this.portrait = new createjs.Bitmap(game.assets.getAsset(game.assets.PORTRAIT));
        this.portrait.x = 20;
        this.portrait.y = 20;
        this.addChild(this.portrait);
    }

    p.addDoor = function () {
        this.addChild(this.exitDoor);
    }

    p.addPlayer = function () {
        
        this.addChild(this.player);
    }

    p.addBullets = function(){
        var bullet = new game.Laser(new createjs.SpriteSheet());
    }

    p.addEnemy = function () {
        this.enemy.forEach(function (element) {
            element.damage = 6;
            this.addChild(element);
        }, this);

        this.flyEnemy.forEach(function (element) {
            element.damage = 2;
            this.addChild(element);
        }, this);
    }

    p.addPhysics = function () {
        this.physics = new game.Physics();
    }

    p.addFloor = function () {
        this.floor.forEach(function (element) {
            this.addChild(element);
        }, this);
    }

    p.addCoin = function () {
        this.coin.forEach(function (element) {
            this.addChild(element);
        }, this);
    }

    p.addHeart = function () {
        this.heart.forEach(function (element) {
            this.addChild(element);
        }, this);
    }

    p.addMessages = function () {
        var score = new createjs.Text("0", '40px IronmanFont', '#FFF');
        score.x = canvas.width - 200;
        score.y = 15;
        score.text = "Score";
        this.addChild(score);

        this.scoreText = new createjs.Text("0", '40px IronmanFont', '#FFF');
        this.scoreText.x = canvas.width - 80;
        this.scoreText.y = 15;
        this.addChild(this.scoreText);
        
        this.energyBarText = new createjs.Text("100%", '24px IronmanFont', '#FFF');
        this.energyBarText.x = 45;
        this.energyBarText.y = 155;
        this.addChild(this.energyBarText);
    }

    p.createlevel3Container = function () {
        this.level3Container = new createjs.Container();
        this.addChild(this.level3Container);
    }

    p.update = function () {
        controlActions();
        this.physics.run();
        this.background.run();
        this.secondBackground.run();
        this.player.checkBattery();
        this.exitDoor.run();

        for (var index = 0; index < this.floor.length; index++) {
            var element = this.floor[index];

            element.run();

            if (element.x + element.getBounds().width < 0) {
                this.removeChild(element);
                this.floor.splice(index, 1);
            }
        }

        for (var index = 0; index < this.coin.length; index++) {
            var element = this.coin[index];

            element.run();

            if (element.x + element.getBounds().width < 0 || element.collected) {
                this.removeChild(element);
                this.coin.splice(index, 1);
            }
        }

        for (var index = 0; index < this.heart.length; index++) {
            var element = this.heart[index];

            element.run();

            if (element.x + element.getBounds().width < 0 || element.collected) {
                this.removeChild(element);
                this.heart.splice(index, 1);
            }
        }

        for (var index = 0; index < this.flyEnemy.length; index++) {
            var element = this.flyEnemy[index];

            element.run();

            if (element.x + element.getBounds().width < 0 || !element.isAlive) {
                this.removeChild(element);
                this.flyEnemy.splice(index, 1);
            }
        }

        for (var index = 0; index < this.enemy.length; index++) {
            var element = this.enemy[index];

            element.run();

            if (element.x + element.getBounds().width < 0) {
                this.removeChild(element);
                this.enemy.splice(index, 1);
            }
        }

        for (var index = 0; index < this.bullets.length; index++) {
            var element = this.bullets[index];
            
            element.run();

            if (element.x + element.getBounds().width < 0 || element.x > canvas.width || !element.shouldDie) {
                this.removeChild(element);
                this.bullets.splice(index, 1);
            }
        }

        for (var index = 0; index < this.blood.length; index++) {
            var element = this.blood[index];

            element.run();

            if (element.x + element.getBounds().width < 0) {
                this.removeChild(element);
                this.blood.splice(index, 1);
            }
        }

        for (var index = 0; index < this.explosion.length; index++) {
            var element = this.explosion[index];

            element.run();

            if (element.x + element.getBounds().width < 0 || element.exploded) {
                this.removeChild(element);
                this.explosion.splice(index, 1);
            }
        }
    }

    p.checkLevel3 = function () {
        var nextLevel = true;
        if(!this.runningScene){
            this.dispatchEvent(game.GameStateEvents.GAME_OVER);
            nextLevel = false;
        }
    }

    p.finishLevel = function(){
        createjs.Sound.stop();
        this.dispatchEvent(game.GameStateEvents.END_GAME);
    }

    p.run = function () {
        this.update();
        this.checkLevel3();
    }

    window.game.Level3 = Level3;

}(window));