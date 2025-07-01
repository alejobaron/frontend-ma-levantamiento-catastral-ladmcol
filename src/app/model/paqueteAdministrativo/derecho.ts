export class Cderecho{
    id: number;
    fraccion_derecho: string;
    fecha_inicio_tenencia: Date | null ;
    DRR: number;
    tipo: number;

    constructor(){
        this.id= 0;
        this.fraccion_derecho= "";
        this.fecha_inicio_tenencia= null;
        this.DRR= 0;
        this.tipo= 0;
    }
}

export interface Iderecho{
    id: number,
    fraccion_derecho: number,
    fecha_inicio_tenencia: number,
    DRR: number,
    tipo: number,
}