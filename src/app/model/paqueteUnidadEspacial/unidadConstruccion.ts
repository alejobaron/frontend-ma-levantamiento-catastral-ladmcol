export class CunidadConstruccion {
    id: number;
    planta_ubicacion: number; 
    area_construida: string;
    altura: string;
    unidad_espacial: number;
    construccion: number;
    caracteristicas: number;
    tipo_planta: number;
    unidad_construccion_geometria: string;

    constructor(){
        this.id=0,
        this.planta_ubicacion= 0;
        this.area_construida= "";
        this.altura="";
        this.unidad_espacial=0;
        this.construccion=0;
        this.caracteristicas=0;
        this.tipo_planta=0;
        this.unidad_construccion_geometria="";
    }
}

export interface IunidadConstruccion {
    id: number,
    planta_ubicacion: number,
    area_construida: string,
    altura: string,
    unidad_espacial: number,
    construccion: number,
    caracteristicas: number,
    tipo_planta: number,
    unidad_construccion_geometria: string,
}