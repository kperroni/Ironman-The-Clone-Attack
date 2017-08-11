(function () {

    window.ui = window.ui || {};

    var SimpleButton = function (label, width) {
        this.label = label;
        this.width = width;
        this.initialize();
    }
    var p = SimpleButton.prototype = new createjs.Container();

    // SimpleButton properties
    p.label;
    p.width;
    p.height;
    p.background;
    p.labelTxt;
    p.fontSize = 24;
    p.borderColor = '#000';
    p.buttonColor = '#000';
    p.upColor = '#F00';
    p.overColor = '#000';

    p.Container_initialize = p.initialize;

    p.initialize = function () {
        this.Container_initialize();
        this.drawButton();
        this.setButtonListeners();
    }

    p.drawButton = function(){
        this.removeAllChildren();
        this.labelTxt = new createjs.Text(this.label,this.fontSize + 'px IronmanFont',this.color);
        this.labelTxt.textAlign = 'center';
        this.labelTxt.textBaseline = 'top';
        this.height = 45;
        this.labelTxt.x = this.width / 2;
        this.labelTxt.y = 8;
        this.background = new createjs.Shape();
        this.background.graphics.beginStroke(this.borderColor).beginFill(this.buttonColor).drawRect(0,0,this.width,this.height);
        this.addChild(this.background,this.labelTxt);
    }

    p.setButtonListeners = function (){
        this.cursor = 'pointer';
        this.on('rollover',this.onButtonOver);
        this.on('rollout',this.onButtonOut);
    }

    p.onButtonOver = function(){
        this.buttonColor = this.overColor;
        this.drawButton();
    }

    p.onButtonOut = function(){
        this.buttonColor = this.upColor;
        this.drawButton();
    }

    // Set all
    p.setButton = function(obj){
        this.set(obj);
        this.buttonColor = obj.upColor != undefined ? obj.upColor : this.buttonColor;
        this.drawButton();
    }

    // Set individual
    p.setUpColor = function(color){
        this.upColor = color;
        this.buttonColor = color;
        this.drawButton();
    }

    p.setOverColor = function(color){
        this.overColor = color;
    }

    p.setColor = function(color){
        this.color = this.labelTxt.color = color;
    }
    
    p.setFontSize = function(size){
        this.fontSize = size;
        this.drawButton();
    }

    window.ui.SimpleButton = SimpleButton;
}());
