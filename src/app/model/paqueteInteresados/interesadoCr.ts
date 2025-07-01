export class CinteresadoCR {
    id: number;
    documento_identidad: string;
    primer_nombre: string;
    segundo_nombre: string;
    primer_apellido: string;
    segundo_apellido: string;
    razon_social: string;
    interesado: number;
    tipo: number;
    tipo_documento: number;
    sexo: number;
    grupo_etnico: number;

    constructor(){
        this.id =0;
        this.documento_identidad= "";
        this.primer_nombre= "";
        this.segundo_nombre= "";
        this.primer_apellido= "";
        this.segundo_apellido= "";
        this.razon_social= "";
        this.interesado= 0;
        this.tipo= 0;
        this.tipo_documento= 0;
        this.sexo= 0;
        this.grupo_etnico= 0;
    }
}

export interface IinteresadoCR{
    id: number,
    documento_identidad: string,
    primer_nombre: string,
    segundo_nombre: string,
    primer_apellido: string,
    segundo_apellido: string,
    razon_social: string,
    interesado: number,
    tipo: number,
    tipo_documento: number,
    sexo: number,
    grupo_etnico: number,
}