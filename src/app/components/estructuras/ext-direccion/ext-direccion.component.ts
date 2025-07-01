import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipe } from '../../../pipe/filter.pipe';
import { Cdireccion, Idireccion } from '../../../model/estructura/extDireccion';
import { EstructuraService } from '../../../services/estructura.service';

@Component({
  selector: 'app-ext-direccion',
  imports: [FormsModule, CommonModule, NgxPaginationModule],
  templateUrl: './ext-direccion.component.html',
  styleUrl: './ext-direccion.component.css'
})
export class ExtDireccionComponent {

  mostrarFormulario: boolean = false;
  searchText: string = '';

  page: number = 1;
  pageSize: number = 5; 
  
  direccionObj: Cdireccion = new Cdireccion();
  direccionArray: Idireccion [] = []

  constructor(private EstructuraSrv: EstructuraService){
    this.getDireccion()
  }

  getDireccion(){
    this.EstructuraSrv.loadDireccion().subscribe((res:any)=>{
      this.direccionArray = res;
    })
  }

  onSaveDireccion(){
      this.mostrarFormulario = true;
      this.EstructuraSrv.createNewDireccion(this.direccionObj).subscribe((res:any)=>{
        if (res){
          alert('Dirección creada correctamente');
          this.mostrarFormulario = false;
          this.getDireccion();
          this.direccionObj = new Cdireccion();
        } else{
          alert (res.message)
        }
      },
    (error: any)=> {
      const errorMessage = this.extractErrorMessage(error)
      alert(errorMessage);
    })
  }

  onUpdateDireccion(){
    this.EstructuraSrv.updateDireccion(this.direccionObj.id, this.direccionObj).subscribe((res:any)=>{
      if (res){
        alert('Dirección actualizada correctamente');
        this.mostrarFormulario = false;
        this.getDireccion();
        this.direccionObj = new Cdireccion();
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
      this.direccionObj.id = id
      this.EstructuraSrv.deleteDireccion(id).subscribe((res:any)=>{
        if (res) {
          alert('Interesado COL eliminado correctamente');
          this.getDireccion();
        } else {
          alert(res.message)
        }
      })
    }
  }

  onEdit(data: any){
    this.mostrarFormulario = true;
    this.direccionObj = Object.assign({}, data);
  }
      
  onCancel(){
    this.mostrarFormulario = false;
    this.direccionObj = new Cdireccion();
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
