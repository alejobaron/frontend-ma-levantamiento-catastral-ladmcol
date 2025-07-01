import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SoporteDocumentalService {

  apiURL: string = 'http://localhost:8000/soporte_documental/'

  constructor(private http: HttpClient) { }

  //Urls para Fuente
  loadFuente(){
    return this.http.get(this.apiURL + "COLFuente/");
  }

  createFuente(obj:any){
    return this.http.post(this.apiURL + "COLFuente/",obj);
  }

  updateFuente(id: number, obj: any){
    return this.http.put(this.apiURL + "COLFuente/" + id + "/", obj);
  }

  deleteFuente(id: number){
    return this.http.delete(this.apiURL + "COLFuente/" + id + "/");
  }


  //Urls para COL Fuente Administrativa
  loadColFuenteAdministrativa(){
    return this.http.get(this.apiURL + "COLFuenteAdministrativa/");
  }

  createColFuenteAdministrativa(obj:any){
    return this.http.post(this.apiURL + "COLFuenteAdministrativa/",obj);
  }

  updateColFuenteAdministrativa(id: number, obj: any){
    return this.http.put(this.apiURL + "COLFuenteAdministrativa/" + id + "/", obj);
  }

  deleteColFuenteAdministrativa(id: number){
    return this.http.delete(this.apiURL + "COLFuenteAdministrativa/" + id + "/");
  }


  //Urls para LC Fuente Administrativa
  loadLCFuenteAdministrativa(){
    return this.http.get(this.apiURL + "LCFuenteAdministrativa/");
  }

  createLCFuenteAdministrativa(obj:any){
    return this.http.post(this.apiURL + "LCFuenteAdministrativa/",obj);
  }

  updateLCFuenteAdministrativa(id: number, obj: any){
    return this.http.put(this.apiURL + "LCFuenteAdministrativa/" + id + "/", obj);
  }

  deleteLCFuenteAdministrativa(id: number){
    return this.http.delete(this.apiURL + "LCFuenteAdministrativa/" + id + "/");
  }


  //Urls para COL Fuente Espacial
  loadColFuenteEspacial(){
    return this.http.get(this.apiURL + "COLFuenteEspacial/");
  }

  createColFuenteEspacial(obj:any){
    return this.http.post(this.apiURL + "COLFuenteEspacial/",obj);
  }

  updateColFuenteEspacial(id: number, obj: any){
    return this.http.put(this.apiURL + "COLFuenteEspacial/" + id + "/", obj);
  }

  deleteColFuenteEspacial(id: number){
    return this.http.delete(this.apiURL + "COLFuenteEspacial/" + id + "/");
  }


  //Urls para CR Fuente Espacial
  loadCRFuenteEspacial(){
    return this.http.get(this.apiURL + "CRFuenteEspacial/");
  }

  createCRFuenteEspacial(obj:any){
    return this.http.post(this.apiURL + "CRFuenteEspacial/",obj);
  }

  updateCRFuenteEspacial(id: number, obj: any){
    return this.http.put(this.apiURL + "CRFuenteEspacial/" + id + "/", obj);
  }

  deleteCRFuenteEspacial(id: number){
    return this.http.delete(this.apiURL + "CRFuenteEspacial/" + id + "/");
  }
}
