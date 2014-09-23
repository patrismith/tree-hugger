'use strict';
var FadingImage = require('../prefabs/fadingImage');
var Dialogue = require('../prefabs/dialogue');

  function Intro() {}
  Intro.prototype = {
      // TODO: a lot here is duplicated from title.js
    addFadingImage: function (key, name, x, y, time) {
        this[key] = new FadingImage(this.game, x, y, name, 0);
        this.game.add.existing(this[key]);
        this.game.time.events.add(Phaser.Timer.SECOND * time, this[key].fadeIn, this[key]);
    },
    create: function() {
        this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.UP, Phaser.Keyboard.DOWN, Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.SPACEBAR]);

        this.addFadingImage('figure', 'intro-figure', 0, 0, 1);

        this.style = {font: "12px Courier", fill: "#FFFFFF", align: "left"};

        this.textList = ["I was supposed to be\nretired.\n        \nBut then, it\nhappened.\n        \nCode Red.",
                         "Animals, overcome\nwith negative\nemotions...",
                         "This job's too\ndangerous for your\ntypical animal\ntherapist.\nOf course."];

        this.dialogue = new Dialogue(this.game, 104, 0, this.style, this.textList);
        this.game.add.existing(this.dialogue);

        this.game.time.events.add(Phaser.Timer.SECOND * 2, this.dialogue.start, this.dialogue);
        var key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        key.onDown.add(this.isDialogueOver, this);
    },
    isDialogueOver: function() {
        if (this.dialogue.finished) {
            this.endState();
        }
    },
    endState: function() {
        this.game.state.start('level');
    },
    update: function() {
      // state update code
    },
    paused: function() {
      // This method will be called when game paused.
    },
    render: function() {
      // Put render operations here.
    },
    shutdown: function() {
      // This method will be called when the state is shut down
      // (i.e. you switch to another state from this one).
    }
  };
module.exports = Intro;
