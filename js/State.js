(function () {

    window.game = window.game || {};

    var GameStates = {
        MAIN_MENU:0,
        RUN_SCENE:1,
        GAME:2,
        CONTROLS_SCREEN:3,
        GAME_OVER:4,
        LEVEL1: 5,
        LEVEL2: 6,
        LEVEL3: 7
    }

    var GameStateEvents = {
        MAIN_MENU:'main menu event',
        GAME_OVER:'game over event',
        MAIN_MENU_SELECT:'game menu select event',
        GAME:'game event',
        CONTROLS_SCREEN:'control screen event',
        LEVEL1: "level 1",
        LEVEL2: "level 2",
        LEVEL3: "level 3"
    }

    window.game.GameStates = GameStates;
    window.game.GameStateEvents = GameStateEvents;

}());
