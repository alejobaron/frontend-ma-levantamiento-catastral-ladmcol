import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InteresadoService {

  apiUrl: string = 'http://localhost:8000/paquete_interesados/'

  constructor(private http: HttpClient) { }

  //Urls para COL Interesado
  loadColInteresado(){
    return this.http.get(this.apiUrl + "COLInteresado/");

  }

  createNewInteresadoCOL(obj:any){
    return this.http.post(this.apiUrl + "COLInteresado/",obj); 

  }

  updateInteresadoCOL(id: number, obj: any) {
    return this.http.put(this.apiUrl + "COLInteresado/" + id + "/", obj);
  }

  deleteInteresadoCOL(id: number){
      return this.http.delete(this.apiUrl + "COLInteresado/" + id + "/");

  }


  //Urls para COL Interesado
  loadCrInteresado(){
    return this.http.get(this.apiUrl + "CRInteresado/");

  }

  createNewInteresadoCR(obj:any){
    return this.http.post(this.apiUrl + "CRInteresado/",obj); 

  }

  updateInteresadoCR(id: number, obj: any) {
    return this.http.put(this.apiUrl + "CRInteresado/" + id + "/", obj);
  }

  deleteInteresadoCR(id: number){
      return this.http.delete(this.apiUrl + "CRInteresado/" + id + "/");

  }


  //Urls para Contacto Interesados
  loadContactoInteresado(){
    return this.http.get(this.apiUrl + "InteresadoContacto/");
  }

  createNewContactoInteresado(obj:any){
    return this.http.post(this.apiUrl + "InteresadoContacto/", obj);
  }

  updateContactoInteresado(id: number, obj: any){
    return this.http.put(this.apiUrl + "InteresadoContacto/" + id + "/", obj);
  }

  deleteContactoInteresado(id: number){
    return this.http.delete(this.apiUrl + "InteresadoContacto/" + id + "/");
  }


  //Urls para Agrupacion Interesados COL
  loadColAgrupacionInteresados(){
    return this.http.get(this.apiUrl + "COLAgrupacionInteresados/");
  }

  createColAgrupacionInteresados(obj:any){
    return this.http.post(this.apiUrl + "COLAgrupacionInteresados/", obj);
  }

  updateColAgrupacionInteresados(id: number, obj: any){
    return this.http.put(this.apiUrl + "COLAgrupacionInteresados/" + id + "/", obj);
  }

  deleteColAgrupacionInteresados(id: number){
    return this.http.delete(this.apiUrl + "COLAgrupacionInteresados/" + id + "/");
  }


  //Urls para Agrupacion Interesados CR
   loadCRAgrupacionInteresados(){
    return this.http.get(this.apiUrl + "CRAgrupacionInteresados/");
  }

  createCRAgrupacionInteresados(obj:any){
    return this.http.post(this.apiUrl + "CRAgrupacionInteresados/", obj);
  }

  updateCRAgrupacionInteresados(id: number, obj: any){
    return this.http.put(this.apiUrl + "CRAgrupacionInteresados/" + id + "/", obj);
  }

  deleteCRAgrupacionInteresados(id: number){
    return this.http.delete(this.apiUrl + "CRAgrupacionInteresados/" + id + "/");
  }


  //Urls para Miembros
  loadMiembros(){
    return this.http.get(this.apiUrl + "Miembros/");
  }

  createMiembros(obj:any){
    return this.http.post(this.apiUrl + "Miembros/", obj);
  }

  updateMiembros(id: number, obj: any){
    return this.http.put(this.apiUrl + "Miembros/" + id + "/", obj);
  }

  deleteMiembros(id: number){
    return this.http.delete(this.apiUrl + "Miembros/" + id + "/");
  }

}
