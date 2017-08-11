    const BAR_SPACE_KEY = 32;
    const ARROW_KEY_LEFT = 37;
    const ARROW_KEY_UP = 38;
    const ARROW_KEY_RIGHT = 39;
    const ARROW_KEY_DOWN = 40;

    var leftKeyDown, rightKeyDown, upKeyDown = false;

    function onDPadDown(e){
        switch (e.keyCode){
            case ARROW_KEY_LEFT:
                leftKeyDown = true;
                break;
            case ARROW_KEY_RIGHT:
                rightKeyDown = true;
                break;
            case ARROW_KEY_UP:
                upKeyDown = true;
                break;
            case BAR_SPACE_KEY:
                var player = game.main.currentScene.player;
                player.shoot();
                break;
            default:
                console.log(e.keyCode);
        }
    }

    function onDPadUp(e){
        switch (e.keyCode){
            case ARROW_KEY_LEFT:
                leftKeyDown = false;
                break;
            case ARROW_KEY_RIGHT:
                rightKeyDown = false;
                break;
            case ARROW_KEY_UP:
                upKeyDown = false;
                break;
        }
    }

    function controlActions(){
        var player = game.main.currentScene.player;

        if(leftKeyDown){
            player.walk('LEFT')
        }else if(rightKeyDown){
            player.walk('RIGHT');
        }else{
            player.isWalking = false;
            if(!player.invulnerable)
                player.stand();
        }

        if(upKeyDown){
            player.jump();
        }else{
            player.isJumping = false;
        }
    }