import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipe } from '../../../pipe/filter.pipe';
import { CcaracteristicasUnidadConstruccion, IcaracteristicasUnidadConstruccion } from '../../../model/paqueteUnidadEspacial/caracteristicasUnidadConstruccion';
import { UnidadEspacialService } from '../../../services/unidad-espacial.service';
import { RouterModule } from '@angular/router';
import { DominiosService } from '../../../services/dominios.service';

@Component({
  selector: 'app-caracteristicas-unidad-construccion',
  imports: [FormsModule, CommonModule, NgxPaginationModule, FilterPipe, RouterModule],
  templateUrl: './caracteristicas-unidad-construccion.component.html',
  styleUrl: './caracteristicas-unidad-construccion.component.css'
})
export class CaracteristicasUnidadConstruccionComponent {

    mostrarFormulario: boolean = false;
    searchText: string = '';

    page: number = 1;
    pageSize: number = 5; 

    caracteristicaUnidadConstruccionObj: CcaracteristicasUnidadConstruccion = new CcaracteristicasUnidadConstruccion();
    caracteristicaUnidadConstruccionArray: IcaracteristicasUnidadConstruccion [] = []

    tiposunidadconstruccion: { valor: number; etiqueta: string }[] = [];
    tiposusounidadconstruccion: { valor: number; etiqueta: string }[] = [];
  
    constructor(
      private UnidadEspacialSrv: UnidadEspacialService,
      private DominiosSrv: DominiosService
    ){}

    ngOnInit():void{
      this.getCaracteristicasUnidadConstruccion();
      this.getTipoUnidadConstruccion();
      this.getTipoUsoUnidadConstruccion()
    }
      
    getCaracteristicasUnidadConstruccion(){
      this.UnidadEspacialSrv.loadCaracteristicasUnidadConstruccion().subscribe((res:any)=>{
        this.caracteristicaUnidadConstruccionArray = res;
      })
    }

    getTipoUnidadConstruccion() {
      this.DominiosSrv.loadTipoUnidadConstruccion().subscribe(res => {
        this.tiposunidadconstruccion = res.map(item => ({
          valor: item.id,
          etiqueta: item.tipo_display
        }));
      });
    }

    getTipoUsoUnidadConstruccion() {
      this.DominiosSrv.loadTipoUsoUnidadConstruccion().subscribe(res => {
        this.tiposusounidadconstruccion = res.map(item => ({
          valor: item.id,
          etiqueta: item.tipo_display
        }));
      });
    }
  
    onSave(){
      this.mostrarFormulario = true;
        this.UnidadEspacialSrv.createCaracteristicasUnidadConstruccion(this.caracteristicaUnidadConstruccionObj).subscribe((res:any)=>{
          if (res){
            alert('Caracteristicas de Unidad de Construcción creada correctamente');
            this.mostrarFormulario = false;
            this.getCaracteristicasUnidadConstruccion();
            this.caracteristicaUnidadConstruccionObj = new CcaracteristicasUnidadConstruccion();
          } else{
            alert (res.message)
          }
        },
      (error: any)=> {
        const errorMessage = this.extractErrorMessage(error)
        alert(errorMessage);
      })
    }
  
    onUpdate(){
      this.UnidadEspacialSrv.updateCaracteristicasUnidadConstruccion(this.caracteristicaUnidadConstruccionObj.id, this.caracteristicaUnidadConstruccionObj).subscribe((res:any)=>{
        if (res){
          alert('Caracteristicas de Unidad de Construcción actualizada correctamente');
          this.mostrarFormulario = false;
          this.getCaracteristicasUnidadConstruccion();
          this.caracteristicaUnidadConstruccionObj = new CcaracteristicasUnidadConstruccion();
        } else{
          alert (res.message)
        }
      },
      (error: any)=> {
        const errorMessage = this.extractErrorMessage(error)
        alert(errorMessage);
      })
    }
  
    onDelete(id:number){
      const isDelete = confirm("¿Esta seguro que desea eliminar este registro?");
      if (isDelete == true){
        this.caracteristicaUnidadConstruccionObj.id = id
        this.UnidadEspacialSrv.deleteCaracteristicasUnidadConstruccion(id).subscribe((res:any)=>{
          if (res) {
            alert('Caracteristicas de Unidad de Construcción eliminada correctamente');
            this.getCaracteristicasUnidadConstruccion();
          } else {
            alert(res.message)
          }
        })
      }
    }
  
    onEdit(data: any){
      this.mostrarFormulario = true;
      this.caracteristicaUnidadConstruccionObj = Object.assign({}, data);
    }
              
    onCancel(){
      this.mostrarFormulario = false;
      this.caracteristicaUnidadConstruccionObj = new CcaracteristicasUnidadConstruccion();
    }
  
    private extractErrorMessage(error: any): string {
      if (error.error) {
        if (typeof error.error === 'string') {
          return error.error; 
        } else if (error.error.interesado && Array.isArray(error.error.interesado)) {
          return error.error.interesado.join(', '); 
        } else if (typeof error.error === 'object') {
          return Object.values(error.error).flat().join(', '); 
        }
      }
      return 'Ocurrió un error inesperado. Intente nuevamente.';
    }

}
