export class CinteresadoExt{
    id: number;
    id_interesado: string;
    huella_dactilar: File | string;
    nombre: string;
    fotografia: File | string;
    firma: File | string;
    documento_escaneado: string;
    ext_direccion?: number | null;

    constructor(){
        this.id = 0;
        this.id_interesado = "";
        this.huella_dactilar = "";
        this.nombre = "";
        this.fotografia = "";
        this.firma = "";
        this.documento_escaneado = "";
        this.ext_direccion = null;
    }
}

export interface IinteresadoExt{
    id: number,
    id_interesado: string,
    huella_dactilar: string,
    nombre: string,
    fotografia: string,
    firma: string,
    documento_escaneado: string,
    ext_direccion: number | null,

}