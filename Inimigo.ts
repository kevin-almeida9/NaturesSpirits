import {Entidade} from "./Entidade";
import {Atributos} from "./Atributos";


export class Inimigo implements Entidade{
    atributos: Atributos;

    tomarDano(): number{
        return 0;
    }
}