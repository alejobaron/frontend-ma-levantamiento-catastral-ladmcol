export class Cfuente{
    id: number;
    fecha_documento_fuente: Date | null;
    estado_disponibilidad: number;
    ext_archivo_id: number;
    tipo_principal: number;

    constructor(){
        this.id= 0;
        this.fecha_documento_fuente= null;
        this.estado_disponibilidad= 0;
        this.ext_archivo_id= 0;
        this.tipo_principal= 0;
    }
}

export interface Ifuente{
    id: number,
    fecha_documento_fuente: Date,
    estado_disponibilidad: number,
    ext_archivo_id: number,
    tipo_principal: number,
}