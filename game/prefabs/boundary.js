'use strict';

var Boundary = function(game, xOffset, yOffset, frame) {
    Phaser.Sprite.call(this, game, 0, 0, 'boundary', frame);
    this.game.physics.arcade.enableBody(this);
    this.body.allowGravity = false;
    this.body.immovable = true;
    this.fixedToCamera = true;
    this.cameraOffset.setTo(xOffset,yOffset);

};

Boundary.prototype = Object.create(Phaser.Sprite.prototype);
Boundary.prototype.constructor = Boundary;

Boundary.prototype.update = function() {

  // write your prefab's specific update code here

};

module.exports = Boundary;
