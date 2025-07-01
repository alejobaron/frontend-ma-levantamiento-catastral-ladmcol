export class CvolumenValor{
    id: number;
    id_volumen_valor: string;
    volumen_medicion: string;
    tipo: number;

    constructor(){
        this.id= 0;
        this.id_volumen_valor= "";
        this.volumen_medicion= "";
        this.tipo= 0;
    }
}

export interface IvolumenValor{
    id: number,
    id_volumen_valor: string,
    volumen_medicion: string,
    tipo: number,
}
