import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UnidadEspacialService {

  apiUrl: string = 'http://localhost:8000/paquete_unidad_espacial/'

  constructor(private http: HttpClient) { }

  //Urls para Unidad Espacial
  loadUnidadEspacial(){
    return this.http.get(this.apiUrl + "UnidadEspacial/");
  }

  createUnidadEspacial(obj:any){
    return this.http.post(this.apiUrl + "UnidadEspacial/", obj);
  }

  updateUnidadEspacial(id: number, obj: any){
    return this.http.put(this.apiUrl + "UnidadEspacial/" + id + "/", obj);
  }

  deleteUnidadEspacial(id:number){
    return this.http.delete(this.apiUrl + "UnidadEspacial/" + id + "/");
  }


  //Urls para Terreno
  loadTerrenoGeom(){
    return this.http.get(this.apiUrl + "Terreno/");
  }

  loadTerreno() {
    return this.http.get(this.apiUrl + "Terreno/").pipe(
      map((res: any) => {
        return res.features.map((feature: any) => {
          return {
            id: feature.id,
            ...feature.properties,
            geometria: feature.geometry,
          };
        });
      })
    );
  }

  createTerreno(obj:any){
    return this.http.post(this.apiUrl + "Terreno/", obj);
  }

  updateTerreno(id: number, obj: any){
    return this.http.put(this.apiUrl + "Terreno/" + id + "/", obj);
  }

  deleteTerreno(id:number){
    return this.http.delete(this.apiUrl + "Terreno/" + id + "/");
  }


  //Urls para Construcción
  loadConstruccionGeom(){
    return this.http.get(this.apiUrl + "Construccion/");
  }

  loadConstruccion(){
    return this.http.get(this.apiUrl + "Construccion/").pipe(
      map((res: any) => {
        return res.features.map((feature: any) => {
          return {
            id: feature.id,
            ...feature.properties,
            geometria: feature.geometry,
          };
        });
      })
    );

  }

  createConstruccion(obj:any){
    return this.http.post(this.apiUrl + "Construccion/", obj);
  }

  updateConstruccion(id: number, obj: any){
    return this.http.put(this.apiUrl + "Construccion/" + id + "/", obj);
  }

  deleteConstruccion(id:number){
    return this.http.delete(this.apiUrl + "Construccion/" + id + "/");
  }


  //Urls para Carateristicas de Unidad de Construcción
  loadCaracteristicasUnidadConstruccion(){
    return this.http.get(this.apiUrl + "CaracteristicasUnidadConstruccion/");
  }

  createCaracteristicasUnidadConstruccion(obj:any){
    return this.http.post(this.apiUrl + "CaracteristicasUnidadConstruccion/", obj);
  }

  updateCaracteristicasUnidadConstruccion(id: number, obj: any){
    return this.http.put(this.apiUrl + "CaracteristicasUnidadConstruccion/" + id + "/", obj);
  }

  deleteCaracteristicasUnidadConstruccion(id:number){
    return this.http.delete(this.apiUrl + "CaracteristicasUnidadConstruccion/" + id + "/");
  }


  //Urls para Unidad de Construcción
  loadUnidadConstruccionGeom(){
    return this.http.get(this.apiUrl + "UnidadConstruccion/");
  }

  loadUnidadConstruccion(){
    return this.http.get(this.apiUrl + "UnidadConstruccion/").pipe(
      map((res: any) => {
        return res.features.map((feature: any) => {
          return {
            id: feature.id,
            ...feature.properties,
            geometria: feature.geometry,
          };
        });
      })
    );
  }

  createUnidadConstruccion(obj:any){
    return this.http.post(this.apiUrl + "UnidadConstruccion/", obj);
  }

  updateUnidadConstruccion(id: number, obj: any){
    return this.http.put(this.apiUrl + "UnidadConstruccion/" + id + "/", obj);
  }

  deleteUnidadConstruccion(id:number){
    return this.http.delete(this.apiUrl + "UnidadConstruccion/" + id + "/");
  }


  //Urls para Prueba GEO
  loadGeo(){
    return this.http.get(this.apiUrl + "UnidadEspacial/").pipe(
      map((res: any) => {
        return res.features.map((feature: any) => {
          return {
            id: feature.id,
            ...feature.properties,
            geometria: feature.geometry,  
          };
        });
      })
    );
  }

  createGeo(obj:any){
    return this.http.post(this.apiUrl + "UnidadEspacial/", obj);
  }

  updateGeo(id: number, obj: any){
    return this.http.put(this.apiUrl + "UnidadEspacial/" + id + "/", obj);
  }

  deleteGeo(id:number){
    return this.http.delete(this.apiUrl + "UnidadEspacial/" + id + "/");
  }
}
