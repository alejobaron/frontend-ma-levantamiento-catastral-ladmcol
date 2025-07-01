export class CcaracteristicasUnidadConstruccion {
    id: number;
    identificador: string; 
    total_plantas: number;
    anio_construccion: number;
    area_construida: string;
    area_privada_construida: string;
    observaciones: string;
    tipo_unidad_construccion: number;
    uso: number;

    constructor(){
        this.id=0,
        this.identificador= "";
        this.total_plantas= 0;
        this.anio_construccion=0;
        this.area_construida="";
        this.area_privada_construida="";
        this.observaciones="";
        this.tipo_unidad_construccion=0;
        this.uso=0;
    }
}

export interface IcaracteristicasUnidadConstruccion {
    id: number,
    identificador: string,
    total_plantas: number,
    anio_construccion: number,
    area_construida: string,
    area_privada_construida: string,
    observaciones: string,
    tipo_unidad_construccion: number,
    uso: number,
}