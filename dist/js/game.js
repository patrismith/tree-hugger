(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

//global variables
window.onload = function () {
  var game = new Phaser.Game(256, 224, Phaser.AUTO, 'tree-hugger');

  // Game States
  game.state.add('boot', require('./states/boot'));
  game.state.add('credits', require('./states/credits'));
  game.state.add('ending', require('./states/ending'));
  game.state.add('intro', require('./states/intro'));
  game.state.add('level', require('./states/level'));
  game.state.add('preload', require('./states/preload'));
  game.state.add('title', require('./states/title'));
  

  game.state.start('boot');
};
},{"./states/boot":7,"./states/credits":8,"./states/ending":9,"./states/intro":10,"./states/level":11,"./states/preload":12,"./states/title":13}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
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

    this.game.add.existing(this);
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

},{}],7:[function(require,module,exports){

'use strict';

function Boot() {
}

Boot.prototype = {
  preload: function() {
    this.load.image('preloader', 'assets/preloader.gif');
  },
  create: function() {
    this.game.input.maxPointers = 1;
    this.game.state.start('preload');
  }
};

module.exports = Boot;

},{}],8:[function(require,module,exports){
'use strict';
  function Credits() {}
  Credits.prototype = {
    preload: function() {
      // Override this method to add some load operations. 
      // If you need to use the loader, you may need to use them here.
    },
    create: function() {
      // This method is called after the game engine successfully switches states. 
      // Feel free to add any setup code here (do not load anything here, override preload() instead).
    },
    update: function() {
      // state update code
    },
    paused: function() {
      // This method will be called when game paused.
    },
    render: function() {
      // Put render operations here.
    },
    shutdown: function() {
      // This method will be called when the state is shut down 
      // (i.e. you switch to another state from this one).
    }
  };
module.exports = Credits;

},{}],9:[function(require,module,exports){
'use strict';
  function Ending() {}
  Ending.prototype = {
    preload: function() {
      // Override this method to add some load operations. 
      // If you need to use the loader, you may need to use them here.
    },
    create: function() {
      // This method is called after the game engine successfully switches states. 
      // Feel free to add any setup code here (do not load anything here, override preload() instead).
    },
    update: function() {
      // state update code
    },
    paused: function() {
      // This method will be called when game paused.
    },
    render: function() {
      // Put render operations here.
    },
    shutdown: function() {
      // This method will be called when the state is shut down 
      // (i.e. you switch to another state from this one).
    }
  };
module.exports = Ending;

},{}],10:[function(require,module,exports){
'use strict';
var FadingImage = require('../prefabs/fadingImage');
var Dialogue = require('../prefabs/dialogue');

  function Intro() {}
  Intro.prototype = {
      // TODO: a lot here is duplicated from title.js
    addFadingImage: function (key, name, x, y, time) {
        this[key] = new FadingImage(this.game, x, y, name, 0);
        this.game.add.existing(this[key]);
        this.game.time.events.add(Phaser.Timer.SECOND * time, this[key].fadeIn, this[key]);
    },
    create: function() {
        this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.UP, Phaser.Keyboard.DOWN, Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.SPACEBAR]);

        this.addFadingImage('figure', 'intro-figure', 0, 0, 1);

        this.style = {font: "12px Courier", fill: "#FFFFFF", align: "left"};

        this.textList = ["I was supposed to be\nretired.\n        \nBut then, it\nhappened.\n        \nCode Red.",
                         "Animals, overcome\nwith negative\nemotions...",
                         "This job's too\ndangerous for your\ntypical animal\ntherapist.\nOf course."];

        this.dialogue = new Dialogue(this.game, 104, 0, this.style, this.textList);
        this.game.add.existing(this.dialogue);

        this.game.time.events.add(Phaser.Timer.SECOND * 2, this.dialogue.start, this.dialogue);
        var key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        key.onDown.add(this.isDialogueOver, this);
    },
    isDialogueOver: function() {
        if (this.dialogue.finished) {
            this.endState();
        }
    },
    endState: function() {
        this.game.state.start('level');
    },
    update: function() {
      // state update code
    },
    paused: function() {
      // This method will be called when game paused.
    },
    render: function() {
      // Put render operations here.
    },
    shutdown: function() {
      // This method will be called when the state is shut down
      // (i.e. you switch to another state from this one).
    }
  };
