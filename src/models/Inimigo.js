import { Entidade } from "./Entidade";
import { Atributos } from "./Atributos";

export class Inimigo extends Entidade {
	contructor(){
		super();
		this.atributos = new Atributos();
	}

	drop() {

	}
}

