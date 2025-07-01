export class Cmiembros {
    id: number;
    participacion: string;
    interesado: number;
    agrupacion: number;

    constructor(){
        this.id=0;
        this.participacion = "";
        this.interesado = 0;
        this.agrupacion = 0;
    }
}

export interface Imiembros {
    id: number,
    participacion: string,
    interesado: number,
    agrupacion: number,
}