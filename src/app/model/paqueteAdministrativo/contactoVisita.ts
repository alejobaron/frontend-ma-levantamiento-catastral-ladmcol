export class CcontactoVisita{
    id: number;
    nombre_apellidos_quien_atendio: string;
    numero_documento_quien_atendio: string;
    domicilio_notificaciones: string;
    celular: string;
    correo_electronio: string;
    autoriza_notificaciones: boolean;
    datos_adicionales: number;
    tipo_documento_quien_atendio: number;   

    constructor(){
        this.id= 0;
        this.nombre_apellidos_quien_atendio= "";
        this.numero_documento_quien_atendio= "";
        this.domicilio_notificaciones= "";
        this.celular= "";
        this.correo_electronio= "";
        this.autoriza_notificaciones= true;
        this.datos_adicionales= 0;
        this.tipo_documento_quien_atendio= 0;
    }
}

export interface IContactoVisita{
    id: number,
    nombre_apellidos_quien_atendio: string,
    numero_documento_quien_atendio: string,
    domicilio_notificaciones: string,
    celular: string,
    correo_electronio: string,
    autoriza_notificaciones: boolean,
    datos_adicionales: number,
    tipo_documento_quien_atendio: number,
}