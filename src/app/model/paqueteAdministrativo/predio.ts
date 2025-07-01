export class Cpredio{
    id: number;
    departamento: string;
    municipio: string;
    id_operacion: string;
    codigo_orip: string;
    matricula_inmobiliaria: string;
    numero_predial: string;
    codigo_homologado: string;
    avaluo_catastral: string;
    unidad_basica_administrativa: number;
    direccion: number;
    tipo: number;
    condicion_predio: number;
    destinacion_economica: number;
    nombre_UAB?: string;

    constructor(){
        this.id = 0;
        this.departamento = "";
        this.municipio = "";
        this.id_operacion = "";
        this.codigo_orip = "";
        this.matricula_inmobiliaria = "";
        this.numero_predial = "";
        this.codigo_homologado = "";
        this.avaluo_catastral = "";
        this.unidad_basica_administrativa = 0;
        this.direccion = 0;
        this.tipo= 0;
        this.condicion_predio= 0;
        this.destinacion_economica= 0;
        this.nombre_UAB= "";
    }
}

export interface Ipredio{
    id: number;
    departamento: string;
    municipio: string;
    id_operacion: string;
    codigo_orip: string;
    matricula_inmobiliaria: string;
    numero_predial: string;
    codigo_homologado: string;
    avaluo_catastral: string;
    unidad_basica_administrativa: number;
    direccion: number;
    tipo: number;
    condicion_predio: number;
    destinacion_economica: number;
    nombre_UAB: string;
}