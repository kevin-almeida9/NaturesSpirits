class Enemy extends Phaser.Physics.Arcade.Sprite{

  constructor(scene, x, y){
    super(scene, x, y,'enemyWalkSprite',0)
    this.scene = scene

    this.scene.physics.world.enable(this)

    this.scene.add.existing(this)

    this.lastDirection = "right"

    let anims = this.scene.anims

    anims.create({
      key: "enemyLeft",
      frames: anims.generateFrameNames("enemyWalkSprite", {start:10, end:14}),
      frameRate: 10,
      repeat:-1
    });
    anims.create({
      key: "enemyRight",
      frames: anims.generateFrameNames("enemyWalkSprite", {start:0, end:4}),
      frameRate: 10,
      repeat:-1
    });
    anims.create({
      key: "enemyBack",
      frames: anims.generateFrameNames("enemyWalkSprite", {start:5, end:9}),
      frameRate: 10,
      repeat:-1
    });
    anims.create({
      key: "enemyFront",
      frames: anims.generateFrameNames("enemyWalkSprite", {start:15, end:19}),
      frameRate: 10,
      repeat:-1
    });

    anims.create({
      key: "enemyDeathRight",
      frames: anims.generateFrameNames("enemyDeathSprite", {start:0, end:4}),
      frameRate: 10,
      repeat:0
    });
    anims.create({
      key: "enemyDeathBack",
      frames: anims.generateFrameNames("enemyDeathSprite", {start:5, end:9}),
      frameRate: 10,
      repeat:0
    });
    anims.create({
      key: "enemyDeathLeft",
      frames: anims.generateFrameNames("enemyDeathSprite", {start:10, end:14}),
      frameRate: 10,
      repeat:0
    });
    anims.create({
      key: "enemyDeathFront",
      frames: anims.generateFrameNames("enemyDeathSprite", {start:15, end:19}),
      frameRate: 10,
      repeat:0
    });

    this.timeEvent = this.scene.time.addEvent({
      delay: 3000,
      callback: this.move,
      loop:  true,    
      callbackScope: this
    })
  }

  move(){
    const random = Math.floor(Math.random() * 4 + 1)
    switch (random) {
      case 1:
        this.setVelocityX(100)
        this.anims.play("enemyRight", true)
        this.lastDirection = "right"    
        break;
      case 2:
        this.setVelocityX(-100)
        this.anims.play("enemyLeft", true)
        this.lastDirection = "left"    
        break;
      case 3:
        this.setVelocityY(100)
        this.anims.play("enemyFront", true)
        this.lastDirection = "front"    
        break;
      case 4:
        this.setVelocityY(-100)
        this.anims.play("enemyBack", true)
        this.lastDirection = "back"    
        break;
      default:
        this.setVelocityX(-100)
        this.anims.play("enemyLeft", true)
        this.lastDirection = "left"    
        break;
    }
  }

  delete(){
    this.timeEvent.destroy()

    switch(this.lastDirection)
    {
      case "front":
        this.play("enemyDeathFront", true)
        break
      case "back":
        this.play("enemyDeathBack", true)
        break
      case "right":
        this.play("enemyDeathRight", true)
        break
      case "left":
        this.play("enemyDeathLeft", true)
        break
    }

    this.once(Phaser.Animations.Events.SPRITE_ANIMATION_COMPLETE, () => {
      this.destroy();
    })
    delete this
  }
}

export default Enemy