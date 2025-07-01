import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { CnovedadFMI, InovedadFMI } from '../../../model/estructura/novedadFMI';
import { EstructuraService } from '../../../services/estructura.service';
import { FilterPipe } from '../../../pipe/filter.pipe';

@Component({
  selector: 'app-ext-novedad-fmi',
  imports: [FormsModule, CommonModule, NgxPaginationModule, FilterPipe],
  templateUrl: './ext-novedad-fmi.component.html',
  styleUrl: './ext-novedad-fmi.component.css'
})
export class ExtNovedadFMIComponent {

  mostrarFormulario: boolean = false;
  searchText: string = '';

  page: number = 1;
  pageSize: number = 5;
  

  novedadFMIObj: CnovedadFMI = new CnovedadFMI();

  novedadFMIArray: InovedadFMI [] = []

  constructor(private EstructuraSrv: EstructuraService){
      this.getNovedadFMI()
    }
  
  getNovedadFMI(){
    this.EstructuraSrv.loadNovedadFMI().subscribe((res:any)=>{
      this.novedadFMIArray = res;
    })
  }

  onSaveNovedadFMI(){
    this.mostrarFormulario = true;
      this.EstructuraSrv.createNovedadFMI(this.novedadFMIObj).subscribe((res:any)=>{
        if (res){
          alert('Novedad de FMI creada correctamente');
          this.mostrarFormulario = false;
          this.getNovedadFMI();
          this.novedadFMIObj = new CnovedadFMI();
        } else{
          alert (res.message)
        }
      },
    (error: any)=> {
      const errorMessage = this.extractErrorMessage(error)
      alert(errorMessage);
    })
  }

  onUpdateNovedadFMI(){
    this.EstructuraSrv.updateNovedadFMI(this.novedadFMIObj.id, this.novedadFMIObj).subscribe((res:any)=>{
      if (res){
        alert('Novedad de FMI actualizada correctamente');
        this.mostrarFormulario = false;
        this.getNovedadFMI();
        this.novedadFMIObj = new CnovedadFMI();
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
      this.novedadFMIObj.id = id
      this.EstructuraSrv.deleteNovedadFMI(id).subscribe((res:any)=>{
        if (res) {
          alert('Novedad de FMI eliminado correctamente');
          this.getNovedadFMI();
        } else {
          alert(res.message)
        }
      })
    }
  }

  onEdit(data: any){
    this.mostrarFormulario = true;
    this.novedadFMIObj = Object.assign({}, data);
  }
          
  onCancel(){
    this.mostrarFormulario = false;
    this.novedadFMIObj = new CnovedadFMI();
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
