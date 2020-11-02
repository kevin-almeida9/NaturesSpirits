class Enemy extends Phaser.Physics.Arcade.Sprite{

  constructor(scene, x, y){
    super(scene, x, y,'enemyWalkSprite',0)
    this.scene = scene

    this.scene.physics.world.enable(this)

    this.scene.add.existing(this)

    // this.scene.add.sprite(x, y, "enemyWalkSprite")
  
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
        break;
      case 2:
        this.setVelocityX(-100)
        this.anims.play("enemyLeft", true)
        break;
      case 3:
        this.setVelocityY(100)
        this.anims.play("enemyFront", true)
        break;
      case 4:
        this.setVelocityY(-100)
        this.anims.play("enemyBack", true)
        break;
      default:
        this.setVelocityX(100)
        this.anims.play("enemyLeft", true)
        break;
    }
  }

  delete(){
    this.timeEvent.destroy()
    delete this
  }
}

export default Enemy