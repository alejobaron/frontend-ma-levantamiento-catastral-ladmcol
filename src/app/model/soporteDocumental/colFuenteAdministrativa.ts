export class CcolFuenteAdministrativa{
    id: number;
    observacion: string;
    numero_fuente: string;
    fuente: number;
    tipo: number;

    constructor(){
        this.id= 0;
        this.observacion= "";
        this.numero_fuente= "";
        this.fuente= 0;
        this.tipo= 0;
    }
}

export interface IcolFuenteAdministrativa{
    id: number,
    observacion: string,
    numero_fuente: string,
    fuente: number,
    tipo: number,
}