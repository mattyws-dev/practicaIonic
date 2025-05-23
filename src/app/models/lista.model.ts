import { ListaItem } from "./lista-item.model";

export class Lista{

    id:number;
    titulo: string;
    fechaInicio: Date;
    fechaCompletada?: Date;
    completada: boolean;
    items: ListaItem[];

    constructor(titulo:string){
        this.titulo = titulo;
        this.fechaInicio = new Date;
        this.completada = false;
        this.items = []
        this.id = new Date().getTime()
    }
}