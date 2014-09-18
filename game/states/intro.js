'use strict';
var FadingImage = require('../prefabs/fadingImage');
var Dialogues = require('../prefabs/dialogues');

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

        this.style = {font: "12px Courier", fill: "#FFFFFF", align: "center"};

        this.textList = ["This is some text.", "This is the next stuff."];

        this.dialogues = new Dialogues(this.game, this.textList, this.style);
        this.game.add.existing(this.dialogues);

        this.game.time.events.add(Phaser.Timer.SECOND * 2, this.dialogues.start, this.dialogues);

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
