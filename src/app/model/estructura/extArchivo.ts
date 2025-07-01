export class CextArchivo{
    id: number;
    local_id: string;
    fecha_aceptacion: Date | null;
    datos: string;
    extraccion: Date | null;
    fecha_grabacion: Date | null;
    fecha_entrega: Date | null;
    espacio_de_nombres: string;

    constructor(){
        this.id= 0;
        this.local_id= "";
        this.fecha_aceptacion= null;
        this.datos= "";
        this.extraccion= null;
        this.fecha_grabacion= null;
        this.fecha_entrega= null;
        this.espacio_de_nombres= "";
    }
}

export interface IextArchivo{
    id: number,
    local_id: string,
    fecha_aceptacion: Date,
    datos: string,
    extraccion: Date,
    fecha_grabacion: Date,
    fecha_entrega: Date,
    espacio_de_nombres: string,
}