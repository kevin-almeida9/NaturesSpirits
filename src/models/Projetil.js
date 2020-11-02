import Phaser from 'phaser'

class Projetil extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, direction, enemiesGroup){
      super(scene, x, y, "playerMagicAttack", 0);
      this.scene=scene
      //this.dano=dano
      //this.amigavel=amigavel
      this.speed = 300
      this.setPosition(x, y);
      
      this.scene.physics.world.enable(this)

      this.scene.add.existing(this)

      this.move(direction)

      let anims = this.scene.anims

      this.scene.physics.add.collider(this,enemiesGroup,(ob1,ob2)=>{
        ob2.delete()
      })
      

      anims.create({
        key: "defaultAttack",
        frames: anims.generateFrameNames("playerMagicAttack", {start:0, end:3}),
        frameRate: 8,
        repeat:-1
      });

      setTimeout(()=>{
        this.destroy();
      }, 500)
    }

    move(direction){
      switch(direction){
        case "back":
          this.setVelocityY(this.speed);
          break;
        case "front":
          this.setVelocityY(-this.speed);
          break;
        case "right":
          this.setVelocityX(this.speed);
          break;
        case "left":
          this.setVelocityX(-this.speed); 
          break;
      }
      
      this.anims.play("defaultAttack", true)
    }
}

export default Projetil