import { Atributos } from "./Atributos";

export class Entidade extends Phaser.Physics.Arcade.Sprite{
  constructor() {
    this.atributos = new Atributos();
  }

  tomarDano() {};

  spawnar() {};

}
