export class ClcFuenteAdministrativa{
    id: number;
    fuente_administrativa: number | null;
    tipo_documento: number | null;
    ente_emisor: string;

    constructor(){
        this.id= 0;
        this.fuente_administrativa= null;
        this.tipo_documento= null;
        this.ente_emisor= "";
    }
}

export interface IlcFuenteAdministrativa{
    id: number,
    fuente_administrativa: number | null,
    tipo_documento: number | null,
    ente_emisor: string,
}