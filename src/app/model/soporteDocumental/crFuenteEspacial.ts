export class CcrFuenteEspacial{
    id: number;
    fuente_espacial: number;
    tipo: number;
    metadato_FE: string;

    constructor(){
        this.id= 0;
        this.fuente_espacial= 0;
        this.tipo= 0;
        this.metadato_FE= "";
    }
}

export interface IcrFuenteEspacial{
    id: number,
    fuente_espacial: number,
    tipo: number,
    metadato_FE: string,
}

