'use strict';
var Dialogue = require('../prefabs/dialogue.js');

var Dialogues = function(game, textList, style, parent) {
  Phaser.Group.call(this, game, parent);

    for (var i = 0; i < textList.length; i++) {
        var text = new Dialogue(this.game, 128, 0, textList[i], style);
        this.add(text);
    }

    this.currentDialogue = 0;

};

Dialogues.prototype = Object.create(Phaser.Group.prototype);
Dialogues.prototype.constructor = Dialogues;

Dialogues.prototype.update = function() {

    if (this.getAt(this.currentDialogue).isComplete && this.currentDialogue < this.length) {
        this.currentDialogue++;
        this.start();
    }

};

Dialogues.prototype.start = function() {

    this.getAt(this.currentDialogue).start.call(this.getAt(this.currentDialogue));

};

Dialogues.prototype.nextText = function () {
    this.getAt(0).setText('');
    console.log(this.getAt(0));
    console.log(this.getAt(1));
    console.log(this.children);
    console.log(this);
    this.getAt(1).start.call(this.getAt(1));
};

module.exports = Dialogues;
