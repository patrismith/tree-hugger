'use strict';
var Player = require('../prefabs/player');
var Bear = require('../prefabs/bear');
var Boundary = require('../prefabs/boundary');

  function Level() {}
  Level.prototype = {
    create: function() {

        this.map = this.game.add.tilemap('forest');
        this.map.addTilesetImage('forest');
        this.layer = this.map.createLayer(0);
        this.layer.resizeWorld();
        this.map.setCollisionByExclusion([49, 50, 51, 52, 53, 54, 55,
                                          65, 66, 67, 68, 69,
                                          81, 82, 83, 84, 85]);

        this.player = new Player(this.game, 50, 50);

        this.bear = new Bear(this.game, 100, 100);
        this.game.add.existing(this.bear);

        this.rightBoundary = new Boundary(this.game, 256, 0);
        this.leftBoundary = new Boundary(this.game, -1, 0);
        this.game.add.existing(this.rightBoundary);
        this.game.add.existing(this.leftBoundary);

        this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.UP, Phaser.Keyboard.DOWN, Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT]);

        this.cursors = this.game.input.keyboard.createCursorKeys();

        this.game.camera.follow(this);
    },
    update: function() {

        this.game.physics.arcade.collide(this.player, this.layer);
        this.game.physics.arcade.collide(this.player, this.bear);
        this.game.physics.arcade.collide(this.player, this.rightBoundary);
        this.game.physics.arcade.collide(this.player, this.leftBoundary);

        // if player is near bear, tell bear to go to player
        if (this.bear.detectPlayer()) {
            this.bear.followPlayer();
        } else {
            this.bear.idleLoop();
        }

        // if camera gets to certain point, stop following player


        // player controls
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
