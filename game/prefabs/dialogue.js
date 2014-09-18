'use strict';

var Dialogue = function(game, x, y, text, style) {
  Phaser.Text.call(this, game, x, y, '', style);

  this.content = text;
  this.char = 0;
  //this.addChar();
  this.complete = false;
};

Dialogue.prototype = Object.create(Phaser.Text.prototype);
Dialogue.prototype.constructor = Dialogue;

Dialogue.prototype.update = function() {

};

Dialogue.prototype.isComplete = function () {
    this.complete = true;
};

Dialogue.prototype.addChar = function () {

    this.char++;

    if (this.char > this.content.length) {

        this.game.time.events.add(Phaser.Timer.SECOND * 1, this.isComplete, this);

    } else {

        this.setText(this.content.substring(0, this.char));

    }

};

Dialogue.prototype.start = function () {

    this.game.time.events.repeat(Phaser.Timer.SECOND * .1, this.content.length + 1, this.addChar, this);
};

module.exports = Dialogue;
