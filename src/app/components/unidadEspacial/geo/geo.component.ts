import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipe } from '../../../pipe/filter.pipe';
import { CGeo, IGeo } from '../../../model/paqueteUnidadEspacial/geo';
import { UnidadEspacialService } from '../../../services/unidad-espacial.service';

@Component({
  selector: 'app-geo',
  imports: [FormsModule, CommonModule, NgxPaginationModule, FilterPipe],
  templateUrl: './geo.component.html',
  styleUrl: './geo.component.css'
})
export class GeoComponent {

  mostrarFormulario: boolean = false;
  searchText: string = '';

  page: number = 1; 
  pageSize: number = 9; 

  geoObj: CGeo = new CGeo();
  
  geoArray: IGeo [] = []

  constructor(private UnidadEspacialSrv: UnidadEspacialService){
    this.getGeo()
  }
    
  getGeo(){
    this.UnidadEspacialSrv.loadGeo().subscribe((res:any)=>{
      this.geoArray = res;
    })
  }

  onSave(){
    this.mostrarFormulario = true;
      this.UnidadEspacialSrv.createGeo(this.geoObj).subscribe((res:any)=>{
        if (res){
          alert('Geo creada correctamente');
          this.mostrarFormulario = false;
          this.getGeo();
          this.geoObj = new CGeo();
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
    this.UnidadEspacialSrv.updateGeo(this.geoObj.id, this.geoObj).subscribe((res:any)=>{
      if (res){
        alert('Geo actualizada correctamente');
        this.mostrarFormulario = false;
        this.getGeo();
        this.geoObj = new CGeo();
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
      this.geoObj.id = id
      this.UnidadEspacialSrv.deleteGeo(id).subscribe((res:any)=>{
        if (res) {
          alert('Geo eliminada correctamente');
          this.getGeo();
        } else {
          alert(res.message)
        }
      })
    }
  }

  onEdit(data: any){
    this.mostrarFormulario = true;
    this.geoObj = Object.assign({}, data);
  }
            
  onCancel(){
    this.mostrarFormulario = false;
    this.geoObj = new CGeo();
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
