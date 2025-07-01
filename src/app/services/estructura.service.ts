import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EstructuraService {

  apiURL: string =  'http://localhost:8000/estructura/'

  constructor(private http: HttpClient) { }

  //Urls para Interesados
  loadExtInteresado(){
    return this.http.get(this.apiURL + "ExtInteresado/");
  }

  createNewEXtInteresado(obj:any){
    return this.http.post(this.apiURL + "ExtInteresado/",obj);
  }

  updateExtInteresado(id: number, obj: any){
    return this.http.put(this.apiURL + "ExtInteresado/" + id + "/", obj);
  }

  deleteExtInteresado(id: number){
    return this.http.delete(this.apiURL + "ExtInteresado/" + id + "/");
  }

  //Urls para Direcciones
  loadDireccion(){
    return this.http.get(this.apiURL + "ExtDireccion/");
  }

  createNewDireccion(obj:any){
    return this.http.post(this.apiURL + "ExtDireccion/",obj);
  }

  updateDireccion(id: number, obj: any){
    return this.http.put(this.apiURL + "ExtDireccion/" + id + "/", obj);
  }

  deleteDireccion(id: number){
    return this.http.delete(this.apiURL + "ExtDireccion/" + id + "/");
  }


  //Urls para Novedades de número predial
  loadNovedadNumeroPredial(){
    return this.http.get(this.apiURL + "EstructuraNovedadNumeroPredial/");
  }

  createNovedadNumeroPredial(obj:any){
    return this.http.post(this.apiURL + "EstructuraNovedadNumeroPredial/",obj);
  }

  updateNovedadNumeroPredial(id: number, obj: any){
    return this.http.put(this.apiURL + "EstructuraNovedadNumeroPredial/" + id + "/", obj);
  }

  deleteNovedadNumeroPredial(id: number){
    return this.http.delete(this.apiURL + "EstructuraNovedadNumeroPredial/" + id + "/");
  }


  //Urls para Novedades de FMI
  loadNovedadFMI(){
    return this.http.get(this.apiURL + "NovedadFMI/");
  }

  createNovedadFMI(obj:any){
    return this.http.post(this.apiURL + "NovedadFMI/",obj);
  }

  updateNovedadFMI(id: number, obj: any){
    return this.http.put(this.apiURL + "NovedadFMI/" + id + "/", obj);
  }

  deleteNovedadFMI(id: number){
    return this.http.delete(this.apiURL + "NovedadFMI/" + id + "/");
  }


  //Urls para Archivos
  loadArchivo(){
    return this.http.get(this.apiURL + "ExtArchivo/");
  }

  createArchivo(obj:any){
    return this.http.post(this.apiURL + "ExtArchivo/",obj);
  }

  updateArchivo(id: number, obj: any){
    return this.http.put(this.apiURL + "ExtArchivo/" + id + "/", obj);
  }

  deleteArchivo(id: number){
    return this.http.delete(this.apiURL + "ExtArchivo/" + id + "/");
  }

  //Urls para Valor de Área
  loadAreaValor(){
    return this.http.get(this.apiURL + "AreaValor/");
  }

  createAreaValor(obj:any){
    return this.http.post(this.apiURL + "AreaValor/",obj);
  }

  updateAreaValor(id: number, obj: any){
    return this.http.put(this.apiURL + "AreaValor/" + id + "/", obj);
  }

  deleteAreaValor(id: number){
    return this.http.delete(this.apiURL + "AreaValor/" + id + "/");
  }

  //Urls para Valor de Volumen
  loadVolumenValor(){
    return this.http.get(this.apiURL + "VolumenValor/");
  }

  createVolumenValor(obj:any){
    return this.http.post(this.apiURL + "VolumenValor/",obj);
  }

  updateVolumenValor(id: number, obj: any){
    return this.http.put(this.apiURL + "VolumenValor/" + id + "/", obj);
  }

  deleteVolumenValor(id: number){
    return this.http.delete(this.apiURL + "VolumenValor/" + id + "/");
  }
}
