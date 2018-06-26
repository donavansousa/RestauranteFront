import { IRestaurante } from "./restaurante.interface";

export interface IPrato{
    IdPrato : number;
    Descricao: string;
    Preco: number;
    IdRestaurante: number;
    Restaurante: IRestaurante;
}