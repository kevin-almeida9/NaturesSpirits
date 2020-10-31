import Phaser from "phaser";
import playerImg from "./assets/player/player-walk.png";
import enemyImg from "./assets/enemy/enemy-walk.png"

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 400,
  height: 300,
  physics:{
    default: 'arcade',
    arcade:{
      gravity: {y:0}
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

const game = new Phaser.Game(config);
let player;
var cursors;

function preload() {
  this.load.spritesheet("playerWalkSprite", playerImg,{frameWidth:64,frameHeight:64});
}

function create() {
  //const logo = this.add.image(200, 150, "playerWalkSprite")

  player = this.physics.add.sprite(100,100,"playerWalkSprite")

  const anims = this.anims;
  
  anims.create({
    key: "left",
    frames: anims.generateFrameNames("playerWalkSprite", {start:10, end:14}),
    frameRate: 10,
    repeat:-1
  });
  anims.create({
    key: "right",
    frames: anims.generateFrameNames("playerWalkSprite", {start:0, end:4}),
    frameRate: 10,
    repeat:-1
  });
  anims.create({
    key: "back",
    frames: anims.generateFrameNames("playerWalkSprite", {start:5, end:9}),
    frameRate: 10,
    repeat:-1
  });
  anims.create({
    key: "front",
    frames: anims.generateFrameNames("playerWalkSprite", {start:15, end:19}),
    frameRate: 10,
    repeat:-1
  });

  const camera = this.cameras.main
  camera.startFollow(player)
  // camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
}

function update(){
  player.body.setVelocity(0);

  cursors = this.input.keyboard.createCursorKeys();

  //Movimentação
  if(cursors.left.isDown) player.body.setVelocityX(-100)
  else if(cursors.right.isDown) player.body.setVelocityX(100)
  if(cursors.up.isDown) player.body.setVelocityY(-100)
  else if(cursors.down.isDown) player.body.setVelocityY(100)
  
  //Animação
  if(cursors.left.isDown) player.anims.play("left", true)
  else if(cursors.right.isDown) player.anims.play("right", true)
  else if(cursors.up.isDown) player.anims.play("front", true)
  else if(cursors.down.isDown) player.anims.play("back", true)
  else player.anims.stop()
}