'use strict';
var Dialogue = require('../prefabs/dialogue.js');

var Dialogues = function(game, textList, style, parent) {
  Phaser.Group.call(this, game, parent);

    for (var i = 0; i < textList.length; i++) {
        var text = new Dialogue(this.game, 128, 0, textList[i], style);
        this.add(text);
    }
};

Dialogues.prototype = Object.create(Phaser.Group.prototype);
Dialogues.prototype.constructor = Dialogues;

Dialogues.prototype.update = function() {

  // write your prefab's specific update code here

};

Dialogues.prototype.start = function() {

    this.getAt(0).start.call(this.getAt(0));

};

module.exports = Dialogues;
