(function () {

    window.game = window.game || {};

    var AssetManager = function () {
        this.initialize();
    }
    var p = AssetManager.prototype = new createjs.EventDispatcher();

    p.EventDispatcher_initialize = p.initialize;

    //sounds
    p.LASER = 'laser';
    p.PUNCH = 'punch';
    p.DEATH = 'death';
    p.GAMEOVER_MUSIC = "gameOver_Music";
    p.GAMEOVER_VOICE = "gameOver_Voice";
    p.WIN_MUSIC = "win_music";
    p.EXPLOSION_SOUND = "explosion_sound";

    //graphics
    p.IRONMAN = 'ironman';
    p.HULK = 'hulk';
    p.FLYENEMY = 'flyenemy';

    p.INTRO = 'intro';

    p.LEVEL1_BACKGROUND = "level1_BG";
    p.LEVEL1_SOUND = "level1_SN";
    p.JET = "jet";

    p.LEVEL2_BACKGROUND = "level2_BG";
    p.LEVEL2_SOUND = "level2_SN";

    p.LEVEL3_BACKGROUND = "level3_BG";
    p.LEVEL3_SOUND = "level3_SN";

    p.GAMEOVER_BACKGROUND = "gameover_BG";
    p.ENDGAME_BACKGROUND = "endgame_BG";

    p.BLOOD = "blood";
    p.FLOOR = "floor";
    p.ENERGY = "energy";
    p.HEALTH = "health";
    p.KEYBOARD = "keyboard";
    p.PORTRAIT = 'portrait';
    p.EXPLOSION = 'explosion';
    p.COIN = 'coin';
    p.CASH = 'cash';
    p.HULK_SCREAM = 'hulk_sd';

    //events
    p.ASSETS_PROGRESS = 'assets progress';
    p.ASSETS_COMPLETE = 'assets complete';

    p.soundsPath = 'assets/sound/';
    p.imgPath = 'assets/img/';
    p.stylePath = 'assets/styles/';

    p.loadManifest = null;
    p.queue = null;
    p.loadProgress = 0;

    p.initialize = function () {
        this.EventDispatcher_initialize();
        this.loadManifest = [
            {id:this.LASER, src: this.soundsPath + "laser.wav"},
            {id:this.PUNCH, src: this.soundsPath + "punch.mp3"},
            {id:this.EXPLOSION_SOUND, src: this.soundsPath + "explosion.mp3"},
            {id:this.DEATH, src: this.soundsPath + "death.mp4"},
            {id:this.INTRO, src: this.soundsPath + "intro.mp3"},
            {id:this.WIN_MUSIC, src: this.soundsPath + "win.mp3"},
            {id: this.LEVEL1_SOUND, src: this.soundsPath + "level1.mp3"},
            {id: this.LEVEL2_SOUND, src: this.soundsPath + "level2.mp3"},
            {id: this.LEVEL3_SOUND, src: this.soundsPath + "level3.mp3"},
            {id: this.GAMEOVER_MUSIC, src: this.soundsPath + "gameOverMusic.mp3"},
            {id: this.GAMEOVER_VOICE, src: this.soundsPath + "gameOverVoice.mp3"},
            {id: this.CASH, src: this.soundsPath + "cash.mp3"},
            {id: this.HULK_SCREAM, src: this.soundsPath + "hulk.mp3"},
            {id: this.JET, src: this.soundsPath + "jet.wav"},
            {id: this.IRONMAN, src: this.imgPath + "IronMan.json"},
            {id: this.HULK, src: this.imgPath + "Hulk.json"},
            {id: this.BLOOD, src: this.imgPath + "Blood.json"},
            {id: this.FLOOR, src: this.imgPath + "tile.json"},
            {id: this.ENERGY, src: this.imgPath + "energy.json"},
            {id: this.HEALTH, src: this.imgPath + "health.json"},
            {id: this.COIN, src: this.imgPath + "Coin.json"},
            {id: this.FLYENEMY, src: this.imgPath + "flyEnemy.json"},
            {id: this.EXPLOSION, src: this.imgPath + "Explosion.json"},
            {id: this.LEVEL1_BACKGROUND, src: this.imgPath + "Factory_BG.jpg"},
            {id: this.LEVEL2_BACKGROUND, src: this.imgPath + "Basement_BG2.png"},
            {id: this.LEVEL3_BACKGROUND, src: this.imgPath + "Lab_BG3.jpg"},
            {id: this.GAMEOVER_BACKGROUND, src: this.imgPath + "Gameover_BG2.jpg"},
            {id: this.ENDGAME_BACKGROUND, src: this.imgPath + "End_BG4.jpg"},
            {id: this.PORTRAIT, src: this.imgPath + "IronManPortrait.jpg"},
            {id: this.KEYBOARD, src: this.imgPath + "keyboard.png"},
            {id: "font", src: this.stylePath + "IRON MAN OF WAR 002 NCV.ttf"}
        ];
    }
    p.preloadAssets = function () {
        var progressProxy = new createjs.proxy(this.assetsProgress, this);
        var completeProxy = new createjs.proxy(this.assetsLoaded, this);
        createjs.Sound.initializeDefaultPlugins();
        this.queue = new createjs.LoadQueue();
        this.queue.installPlugin(createjs.Sound);
        this.queue.addEventListener('complete', completeProxy);
        this.queue.addEventListener('progress', progressProxy);
        createjs.Sound.alternateExtensions = ["ogg"];
        this.queue.loadManifest(this.loadManifest);
    }
    p.assetsProgress = function (e) {
        this.loadProgress = e.progress;
        var event = new createjs.Event(this.ASSETS_PROGRESS);
        this.dispatchEvent(event);
    }
    p.assetsLoaded = function (e) {
        var event = new createjs.Event(this.ASSETS_COMPLETE);
        this.dispatchEvent(event);
    }
    p.getAsset = function (asset) {
        return this.queue.getResult(asset);
    }

    window.game.AssetManager = AssetManager;
}());
