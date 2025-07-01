export class CdatosAdicionlesLevantamientoCatastral{
    id: number;
    area_registral_m2: number;
    observaciones: string;
    fecha_visita_predial: Date | null;
    predio: number;
    novedad_numeros_prediales?: number;
    novedad_fmi?: number;
    resultado_visita: number;    

    constructor(){
        this.id= 0;
        this.area_registral_m2= 0;
        this.observaciones= "";
        this.fecha_visita_predial= null;
        this.predio= 0;
        this.resultado_visita= 0;
    }
}

export interface IdatosAdicionlesLevantamientoCatastral{
    id: number,
    area_registral_m2: number,
    observaciones: string,
    fecha_visita_predial: Date,
    predio: number,
    novedad_numeros_prediales: number,
    novedad_fmi: number,
    resultado_visita: number,
}