'use strict';
var FadingImage = require('../prefabs/fadingImage');

  function Title() {}
  Title.prototype = {
    addFadingImage: function (key, name, x, y, time) {
        this[key] = new FadingImage(this.game, x, y, name, 0);
        this.game.add.existing(this[key]);
        this.game.time.events.add(Phaser.Timer.SECOND * time, this[key].fadeIn, this[key]);
    },
    create: function() {

        this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.UP, Phaser.Keyboard.DOWN, Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.SPACEBAR]);

        this.addFadingImage('tree', 'title-tree', 96, 0, 1);
        this.addFadingImage('title', 'title-treehugger', 16, 112, 2);
        this.addFadingImage('space', 'title-pressspace', 16, 144, 4);

        var key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        key.onDown.add(function(key)
                       {
                           this.tree.fadeOut();
                           this.title.fadeOut();
                           this.space.fadeOut();
                           this.game.time.events.add(Phaser.Timer.SECOND * 1, this.nextState, this);
                       }, this);
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
    },
    nextState: function () {
        this.game.state.start('intro');
    }
  };
module.exports = Title;
