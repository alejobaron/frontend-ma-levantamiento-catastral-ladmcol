export class CnovedadFMI{
    id: number;
    id_novedad_FMI: string;
    codigo_ORIP: string;
    numero_FMI: string;
    tipo_novedadFMI: number;

    constructor(){
        this.id= 0;
        this.id_novedad_FMI= "";
        this.codigo_ORIP= "";
        this.numero_FMI= "";
        this.tipo_novedadFMI= 0;
    }
}

export interface InovedadFMI{
    id: number,
    id_novedad_FMI: string,
    codigo_ORIP: string,
    numero_FMI: string,
    tipo_novedadFMI: number,
}