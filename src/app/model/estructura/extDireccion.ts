export class Cdireccion{
    id: number;
    id_direccion: string;
    es_direccion_principal: string;
    codigo_postal: string;
    valor_via_principal: string;
    letra_via_principal: string;
    letra_via_generadora: string;
    valor_via_generadora: string;
    numero_predio: string;
    complemento: string;
    nombre_predio: string;
    predio?: number;
    tipo_direccion?: number;
    clase_via_principal?: number;
    sector_ciudad?: number;
    sector_predio?: number;

    constructor(){
        this.id= 0;
        this.id_direccion= "";
        this.es_direccion_principal= "";
        this.codigo_postal= "";
        this.valor_via_principal= "";
        this.letra_via_principal= "";
        this.letra_via_generadora= "";
        this.valor_via_generadora= "";
        this.numero_predio= "";
        this.complemento= "";
        this.nombre_predio= "";
    }
}

export interface Idireccion{
    id: number,
    id_direccion: string,
    es_direccion_principal: true,
    codigo_postal: string,
    valor_via_principal: string,
    letra_via_principal: string,
    letra_via_generadora: string,
    valor_via_generadora: string,
    numero_predio: string,
    complemento: string,
    nombre_predio: string,
    predio: number,
    tipo_direccion: number,
    clase_via_principal: number,
    sector_ciudad: number,
    sector_predio: number,
}