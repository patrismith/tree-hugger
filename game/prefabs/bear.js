'use strict';

var Bear = function(game, x, y, frame) {
    Phaser.Sprite.call(this, game, x, y, 'bear', frame);
    this.anchor.setTo(0.5,0.5);
    this.game.physics.arcade.enableBody(this);
    this.body.allowGravity = false;
    this.body.collideWorldBounds = true;
    this.animations.add('walkRight', [0, 1]);
    this.animations.add('walkLeft', [2, 3]);
};

Bear.prototype = Object.create(Phaser.Sprite.prototype);
Bear.prototype.constructor = Bear;

Bear.prototype.update = function() {

};

Bear.prototype.detectPlayer = function () {
    return true;
};

Bear.prototype.followPlayer = function () {

};

Bear.prototype.idleLoop = function () {

};

Bear.prototype.walkRight = function() {
    this.animations.play('walkRight', 10, true);
    this.body.velocity.x = 65;
};

Bear.prototype.walkLeft = function() {
    this.animations.play('walkLeft', 10, true);
    this.body.velocity.x = -65;
};

Bear.prototype.walkUp = function() {
    if (this.facingRight()) {
        this.animations.play('walkRight');
    } else if (this.facingLeft()) {
        this.animations.play('walkLeft');
    }
    this.body.velocity.y = -65;
};

Bear.prototype.walkDown = function() {
    if (this.facingRight()) {
        this.animations.play('walkRight');
    } else if (this.facingLeft()) {
        this.animations.play('walkLeft');
    }
    this.body.velocity.y = 65;

};

Bear.prototype.facingRight = function() {
    return this.animations.currentAnim.name === 'faceRight' ||
        this.animations.currentAnim.name === 'walkRight';
};

Bear.prototype.facingLeft = function() {
    return this.animations.currentAnim.name === 'faceLeft' ||
        this.animations.currentAnim.name === 'walkLeft';
};

module.exports = Bear;
