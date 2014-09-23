'use strict';

var AssetLoader = (function () {

    function loadImages (list) {
        for (var i = 0; i < list.length; i++) {
            this.load.image(list[i], 'assets/images/' + list[i] + '.png');
        }
    };

    function loadAudio (list, context) {
        for (var i = 0; i < list.length; i++) {
            context.load.audio(list[i], ['assets/audio/' + list[i] + '.ogg']);
        }
    };

    function loadSprites (list) {
        for (var i = 0; i < list.length; i++) {
            this.load.spritesheet(list[i].name,
                                  'assets/sprites/' + list[i].name + '.png',
                                  list[i].w, list[i].h, list[i].frames);
        }
    }

    return { loadImages: loadImages,
             loadSprites: loadSprites,
             loadAudio: loadAudio };

})();


function Preload() {
  this.asset = null;
  this.ready = false;
}

Preload.prototype = {
  preload: function() {
    this.asset = this.add.sprite(this.game.width/2,this.game.height/2, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);
    var sprites = [ { name: 'title-tree', w: 144, h: 224, frames: 3 },
                    { name: 'title-treehugger', w: 160, h: 40, frames: 3 },
                    { name: 'title-pressspace', w: 88, h: 16, frames: 3 },
                    { name: 'intro-figure', w: 256, h: 224, frames: 3 },
                    { name: 'player', w: 24, h: 32, frames: 6 } ];
    AssetLoader.loadSprites.call(this, sprites);

  },
  create: function() {
    this.asset.cropEnabled = false;
  },
  update: function() {
    if(!!this.ready) {
      this.game.state.start('level');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};

module.exports = Preload;
