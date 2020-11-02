import Enemy from './enemy'

class Enemies extends Phaser.Physics.Arcade.Group{
    constructor(world, scene, children,spriteArray){
        super(world, scene, children,{})
        this.scene = scene

        this.createEnemies(scene,spriteArray)
    }

    createEnemies(scene,spriteArray){
        // console.log(spriteArray)
        spriteArray.forEach(sprite => {
            const enemy = new Enemy(scene, sprite.x, sprite.y)

            this.add(enemy)

            sprite.destroy()
        });
    }
}

export default Enemies