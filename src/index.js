import Phaser from "phaser";
import playerImg from "./assets/player/player-walk.png";

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 400,
  height: 300,
  physics:{
    default: 'arcade',
    arcade:{
      gravity:{y:0}
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

const game = new Phaser.Game(config);
let player
var cursors

function preload() {
  this.load.spritesheet("playerWalkSprite", playerImg,{frameWidth:64,frameHeight:64});
}

function create() {
  // const logo = this.add.image(200, 150, "playerWalkSprite");

  player= this.physics.add.sprite(100,100,"playerWalkSprite")
}

function update(){
  cursors = this.input.keyboard.createCursorsKeys()

  if(cursors.left.isDown){
    player.body.setVelocityX(-100)
  }
}