//import { Atributos } from "./Atributos";
import Projetil from './Projetil'

class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y,'playerWalkSprite',0)
    this.dead = false;
    this.scene = scene

    this.scene.physics.world.enable(this)

    this.scene.add.existing(this)
    this.projeteis = []
    let anims = this.scene.anims

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

    anims.create({
      key: "playerDeathRight",
      frames: anims.generateFrameNames("playerDeathSprite", {start:0, end:6}),
      frameRate: 10,
      repeat:0
    });
    anims.create({
      key: "playerDeathBack",
      frames: anims.generateFrameNames("playerDeathSprite", {start:7, end:13}),
      frameRate: 10,
      repeat:0
    });
    anims.create({
      key: "playerDeathLeft",
      frames: anims.generateFrameNames("playerDeathSprite", {start:14, end:20}),
      frameRate: 10,
      repeat:0
    });
    anims.create({
      key: "playerDeathFront",
      frames: anims.generateFrameNames("playerDeathSprite", {start:21, end:27}),
      frameRate: 10,
      repeat:0
    });
  }

  fire(enemiesGroup) {
    this.projeteis.push(new Projetil(this.scene, this.x, this.y, this.lastDirection,enemiesGroup))
  }

  move(cursors) {
    
    this.setVelocity(0);

    if(!this.dead){
      //Movimentação
      if(cursors.left.isDown) this.setVelocityX(-100)
      else if(cursors.right.isDown) this.setVelocityX(100)
      if(cursors.up.isDown) this.setVelocityY(-100)
      else if(cursors.down.isDown) this.setVelocityY(100)
      
      //Animação
      if(cursors.left.isDown) {
        this.anims.play("left", true)
        this.lastDirection = "left"
      }
      else if(cursors.right.isDown) {
        this.anims.play("right", true)
        this.lastDirection = "right"
      }
      else if(cursors.up.isDown){
      this.anims.play("front", true)
      this.lastDirection = "front"
      }
      else if(cursors.down.isDown) {
        this.anims.play("back", true)
        this.lastDirection = "back"
      }
      else this.anims.stop()
  }
  }

  morte(scene){
    this.dead=true
    this.anims.restart()

    switch(this.lastDirection)
    {
      case "front":
        this.anims.play("playerDeathFront", true)
        break
      case "back":
        this.anims.play("playerDeathBack", true)
        break
      case "right":
        this.anims.play("playerDeathRight", true)
        break
      case "left":
        this.anims.play("playerDeathLeft", true)
        break
    }

    this.once(Phaser.Animations.Events.SPRITE_ANIMATION_COMPLETE, () => {
      scene.restart()
    })
  }
}
export default Player