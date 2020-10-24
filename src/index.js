import * as Phaser from 'phaser';

const sceneConfig = {
  active: false,
  visible: false,
  key: 'Game',
};

class GameScene extends Phaser.Scene {
  square
 
  constructor() {
    super(sceneConfig);
  }
 
  create() {
    this.square = this.add.rectangle(400, 400, 100, 100, 0xFFFFFF)
    this.physics.add.existing(this.square);
  }
 
  update() {
    // TODO
  }
}

const gameConfig = {
  title: 'Sample',

  type: Phaser.AUTO,

  scale: {
    width: window.innerWidth,
    height: window.innerHeight,
  },

  scene: GameScene,

  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
    },
  },

  parent: 'game',
  backgroundColor: '#000000',
};

export const game = new Phaser.Game(gameConfig);

window.addEventListener('resize', () => {
  game.scale.refresh();
});
