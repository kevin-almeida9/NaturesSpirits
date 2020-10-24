import { Entidade } from "./Entidade";
import { Atributos } from "./Atributos";

export class Player extends Entidade {
  constructor() {
    super()
    this.atributos = new Atributos()
  }

  regenerar() {}


}