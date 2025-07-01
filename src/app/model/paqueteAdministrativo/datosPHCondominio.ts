export class CdatosPHCondominio{
    id: number;
    area_total_terreno: number;
    area_total_terreno_privada: number;
    area_total_comun: number;
    area_total_construida: number;
    area_total_construida_privada: number;
    area_total_construida_comun: number;
    numero_torres: number;
    total_unidades_privadas: number;
    predio: number;    

    constructor(){
        this.id= 0;
        this.area_total_terreno= 0;
        this.area_total_terreno_privada= 0;
        this.area_total_comun= 0;
        this.area_total_construida= 0;
        this.area_total_construida_privada= 0;
        this.area_total_construida_comun= 0;
        this.numero_torres= 0;
        this.total_unidades_privadas= 0;
        this.predio= 0;
    }
}

export interface IdatosPHCondominio{
    id: number,
    area_total_terreno: number,
    predio_matriz: number,
    area_total_terreno_privada: number,
    area_total_comun: number,
    area_total_construida: number,
    area_total_construida_privada: number,
    area_total_construida_comun: number,
    numero_torres: number,
    total_unidades_privadas: number,
    predio: number,
}