export class CGeo {
    id: number;
    etiqueta: string; 
    geometria: string;
    dimension?: number;
    relacion_superficie?: number;
    area?: number;
    ext_direccion_id?: number;
    volumen?: number;

    constructor(){
        this.id=0,
        this.etiqueta= "";
        this.geometria= "";
        this.dimension=0;
        this.relacion_superficie=0;
        this.area=0;
        this.ext_direccion_id=0;
        this.volumen=0;
    }
}

export interface IGeo {
    id: number,
    etiqueta: string,
    geometria: number,
    dimension: number,
    relacion_superficie: number,
    area: number,
    ext_direccion_id: number,
    volumen: number,
}