module.exports = Intro;

},{"../prefabs/dialogue":4,"../prefabs/fadingImage":5}],11:[function(require,module,exports){
'use strict';
var Player = require('../prefabs/player');
var Bear = require('../prefabs/bear');
var Boundary = require('../prefabs/boundary');

  function Level() {}
  Level.prototype = {
    create: function() {

        this.map = this.game.add.tilemap('forest');
        this.map.addTilesetImage('forest');
        this.layer = this.map.createLayer(0);
        this.layer.resizeWorld();
        this.map.setCollisionByExclusion([49, 50, 51, 52, 53, 54, 55,
                                          65, 66, 67, 68, 69,
                                          81, 82, 83, 84, 85]);

        this.player = new Player(this.game, 50, 50);

        this.bear = new Bear(this.game, 100, 100);
        this.game.add.existing(this.bear);

        this.rightBoundary = new Boundary(this.game, 256, 0);
        this.leftBoundary = new Boundary(this.game, -1, 0);
        this.game.add.existing(this.rightBoundary);
        this.game.add.existing(this.leftBoundary);

        this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.UP, Phaser.Keyboard.DOWN, Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT]);

        this.cursors = this.game.input.keyboard.createCursorKeys();

        this.game.camera.follow(this);
    },
    update: function() {

        this.game.physics.arcade.collide(this.player, this.layer);
        this.game.physics.arcade.collide(this.player, this.bear);
        this.game.physics.arcade.collide(this.player, this.rightBoundary);
        this.game.physics.arcade.collide(this.player, this.leftBoundary);

        // if player is near bear, tell bear to go to player
        if (this.bear.detectPlayer()) {
            this.bear.followPlayer();
        } else {
            this.bear.idleLoop();
        }

        // if camera gets to certain point, stop following player


        // player controls
        if (this.cursors.right.isDown) {
            this.player.walkRight();
        } else if (this.cursors.left.isDown) {
            this.player.walkLeft();
        } else {
            this.player.stopX();
        }
        if (this.cursors.up.isDown) {
            this.player.walkUp();
        } else if (this.cursors.down.isDown) {
            this.player.walkDown();
        } else {
            this.player.stopY();
        }
        if (!this.cursors.right.isDown &&
            !this.cursors.left.isDown &&
            !this.cursors.up.isDown &&
            !this.cursors.down.isDown) {
            this.player.stopAnimation();
        }
    },
    paused: function() {
    },
    render: function() {
    },
    shutdown: function() {
    }
  };
module.exports = Level;

},{"../prefabs/bear":2,"../prefabs/boundary":3,"../prefabs/player":6}],12:[function(require,module,exports){
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
    };

    function loadMaps (list) {
        for (var i = 0; i < list.length; i++) {
            this.load.tilemap(list[i], 'assets/maps/' + list[i] + '.json', null, Phaser.Tilemap.TILED_JSON);
        }
    };

    return { loadImages: loadImages,
             loadSprites: loadSprites,
             loadAudio: loadAudio,
             loadMaps: loadMaps };

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
                    { name: 'player', w: 24, h: 32, frames: 6 },
                    { name: 'bear', w: 32, h: 24, frames: 4 } ];
    var images = [ 'forest', 'boundary' ];
    var maps = [ 'forest' ];
    AssetLoader.loadSprites.call(this, sprites);
    AssetLoader.loadImages.call(this, images);
    AssetLoader.loadMaps.call(this, maps);
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

},{}],13:[function(require,module,exports){
'use strict';
var FadingImage = require('../prefabs/fadingImage');

  function Title() {}
  Title.prototype = {
    addFadingImage: function (key, name, x, y, time) {
        this[key] = new FadingImage(this.game, x, y, name, 0);
        this.game.add.existing(this[key]);
        this.game.time.events.add(Phaser.Timer.SECOND * time, this[key].fadeIn, this[key]);
    },
    create: function() {

        this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.UP, Phaser.Keyboard.DOWN, Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.SPACEBAR]);

        this.addFadingImage('tree', 'title-tree', 96, 0, 1);
        this.addFadingImage('title', 'title-treehugger', 16, 112, 2);
        this.addFadingImage('space', 'title-pressspace', 16, 144, 4);

        var key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        key.onDown.add(function(key)
                       {
                           this.tree.fadeOut();
                           this.title.fadeOut();
                           this.space.fadeOut();
                           this.game.time.events.add(Phaser.Timer.SECOND * 1, this.nextState, this);
                       }, this);
    },
    update: function() {
      // state update code
    },
    paused: function() {
      // This method will be called when game paused.
    },
    render: function() {
      // Put render operations here.
    },
    shutdown: function() {
      // This method will be called when the state is shut down
      // (i.e. you switch to another state from this one).
    },
    nextState: function () {
        this.game.state.start('intro');
    }
  };
module.exports = Title;

},{"../prefabs/fadingImage":5}]},{},[1])