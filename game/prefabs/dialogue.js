'use strict';

var Dialogue = function(game, x, y, text, style) {
  Phaser.Text.call(this, game, x, y, text, style);

  // initialize your prefab here

};

Dialogue.prototype = Object.create(Phaser.Text.prototype);
Dialogue.prototype.constructor = Dialogue;

Dialogue.prototype.update = function() {

  // write your prefab's specific update code here

};

module.exports = Dialogue;
