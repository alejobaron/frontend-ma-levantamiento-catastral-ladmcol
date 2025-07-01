export class CnovedadNumeroPredial{
    id: number;
    id_novedad_numero_predial: string;
    numero_predial: string;
    tipo_novedad: number;

    constructor(){
        this.id= 0;
        this.id_novedad_numero_predial= "";
        this.numero_predial= "";
        this.tipo_novedad= 0;
    }
}

export interface InovedadNumeroPredial{
    id: number,
    id_novedad_numero_predial: string,
    numero_predial: string,
    tipo_novedad: number,
}