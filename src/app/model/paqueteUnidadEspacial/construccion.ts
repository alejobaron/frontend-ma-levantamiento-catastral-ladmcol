export class Cconstruccion {
    id: number;
    identificador: string; 
    total_pisos: number;
    total_sotanos: number;
    total_mezanines: number;
    total_semisotanos: number;
    area_total_construccion: string;
    altura_total_construccion: string;
    unidad_espacial: number;
    construccion_geometria?: string;

    constructor(){
        this.id=0,
        this.identificador= "";
        this.total_pisos= 0;
        this.total_sotanos=0;
        this.total_mezanines=0;
        this.total_semisotanos=0;
        this.area_total_construccion="";
        this.altura_total_construccion="";
        this.unidad_espacial=0;
        this.construccion_geometria="";
    }
}

export interface Iconstruccion {
    id: number,
    identificador: string,
    total_pisos: number,
    total_sotanos: number,
    total_mezanines: number,
    total_semisotanos: number,
    area_total_construccion: number,
    altura_total_construccion: string,
    unidad_espacial: string,
    construccion_geometria: string,
}