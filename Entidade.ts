import {Atributos} from "./Atributos";

export interface Entidade{
    atributos: Atributos;

    tomarDano(): number;
}