export class Cdrr{
    id: number;
    descripcion: string;
    col_baunitRrr: number;

    constructor(){
        this.id= 0;
        this.descripcion= "";
        this.col_baunitRrr= 0;
    }
}

export interface Idrr{
    id: number,
    descripcion: string,
    col_baunitRrr: number,
}