import Phaser from "phaser"
import playerImg from "./assets/player/player-walk.png"
import enemyImg from "./assets/enemy/enemy-walk.png"
import magicAttack from "./assets/player/attack_magic.png"
import enemyDeath from "./assets/enemy/enemy-death.png"
import playerDeath from "./assets/player/player-death.png"
import mapTiles from "./assets/scenario/ground_tiles_2.png"
import map from "./assets/scenario/map.json"
import Enemies from './models/Enemies'
import Player from './models/Player'

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: window.innerWidth,
  height: window.innerHeight,
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

var game = new Phaser.Game(config);
let player;
var cursors;
var enemies;
var enemiesGroup;
function preload() {
  this.load.image("mapTiles", mapTiles)
  this.load.tilemapTiledJSON("map", map);
  this.load.spritesheet("playerWalkSprite", playerImg,{frameWidth:64,frameHeight:64}); 
  this.load.spritesheet("enemyWalkSprite", enemyImg,{frameWidth:64,frameHeight:64}); 
  this.load.spritesheet("enemyDeathSprite", enemyDeath,{frameWidth:64,frameHeight:64});
  this.load.spritesheet("playerDeathSprite", playerDeath,{frameWidth:64,frameHeight:64});
  this.load.spritesheet("playerMagicAttack", magicAttack,{frameWidth:32,frameHeight:32}); 
}

function create() {
  const map = this.make.tilemap({ key: "map" })
  const tileset = map.addTilesetImage("assets", "mapTiles")

  const ground = map.createStaticLayer("ground", tileset, 0, 0)

  ground.setCollisionByProperty({ collider: true });

  // Spawn point
  const spawnPoint = map.findObject('player', objects => objects.name === 'playerSpawn')

  //Player 
  player = new Player(this, spawnPoint.x, spawnPoint.y)
  this.physics.add.collider(player,ground)

  //Enemies
  this.enemies = map.createFromObjects('enemy','enemySpawn',{}) 
  enemiesGroup = new Enemies(this.physics.world,this,[],this.enemies)
  this.physics.add.collider(enemiesGroup,ground)

  //Câmera
  const camera = this.cameras.main
  camera.startFollow(player)
  camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels)

  //Collision
  this.physics.add.collider(player,enemiesGroup,()=>{
    player.morte(this.scene)
  })

  
}

function update(){
  let input = this.input.keyboard
  let spacebar = input.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
  cursors = this.input.keyboard.createCursorKeys()

  if(player) player.move(cursors)
 

  if(Phaser.Input.Keyboard.JustDown(spacebar)) player.fire(enemiesGroup)
}