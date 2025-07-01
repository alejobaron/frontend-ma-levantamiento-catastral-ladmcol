import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipe } from '../../../pipe/filter.pipe';
import { CinteresadoExt, IinteresadoExt } from '../../../model/estructura/extInteresado';
import { EstructuraService } from '../../../services/estructura.service';
import { RouterModule } from '@angular/router';
import { Idireccion } from '../../../model/estructura/extDireccion';

@Component({
  selector: 'app-ext-interesado',
  imports: [FormsModule, CommonModule, NgxPaginationModule, FilterPipe, RouterModule],
  templateUrl: './ext-interesado.component.html',
  styleUrl: './ext-interesado.component.css'
})
export class ExtInteresadoComponent {

  mostrarFormulario: boolean = false;
  searchText: string = '';
  
  page: number = 1; 
  pageSize: number = 10;
  

  extInteresadoObj: CinteresadoExt = new CinteresadoExt();
  extInteresadoArray: IinteresadoExt [] = []
  direcciones: Idireccion[] = [];

  constructor(private EstructuraSrv: EstructuraService){
    this.getExtInteresado()
    this.getDirecciones();
  }

  getExtInteresado(){
    this.EstructuraSrv.loadExtInteresado().subscribe((res:any)=>{
      this.extInteresadoArray = res;
    })
  }

  getDirecciones() {
    this.EstructuraSrv.loadDireccion().subscribe({
      next: (res: any) => {
        this.direcciones = res;
      },
      error: (err) => {
        console.error('Error cargando direcciones:', err);
      }
    });
  }

  onSaveExtInteresado(){
    this.mostrarFormulario = true;
    this.EstructuraSrv.createNewEXtInteresado(this.extInteresadoObj).subscribe((res:any)=>{
      if (res){
        alert('Interesado creado correctamente');
        this.mostrarFormulario = false;
        this.getExtInteresado();
        this.extInteresadoObj = new CinteresadoExt();
      }
    },
  (error: any) => {
    const errorMessage = this.extractErrorMessage(error);
    alert(errorMessage);
  })
  }

  onUpdateExtInteresado(){
    this.EstructuraSrv.updateExtInteresado(this.extInteresadoObj.id, this.extInteresadoObj).subscribe((res:any)=>{
      if (res){
        alert('Interesado actualizado correctamente');
        this.mostrarFormulario = false;
        this.getExtInteresado();
        this.extInteresadoObj = new CinteresadoExt();
      } else {
        alert(res.message)
      }
    },
    (error: any) => {
      const errorMessage = this.extractErrorMessage(error); 
      alert(errorMessage); 
    })
  }

  onDelete(id:number){
    const isDelete = confirm("¿Esta seguro que desea eliminar este registro?");
    if(isDelete == true){
      this.extInteresadoObj.id = id
      this.EstructuraSrv.deleteExtInteresado(id).subscribe((res:any)=>{
      if (res) {
        alert('Interesado eliminado correctamente');
        this.getExtInteresado();
      } else {
        alert(res.message)
      }
    })
    } 
  }

  onEdit(data: any){
    this.mostrarFormulario = true;
    this.extInteresadoObj = Object.assign({}, data);
  }
    
  onCancel(){
    this.mostrarFormulario = false;
    this.extInteresadoObj = new CinteresadoExt();
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
