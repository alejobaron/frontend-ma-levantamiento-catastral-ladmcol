
export class Cterreno {
    id: number;
    area_terreno: string; 
    unidad_espacial: number;
    terreno_geometria: string;

    constructor(){
        this.id=0,
        this.area_terreno= "";
        this.unidad_espacial= 0;
        this.terreno_geometria="";
    }
}

export interface Iterreno {
    id: number,
    area_terreno: string,
    unidad_espacial: number,
    terreno_geometria: string,
}
