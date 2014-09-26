'use strict';

var Player = function(game, x, y, controls) {
    Phaser.Sprite.call(this, game, x, y, 'player');
    this.anchor.setTo(0.5,0.5);
    this.game.physics.arcade.enableBody(this);
    this.body.allowGravity = false;
    this.body.collideWorldBounds = true;
    this.animations.add('faceRight', [0]);
    this.animations.add('faceLeft', [5]);
    this.animations.add('walkRight', [1,2]);
    this.animations.add('walkLeft', [3,4]);
    this.animations.add('hugRight', [6,7,8,8,7,6]);
    this.animations.add('hugLeft', [11,10,9,9,10,11]);
    this.controls = controls;

    this.game.add.existing(this);
};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {

    if (this.controls.cursors.right.isDown) {
        this.walkRight();
    } else if (this.controls.cursors.left.isDown) {
        this.walkLeft();
    } else {
        this.stopX();
    }

    if (this.controls.cursors.up.isDown) {
        this.walkUp();
    } else if (this.controls.cursors.down.isDown) {
        this.walkDown();
    } else {
        this.stopY();
    }

    if (this.controls.hug.isDown) {
        this.hug();
    }

    if (!this.controls.cursors.right.isDown &&
        !this.controls.cursors.left.isDown &&
        !this.controls.cursors.up.isDown &&
        !this.controls.cursors.down.isDown &&
        !this.controls.hug.isDown) {
        this.stopAnimation();
    }

};

Player.prototype.hug = function () {
    if (this.facingLeft()) {
        this.hugLeft();
    } else if (this.facingRight()) {
        this.hugRight();
    }
};

Player.prototype.hugRight = function () {
    this.animations.play('hugRight', 8);
    this.body.velocity.x = 0;
    this.body.velocity.y = 0;
};

Player.prototype.hugLeft = function () {
    this.animations.play('hugLeft', 8);
    this.body.velocity.x = 0;
    this.body.velocity.y = 0;
};

Player.prototype.walkRight = function() {
    this.animations.play('walkRight', 10, true);
    this.body.velocity.x = 75;
};

Player.prototype.walkLeft = function() {
    this.animations.play('walkLeft', 10, true);
    this.body.velocity.x = -75;
};

Player.prototype.walkUp = function() {
    if (this.facingRight()) {
        this.animations.play('walkRight');
    } else if (this.facingLeft()) {
        this.animations.play('walkLeft');
    }
    this.body.velocity.y = -75;
};

Player.prototype.walkDown = function() {
    if (this.facingRight()) {
        this.animations.play('walkRight');
    } else if (this.facingLeft()) {
        this.animations.play('walkLeft');
    }
    this.body.velocity.y = 75;

};

Player.prototype.facingRight = function() {
    return this.animations.currentAnim.name === 'faceRight' ||
        this.animations.currentAnim.name === 'walkRight';
};

Player.prototype.facingLeft = function() {
    return this.animations.currentAnim.name === 'faceLeft' ||
        this.animations.currentAnim.name === 'walkLeft';
};

Player.prototype.stopAnimation = function () {
    if (this.facingRight()) {
        this.animations.play('faceRight');
    } else if (this.facingLeft()) {
        this.animations.play('faceLeft');
    }
};

Player.prototype.stopX = function() {
    this.body.velocity.x = 0;
};

Player.prototype.stopY = function() {
    this.body.velocity.y = 0;
};

module.exports = Player;
