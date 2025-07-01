export class CunidadAdministrativaBasica{
    id: number;
    nombre: string;
    tipo_UAB: number;
    tipo_UAB_nombre: string;

    constructor(){
        this.id= 0;
        this.nombre= "";
        this.tipo_UAB= 0;
        this.tipo_UAB_nombre= "";
    }
}

export interface IunidadAdministrativaBasica{
    id: number,
    nombre: string,
    tipo_UAB: number,
    tipo_UAB_nombre: string,
}