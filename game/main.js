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