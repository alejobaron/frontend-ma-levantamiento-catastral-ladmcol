export class CcolFuenteEspacial{
    id: number;
    fuente: number;
    nombre: string;
    tipo: number;
    descripcion: string;
    metadato: string;

    constructor(){
        this.id= 0;
        this.fuente= 0;
        this.nombre= "";
        this.tipo= 0;
        this.descripcion= "";
        this.metadato= "";
    }
}

export interface IcolFuenteEspacial{
    id: number,
    fuente: number,
    nombre: string,
    tipo: number,
    descripcion: string,
    metadato: string,
}
