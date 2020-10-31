import { Entidade } from "./Entidade";
import { Atributos } from "./Atributos";

export class Inimigo extends Entidade {
	contructor(scene,x,y){
		super(scene,x,y,"enemy",0);
		this.atributos = new Atributos();

		this.scene.physics.world.enable(this)
		this.scene.add.existing(this)

	}

	drop() {

	}
}

