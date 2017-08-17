(function (window) {

    window.game = window.game || {}

    function GameProject() {
        this.initialize();
    }

    var p = GameProject.prototype;

    p.currentGameStateFunction;
    p.currentGameState;
    p.currentScene;

    p.initialize = function () {
        canvas = document.getElementById('canvas');
        stage = new createjs.Stage(canvas);
        createjs.Ticker.setFPS(60);
        createjs.Ticker.on('tick', this.onTick, this);
        createjs.Touch.enable(stage);
        stage.enableMouseOver();
        game.assets = new game.AssetManager();
        this.preloadAssets();
    }

    p.preloadAssets = function () {
        this.preloader = new ui.Preloader('#F00', '#FFF');
        this.preloader.x = (canvas.width / 2) - (this.preloader.width / 2);
        this.preloader.y = (canvas.height / 2) - (this.preloader.height / 2);
        stage.addChild(this.preloader);
        game.assets.on(game.assets.ASSETS_PROGRESS, this.onAssetsProgress, this);
        game.assets.on(game.assets.ASSETS_COMPLETE, this.assetsReady, this);
        game.assets.preloadAssets();
    }

    p.runTransition = function () {
        this.currentScene.alpha = 0;
        createjs.Tween.get(this.currentScene).to({ alpha: 1 }, 1000);
    }

    p.onAssetsProgress = function () {
        this.preloader.update(game.assets.loadProgress);
        stage.update();
    }

    p.assetsReady = function () {
        stage.removeChild(this.preloader);
        stage.update();
        this.gameReady();
    }

    p.gameReady = function () {
        createjs.Ticker.setFPS(60);
        createjs.Ticker.on("tick", this.onTick, this);
        createjs.Sound.play('intro', { loop: -1 });
        this.changeState(game.GameStates.MAIN_MENU);
    }

    p.changeState = function (state) {
        this.currentGameState = state;
        switch (this.currentGameState) {
            case game.GameStates.MAIN_MENU:
                this.currentGameStateFunction = this.gameStateMainMenu;
                break;
            case game.GameStates.RUN_SCENE:
                this.currentGameStateFunction = this.gameStateRunScene;
                break;
            case game.GameStates.GAME_OVER:
                this.currentGameStateFunction = this.gameStateGameOver;
                break;
            case game.GameStates.END_GAME:
                this.currentGameStateFunction = this.gameStateEndGame;
                break;
            case game.GameStates.CONTROLS_SCREEN:
                this.currentGameStateFunction = this.gameStateControlScreen;
                break;
            case game.GameStates.LEVEL1:
                this.currentGameStateFunction = this.gameStateLevel1;
                break;
            case game.GameStates.LEVEL2:
                this.currentGameStateFunction = this.gameStateLevel2;
                break;
            case game.GameStates.LEVEL3:
                this.currentGameStateFunction = this.gameStateLevel3;
                break;
        }

        if (this.currentScene != null)
            this.runTransition();
    }

    p.onStateEvent = function (e, data) {
        this.changeState(data.state);
    }

    p.gameStateMainMenu = function () {
        var scene = new game.GameMenu();
        scene.on(game.GameStateEvents.LEVEL1, this.onStateEvent, this, false, { state: game.GameStates.LEVEL1 });
        scene.on(game.GameStateEvents.CONTROLS_SCREEN, this.onStateEvent, this, false, { state: game.GameStates.CONTROLS_SCREEN });
        stage.addChild(scene);
        stage.removeChild(this.currentScene);
        this.currentScene = scene;
        this.changeState(game.GameStates.RUN_SCENE);
    }

    p.gameStateGameOver = function () {
        var scene = new game.GameOver();
        stage.addChild(scene);
        scene.on(game.GameStateEvents.MAIN_MENU, this.onStateEvent, this, false, { state: game.GameStates.MAIN_MENU });
        stage.removeChild(this.currentScene);
        this.currentScene = scene;
        this.changeState(game.GameStates.RUN_SCENE);
    }

    p.gameStateEndGame = function () {
        var scene = new game.EndGame();
        stage.addChild(scene);
        scene.on(game.GameStateEvents.MAIN_MENU, this.onStateEvent, this, false, { state: game.GameStates.MAIN_MENU });
        stage.removeChild(this.currentScene);
        this.currentScene = scene;
        this.changeState(game.GameStates.RUN_SCENE);
    }

    p.gameStateControlScreen = function () {
        var scene = new game.ControlsView();
        stage.addChild(scene);
        scene.on(game.GameStateEvents.MAIN_MENU, this.onStateEvent, this, false, { state: game.GameStates.MAIN_MENU });
        stage.removeChild(this.currentScene);
        this.currentScene = scene;
        this.changeState(game.GameStates.RUN_SCENE);
    }

    p.gameStateLevel1 = function () {
        var scene = new game.Level1();
        stage.addChild(scene);
        scene.on(game.GameStateEvents.GAME_OVER, this.onStateEvent, this, false, { state: game.GameStates.GAME_OVER });
        scene.on(game.GameStateEvents.LEVEL2, this.onStateEvent, this, false, { state: game.GameStates.LEVEL2 });
        stage.removeChild(this.currentScene);
        this.currentScene = scene;
        this.changeState(game.GameStates.RUN_SCENE);
    }

    p.gameStateLevel2 = function () {
        var scene = new game.Level2();
        stage.addChild(scene);
        scene.on(game.GameStateEvents.GAME_OVER, this.onStateEvent, this, false, { state: game.GameStates.GAME_OVER });
        scene.on(game.GameStateEvents.LEVEL3, this.onStateEvent, this, false, { state: game.GameStates.LEVEL3 });
        stage.removeChild(this.currentScene);
        this.currentScene = scene;
        this.changeState(game.GameStates.RUN_SCENE);
    }

    p.gameStateLevel3 = function () {
        var scene = new game.Level3();
        stage.addChild(scene);
        scene.on(game.GameStateEvents.GAME_OVER, this.onStateEvent, this, false, { state: game.GameStates.GAME_OVER });
        scene.on(game.GameStateEvents.END_GAME, this.onStateEvent, this, false, { state: game.GameStates.END_GAME });
        stage.removeChild(this.currentScene);
        this.currentScene = scene;
        this.changeState(game.GameStates.RUN_SCENE);
    }

    p.gameStateRunScene = function () {
        if (this.currentScene.run) {
            this.currentScene.run();
        }
    }

    p.run = function () {
        if (this.currentGameStateFunction != null) {
            this.currentGameStateFunction();
        }
    }

    p.onTick = function (e) {
        this.run();
        stage.update();
    }

    window.game.GameProject = GameProject;

}(window));