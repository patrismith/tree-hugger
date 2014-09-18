(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

//global variables
window.onload = function () {
  var game = new Phaser.Game(256, 224, Phaser.AUTO, 'tree-hugger');

  // Game States
  game.state.add('boot', require('./states/boot'));
  game.state.add('credits', require('./states/credits'));
  game.state.add('ending', require('./states/ending'));
  game.state.add('gameover', require('./states/gameover'));
  game.state.add('intro', require('./states/intro'));
  game.state.add('menu', require('./states/menu'));
  game.state.add('play', require('./states/play'));
  game.state.add('preload', require('./states/preload'));
  game.state.add('title', require('./states/title'));
  

  game.state.start('boot');
};
},{"./states/boot":5,"./states/credits":6,"./states/ending":7,"./states/gameover":8,"./states/intro":9,"./states/menu":10,"./states/play":11,"./states/preload":12,"./states/title":13}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
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

},{"../prefabs/dialogue.js":2}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){

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

},{}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){

'use strict';
function GameOver() {}

GameOver.prototype = {
  preload: function () {

  },
  create: function () {
    var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
    this.titleText = this.game.add.text(this.game.world.centerX,100, 'Game Over!', style);
    this.titleText.anchor.setTo(0.5, 0.5);

    this.congratsText = this.game.add.text(this.game.world.centerX, 200, 'You Win!', { font: '32px Arial', fill: '#ffffff', align: 'center'});
    this.congratsText.anchor.setTo(0.5, 0.5);

    this.instructionText = this.game.add.text(this.game.world.centerX, 300, 'Click To Play Again', { font: '16px Arial', fill: '#ffffff', align: 'center'});
    this.instructionText.anchor.setTo(0.5, 0.5);
  },
  update: function () {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};
module.exports = GameOver;

},{}],9:[function(require,module,exports){
'use strict';
var FadingImage = require('../prefabs/fadingImage');
var Dialogues = require('../prefabs/dialogues');

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

        this.style = {font: "12px Courier", fill: "#FFFFFF", align: "center"};

        this.textList = ["This is some text.", "This is the next stuff."];

        this.dialogues = new Dialogues(this.game, this.textList, this.style);
        this.game.add.existing(this.dialogues);

        this.game.time.events.add(Phaser.Timer.SECOND * 2, this.dialogues.start, this.dialogues);

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

},{"../prefabs/dialogues":3,"../prefabs/fadingImage":4}],10:[function(require,module,exports){

'use strict';
function Menu() {}

Menu.prototype = {
  preload: function() {

  },
  create: function() {
    var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
    this.sprite = this.game.add.sprite(this.game.world.centerX, 138, 'yeoman');
    this.sprite.anchor.setTo(0.5, 0.5);

    this.titleText = this.game.add.text(this.game.world.centerX, 300, '\'Allo, \'Allo!', style);
    this.titleText.anchor.setTo(0.5, 0.5);

    this.instructionsText = this.game.add.text(this.game.world.centerX, 400, 'Click anywhere to play "Click The Yeoman Logo"', { font: '16px Arial', fill: '#ffffff', align: 'center'});
    this.instructionsText.anchor.setTo(0.5, 0.5);

    this.sprite.angle = -20;
    this.game.add.tween(this.sprite).to({angle: 20}, 1000, Phaser.Easing.Linear.NONE, true, 0, 1000, true);
  },
  update: function() {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};

module.exports = Menu;

},{}],11:[function(require,module,exports){

  'use strict';
  function Play() {}
  Play.prototype = {
    create: function() {
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      this.sprite = this.game.add.sprite(this.game.width/2, this.game.height/2, 'yeoman');
      this.sprite.inputEnabled = true;
      
      this.game.physics.arcade.enable(this.sprite);
      this.sprite.body.collideWorldBounds = true;
      this.sprite.body.bounce.setTo(1,1);
      this.sprite.body.velocity.x = this.game.rnd.integerInRange(-500,500);
      this.sprite.body.velocity.y = this.game.rnd.integerInRange(-500,500);

      this.sprite.events.onInputDown.add(this.clickListener, this);
    },
    update: function() {

    },
    clickListener: function() {
      this.game.state.start('gameover');
    }
  };
  
  module.exports = Play;
},{}],12:[function(require,module,exports){
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
                    { name: 'intro-figure', w: 256, h: 224, frames: 3 } ];
    AssetLoader.loadSprites.call(this, sprites);

  },
  create: function() {
    this.asset.cropEnabled = false;
  },
  update: function() {
    if(!!this.ready) {
      this.game.state.start('intro');
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

},{"../prefabs/fadingImage":4}]},{},[1])