'use strict';

var FadingImage = function(game, x, y, name, frame) {

  Phaser.Sprite.call(this, game, x, y, name, frame);

  this.visible = false;
  this.animations.add('fade');

};

FadingImage.prototype = Object.create(Phaser.Sprite.prototype);
FadingImage.prototype.constructor = FadingImage;

FadingImage.prototype.update = function() {

};

FadingImage.prototype.fadeIn = function () {

    this.visible = true;
    this.game.time.events.repeat(Phaser.Timer.SECOND * .25, 2, this.nextFrame, this);

};

FadingImage.prototype.nextFrame = function () {

    this.animations.next();

}

FadingImage.prototype.fadeOut = function () {

    this.game.time.events.repeat(Phaser.Timer.SECOND * .25, 3, this.prevFrame, this);

};

FadingImage.prototype.prevFrame = function () {

    if (this.animations.currentFrame.index === 0) {
        this.visible = false;
    } else {
        this.animations.previous();
    }

}

module.exports = FadingImage;
