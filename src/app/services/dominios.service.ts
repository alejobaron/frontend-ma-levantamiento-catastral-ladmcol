import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class DominiosService {

  apiURL: string = 'http://localhost:8000/dominios/'

  constructor(private http: HttpClient) {}

  // Define el tipo de respuesta esperada
  loadTiposUAB(): Observable<{ id: number; tipo: string; tipo_display: string }[]> {
    return this.http.get<{ id: number; tipo: string; tipo_display: string }[]>(this.apiURL + "UnidadAdministrativaBasicaTipo/");
  }


  loadTiposPredio(): Observable<{ id: number; tipo: string; tipo_display: string }[]> {
  return this.http.get<{ id: number; tipo: string; tipo_display: string }[]>(this.apiURL + "PredioTipo/");
  }

  loadTiposCondicionPredio(): Observable<{ id: number; tipo: string; tipo_display: string }[]> {
  return this.http.get<{ id: number; tipo: string; tipo_display: string }[]>(this.apiURL + "CondicionPredioTipo/");
  }

  loadTiposDestinacionEconomica(): Observable<{ id: number; tipo: string; tipo_display: string }[]> {
  return this.http.get<{ id: number; tipo: string; tipo_display: string }[]>(this.apiURL + "DestinacionEconomicaTipo/");
  }

  loadTiposResultadoVisita(): Observable<{ id: number; tipo: string; tipo_display: string }[]> {
  return this.http.get<{ id: number; tipo: string; tipo_display: string }[]>(this.apiURL + "ResultadoVisitaTipo/");
  }

  loadTiposDocumento(): Observable<{ id: number; tipo: string; tipo_display: string }[]> {
  return this.http.get<{ id: number; tipo: string; tipo_display: string }[]>(this.apiURL + "DocumentoTipo/");
  }

  loadTiposDerecho(): Observable<{ id: number; tipo: string; tipo_display: string }[]> {
  return this.http.get<{ id: number; tipo: string; tipo_display: string }[]>(this.apiURL + "DerechoTipo/");
  }

  loadTiposInteresado(): Observable<{ id: number; tipo: string; tipo_display: string }[]> {
  return this.http.get<{ id: number; tipo: string; tipo_display: string }[]>(this.apiURL + "InteresadoTipo/");
  }

  loadTiposSexo(): Observable<{ id: number; tipo: string; tipo_display: string }[]> {
  return this.http.get<{ id: number; tipo: string; tipo_display: string }[]>(this.apiURL + "SexoTipo/");
  }

  loadTiposGrupoEtnico(): Observable<{ id: number; tipo: string; tipo_display: string }[]> {
  return this.http.get<{ id: number; tipo: string; tipo_display: string }[]>(this.apiURL + "GrupoEtnicoTipo/");
  }

  loadTiposGrupoInteresado(): Observable<{ id: number; tipo: string; tipo_display: string }[]> {
  return this.http.get<{ id: number; tipo: string; tipo_display: string }[]>(this.apiURL + "GrupoInteresadoTipo/");
  }

  loadTiposEstadoDisponibilidad(): Observable<{ id: number; tipo: string; tipo_display: string }[]> {
  return this.http.get<{ id: number; tipo: string; tipo_display: string }[]>(this.apiURL + "EstadoDisponibilidadTipo/");
  }

  loadFormaPresentacionCodigo(): Observable<{ id: number; tipo: string; tipo_display: string }[]> {
  return this.http.get<{ id: number; tipo: string; tipo_display: string }[]>(this.apiURL + "FormaPresentacionCodigo/");
  }

  loadTipoFuenteAdministrativa(): Observable<{ id: number; tipo: string; tipo_display: string }[]> {
  return this.http.get<{ id: number; tipo: string; tipo_display: string }[]>(this.apiURL + "FuenteAdministrativaTipo/");
  }

  loadTipoFuenteAdministrativaLC(): Observable<{ id: number; tipo: string; tipo_display: string }[]> {
  return this.http.get<{ id: number; tipo: string; tipo_display: string }[]>(this.apiURL + "FuenteAdministrativaTipoLC/");
  }

  loadTipoFuenteEspacial(): Observable<{ id: number; tipo: string; tipo_display: string }[]> {
  return this.http.get<{ id: number; tipo: string; tipo_display: string }[]>(this.apiURL + "FuenteEspacialTipo/");
  }

  loadTipoDimension(): Observable<{ id: number; tipo: string; tipo_display: string }[]> {
  return this.http.get<{ id: number; tipo: string; tipo_display: string }[]>(this.apiURL + "DimensionTipo/");
  }

  loadTipoRelacionSuperficie(): Observable<{ id: number; tipo: string; tipo_display: string }[]> {
  return this.http.get<{ id: number; tipo: string; tipo_display: string }[]>(this.apiURL + "RelacionSuperficieTipo/");
  }

  loadTipoUnidadConstruccion(): Observable<{ id: number; tipo: string; tipo_display: string }[]> {
  return this.http.get<{ id: number; tipo: string; tipo_display: string }[]>(this.apiURL + "UnidadConstruccionTipo/");
  }

  loadTipoUsoUnidadConstruccion(): Observable<{ id: number; tipo: string; tipo_display: string }[]> {
  return this.http.get<{ id: number; tipo: string; tipo_display: string }[]>(this.apiURL + "UsoUnidadConstruccionTipo/");
  }

  loadTipoConstruccionPlanta(): Observable<{ id: number; tipo: string; tipo_display: string }[]> {
  return this.http.get<{ id: number; tipo: string; tipo_display: string }[]>(this.apiURL + "ConstruccionPlantaTipo/");
  }
}
