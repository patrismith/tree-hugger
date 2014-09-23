'use strict';

var Dialogue = function(game, x, y, style, textList) {
  Phaser.Text.call(this, game, x, y, '', style);

  this.textList = textList;
  this.currentText = 0;
  this.content = '';
  this.char = 0;
  this.finished = false;
};

Dialogue.prototype = Object.create(Phaser.Text.prototype);
Dialogue.prototype.constructor = Dialogue;

Dialogue.prototype.update = function() {
};

Dialogue.prototype.isComplete = function () {
    this.char = 0;
    this.currentText++;
    if (this.currentText < this.textList.length) {
        this.start();
    } else {
        this.finished = true;
    }
};

Dialogue.prototype.addChar = function () {
    this.char++;

    if (this.char > this.content.length) {

        this.game.time.events.add(Phaser.Timer.SECOND * 1.5, this.isComplete, this);

    } else {

        this.setText(this.content.substring(0, this.char));

    }
};

Dialogue.prototype.startText = function () {
    this.game.time.events.repeat(Phaser.Timer.SECOND * .1, this.content.length + 1, this.addChar, this);
};

Dialogue.prototype.start = function () {
    this.content = this.textList[this.currentText];
    this.startText();
};

module.exports = Dialogue;
