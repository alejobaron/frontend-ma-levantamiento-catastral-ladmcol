export class CinteresadoCOL {
    id: number;
    nombre: string;
    ext_PID: number;

    constructor(){
        this.id=0;
        this.nombre = "";
        this.ext_PID = 0;
    }
}

export interface IinteresadoCOL {
    id: number,
    nombre: string,
    ext_PID: number,
}