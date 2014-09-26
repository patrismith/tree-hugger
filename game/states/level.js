'use strict';
var Player = require('../prefabs/player');
var Bear = require('../prefabs/bear');
var Boundary = require('../prefabs/boundary');

  function Level() {}
  Level.prototype = {
    create: function() {

        this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.UP, Phaser.Keyboard.DOWN, Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.SPACEBAR]);

        this.controls = {};
        this.controls.cursors = this.game.input.keyboard.createCursorKeys();
        this.controls.hug = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        this.map = this.game.add.tilemap('forest');
        this.map.addTilesetImage('forest');
        this.layer = this.map.createLayer(0);
        this.layer.resizeWorld();
        this.map.setCollisionByExclusion([49, 50, 51, 52, 53, 54, 55,
                                          65, 66, 67, 68, 69,
                                          81, 82, 83, 84, 85]);

        this.player = new Player(this.game, 50, 50, this.controls);

        this.bear = new Bear(this.game, 100, 100);
        this.game.add.existing(this.bear);

        this.rightBoundary = new Boundary(this.game, 256, 0);
        this.leftBoundary = new Boundary(this.game, -1, 0);
        this.game.add.existing(this.rightBoundary);
        this.game.add.existing(this.leftBoundary);

        this.game.camera.follow(this.player);
    },
    update: function() {

        this.game.physics.arcade.collide(this.player, this.layer);
        this.game.physics.arcade.collide(this.player, this.bear);
        this.game.physics.arcade.collide(this.player, this.rightBoundary);
        this.game.physics.arcade.collide(this.player, this.leftBoundary);

        // if player is near bear, tell bear to go to player
        //if (this.bear.detectPlayer()) {
        //    this.bear.followPlayer();
        //} else {
        //    this.bear.idleLoop();
        //}

        // if camera gets to certain point, stop following player
        if (this.game.camera.view.x + this.game.camera.view.width > 350) {
            this.game.camera.unfollow();
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
