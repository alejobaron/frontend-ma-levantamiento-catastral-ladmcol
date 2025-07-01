export class CunidadEspacial {
    id: number;
    etiqueta: string; 
    dimension?: number;
    relacion_superficie?: number;
    area?: number;
    ext_direccion_id?: number;
    volumen?: number;

    constructor(){
        this.id=0,
        this.etiqueta= ""        
    }
}

export interface IunidadEspacial {
    id: number,
    etiqueta: string,
    dimension: number,
    relacion_superficie: number,
    area: number,
    ext_direccion_id: number,
    volumen: number,
}