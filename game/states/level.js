'use strict';
var Player = require('../prefabs/player');

  function Level() {}
  Level.prototype = {
    create: function() {
        this.player = new Player(this.game, 50, 50);
        this.game.add.existing(this.player);

        this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.UP, Phaser.Keyboard.DOWN, Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT]);

        this.cursors = this.game.input.keyboard.createCursorKeys();
    },
    update: function() {

        if (this.cursors.right.isDown) {
            this.player.walkRight();
        } else if (this.cursors.left.isDown) {
            this.player.walkLeft();
        } else {
            this.player.stopX();
        }
        if (this.cursors.up.isDown) {
            this.player.walkUp();
        } else if (this.cursors.down.isDown) {
            this.player.walkDown();
        } else {
            this.player.stopY();
        }
        if (!this.cursors.right.isDown &&
            !this.cursors.left.isDown &&
            !this.cursors.up.isDown &&
            !this.cursors.down.isDown) {
            this.player.stopAnimation();
        }
    },
    paused: function() {
    },
    render: function() {
    },
    shutdown: function() {
    }
  };
module.exports = Level;
