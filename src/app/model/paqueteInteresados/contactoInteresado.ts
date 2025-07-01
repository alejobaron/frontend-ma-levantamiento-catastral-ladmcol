export class CinteresadoContacto {

    id: number;
    telefono: string;
    domicilio_notificacion: string;
    direccion_notificacion: string;
    correo_electronico: string;
    autoriza_notificacion_correo: boolean;
    departamento: string;
    municipio: string;
    interesado: number;

    constructor (){
        this.id= 0,
        this.telefono= "";
        this.domicilio_notificacion= "";
        this.direccion_notificacion= "";
        this.correo_electronico= "";
        this.autoriza_notificacion_correo= false;
        this.departamento= "";
        this.municipio= "";
        this.interesado= 0;

    }
}

export interface IinteresadoContacto {

    id: number,
    telefono: string,
    domicilio_notificacion: string,
    direccion_notificacion: string,
    correo_electronico: string,
    autoriza_notificacion_correo: boolean,
    departamento: string,
    municipio: string,
    interesado: number,

}