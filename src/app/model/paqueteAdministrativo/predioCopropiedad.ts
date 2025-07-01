export class CpredioCopropiedad{
    id: number;
    coeficiente: number;
    predio_matriz: number;
    unidad_predial: number;

    constructor(){
        this.id= 0;
        this.coeficiente= 0;
        this.predio_matriz= 0;
        this.unidad_predial= 0;
    }
}

export interface IpredioCopropiedad{
    id: number,
    coeficiente: number,
    predio_matriz: number,
    unidad_predial: number,
}