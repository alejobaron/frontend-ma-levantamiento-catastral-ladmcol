export class CareaValor{
    id: number;
    id_area_valor: string;
    area: string;
    datos_proyeccion: string;
    tipo: number;

    constructor(){
        this.id= 0;
        this.id_area_valor= "";
        this.area= "";
        this.datos_proyeccion= "";
        this.tipo= 0;
    }
}

export interface IareaValor{
    id: number,
    id_area_valor: string,
    area: string,
    datos_proyeccion: string,
    tipo: number,
}
