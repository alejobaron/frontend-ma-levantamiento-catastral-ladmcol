import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdministrativoService {

  apiURL: string = 'http://localhost:8000/paquete_administrativo/'

  constructor(private http: HttpClient) { }

  //Urls para Unidad Básica Administrativa
  loadUnidadAdministrativaBasica(){
    return this.http.get(this.apiURL + "UnidadAdministrativaBasica/");
  }

  createUnidadAdministrativaBasica(obj:any){
    return this.http.post(this.apiURL + "UnidadAdministrativaBasica/",obj);
  }

  updateUnidadAdministrativaBasica(id: number, obj: any){
    return this.http.put(this.apiURL + "UnidadAdministrativaBasica/" + id + "/", obj);
  }

  deleteUnidadAdministrativaBasica(id: number){
    return this.http.delete(this.apiURL + "UnidadAdministrativaBasica/" + id + "/");
  }


  //Urls para Predios
  loadPredio(){
    return this.http.get(this.apiURL + "Predio/");
  }

  createPredio(obj:any){
    return this.http.post(this.apiURL + "Predio/",obj);
  }

  updatePredio(id: number, obj: any){
    return this.http.put(this.apiURL + "Predio/" + id + "/", obj);
  }

  deletePredio(id: number){
    return this.http.delete(this.apiURL + "Predio/" + id + "/");
  }


  //Urls para Predio-Copropiedad
  loadPredioCopropiedad(){
    return this.http.get(this.apiURL + "Predio_copropiedad/");
  }

  createPredioCopropiedad(obj:any){
    return this.http.post(this.apiURL + "Predio_copropiedad/",obj);
  }

  updatePredioCopropiedad(id: number, obj: any){
    return this.http.put(this.apiURL + "Predio_copropiedad/" + id + "/", obj);
  }

  deletePredioCopropiedad(id: number){
    return this.http.delete(this.apiURL + "Predio_copropiedad/" + id + "/");
  }


  //Urls para Datos de PH-Condominio
  loadDatosPHCondominio(){
    return this.http.get(this.apiURL + "DatosPHCondominio/");
  }

  createDatosPHCondominio(obj:any){
    return this.http.post(this.apiURL + "DatosPHCondominio/",obj);
  }

  updateDatosPHCondominio(id: number, obj: any){
    return this.http.put(this.apiURL + "DatosPHCondominio/" + id + "/", obj);
  }

  deleteDatosPHCondominio(id: number){
    return this.http.delete(this.apiURL + "DatosPHCondominio/" + id + "/");
  }


  //Urls para Dato adicional de levantamiento catastral
  loadDatoAdicionalLevantamientoCatastral(){
    return this.http.get(this.apiURL + "DatosAdicionalesLevantamientoCatastral/");
  }

  createDatoAdicionalLevantamientoCatastral(obj:any){
    return this.http.post(this.apiURL + "DatosAdicionalesLevantamientoCatastral/",obj);
  }

  updateDatoAdicionalLevantamientoCatastral(id: number, obj: any){
    return this.http.put(this.apiURL + "DatosAdicionalesLevantamientoCatastral/" + id + "/", obj);
  }

  deleteDatoAdicionalLevantamientoCatastral(id: number){
    return this.http.delete(this.apiURL + "DatosAdicionalesLevantamientoCatastral/" + id + "/");
  }


  //Urls para Contacto de visita
  loadContactoVisita(){
    return this.http.get(this.apiURL + "ContactoVisita/");
  }

  createContactoVisita(obj:any){
    return this.http.post(this.apiURL + "ContactoVisita/",obj);
  }

  updateContactoVisita(id: number, obj: any){
    return this.http.put(this.apiURL + "ContactoVisita/" + id + "/", obj);
  }

  deleteContactoVisita(id: number){
    return this.http.delete(this.apiURL + "ContactoVisita/" + id + "/");
  }


  //Urls para DRR
  loadDRR(){
    return this.http.get(this.apiURL + "DRR/");
  }

  createDRR(obj:any){
    return this.http.post(this.apiURL + "DRR/",obj);
  }

  updateDRR(id: number, obj: any){
    return this.http.put(this.apiURL + "DRR/" + id + "/", obj);
  }

  deleteDRR(id: number){
    return this.http.delete(this.apiURL + "DRR/" + id + "/");
  }


  //Urls para Derechos
  loadDerecho(){
    return this.http.get(this.apiURL + "Derecho/");
  }

  createDerecho(obj:any){
    return this.http.post(this.apiURL + "Derecho/",obj);
  }

  updateDerecho(id: number, obj: any){
    return this.http.put(this.apiURL + "Derecho/" + id + "/", obj);
  }

  deleteDerecho(id: number){
    return this.http.delete(this.apiURL + "Derecho/" + id + "/");
  }
}
