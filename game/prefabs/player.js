'use strict';

var Player = function(game, x, y, frame) {
    Phaser.Sprite.call(this, game, x, y, 'player', frame);
    this.anchor.setTo(0.5,0.5);
    this.game.physics.arcade.enableBody(this);
    this.body.allowGravity = false;
    this.body.collideWorldBounds = true;
    this.animations.add('faceRight', [0]);
    this.animations.add('faceLeft', [5]);
    this.animations.add('walkRight', [1,2]);
    this.animations.add('walkLeft', [3,4]);
    this.action = 'idle';
};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {

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
