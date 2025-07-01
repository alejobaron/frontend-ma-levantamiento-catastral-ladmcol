import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { CnovedadNumeroPredial, InovedadNumeroPredial } from '../../../model/estructura/novedadNumeroPredial';
import { EstructuraService } from '../../../services/estructura.service';
import { FilterPipe } from '../../../pipe/filter.pipe';

@Component({
  selector: 'app-ext-novedad-numero-predial',
  imports: [FormsModule, CommonModule, NgxPaginationModule, FilterPipe],
  templateUrl: './ext-novedad-numero-predial.component.html',
  styleUrl: './ext-novedad-numero-predial.component.css'
})
export class ExtNovedadNumeroPredialComponent {

  mostrarFormulario: boolean = false;
  searchText: string = '';

  page: number = 1; 
  pageSize: number = 5; 
  

  novedadNumeroPredialObj: CnovedadNumeroPredial = new CnovedadNumeroPredial();

  novedadNumeroPredialArray: InovedadNumeroPredial [] = []

  constructor(private EstructuraSrv: EstructuraService){
      this.getNovedadNumeroPredial()
    }
  
  getNovedadNumeroPredial(){
    this.EstructuraSrv.loadNovedadNumeroPredial().subscribe((res:any)=>{
      this.novedadNumeroPredialArray = res;
    })
  }

  onSaveNovedadNumeroPredial(){
    this.mostrarFormulario = true;
      this.EstructuraSrv.createNovedadNumeroPredial(this.novedadNumeroPredialObj).subscribe((res:any)=>{
        if (res){
          alert('Novedad de número predial creada correctamente');
          this.mostrarFormulario = false;
          this.getNovedadNumeroPredial();
          this.novedadNumeroPredialObj = new CnovedadNumeroPredial();
        } else{
          alert (res.message)
        }
      },
    (error: any)=> {
      const errorMessage = this.extractErrorMessage(error)
      alert(errorMessage);
    })
  }
  
  onUpdateNovedadNumeroPredial(){
    this.EstructuraSrv.updateNovedadNumeroPredial(this.novedadNumeroPredialObj.id, this.novedadNumeroPredialObj).subscribe((res:any)=>{
      if (res){
        alert('Novedad de número predial actualizada correctamente');
        this.mostrarFormulario = false;
        this.getNovedadNumeroPredial();
        this.novedadNumeroPredialObj = new CnovedadNumeroPredial();
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
      this.novedadNumeroPredialObj.id = id
      this.EstructuraSrv.deleteNovedadNumeroPredial(id).subscribe((res:any)=>{
        if (res) {
          alert('Novedad de número predial eliminado correctamente');
          this.getNovedadNumeroPredial();
        } else {
          alert(res.message)
        }
      })
    }
  }
  
  onEdit(data: any){
    this.mostrarFormulario = true;
    this.novedadNumeroPredialObj = Object.assign({}, data);
  }
        
  onCancel(){
    this.mostrarFormulario = false;
    this.novedadNumeroPredialObj = new CnovedadNumeroPredial();
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
