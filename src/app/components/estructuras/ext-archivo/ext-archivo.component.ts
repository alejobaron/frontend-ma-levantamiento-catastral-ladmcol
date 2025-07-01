import { CommonModule, formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { CextArchivo, IextArchivo } from '../../../model/estructura/extArchivo';
import { EstructuraService } from '../../../services/estructura.service';
import { FilterPipe } from '../../../pipe/filter.pipe';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-ext-archivo',
  imports: [FormsModule, CommonModule, NgxPaginationModule, FilterPipe, MatNativeDateModule, MatInputModule, MatDatepickerModule],
  templateUrl: './ext-archivo.component.html',
  styleUrl: './ext-archivo.component.css'
})
export class ExtArchivoComponent {

  mostrarFormulario: boolean = false;
  searchText: string = '';

  page: number = 1;
  pageSize: number = 5;
  
  extArchivoObj: CextArchivo = new CextArchivo();
  extArchivoArray: IextArchivo [] = []

  constructor(private EstructuraSrv: EstructuraService){
      this.getExtArchivo()
    }
    
  getExtArchivo(){
    this.EstructuraSrv.loadArchivo().subscribe((res:any)=>{
      this.extArchivoArray = res;
    })
  }

  onSaveExtArchivo(){
    this.mostrarFormulario = true;
    const archivoToSave = {
      ...this.extArchivoObj,
      fecha_aceptacion: this.extArchivoObj.fecha_aceptacion ? formatDate(this.extArchivoObj.fecha_aceptacion, 'yyyy-MM-dd', 'en-US') : null,
      extraccion: this.extArchivoObj.extraccion ? formatDate(this.extArchivoObj.extraccion, 'yyyy-MM-dd', 'en-US') : null,
      fecha_grabacion: this.extArchivoObj.fecha_grabacion ? formatDate(this.extArchivoObj.fecha_grabacion, 'yyyy-MM-dd', 'en-US') : null,
      fecha_entrega: this.extArchivoObj.fecha_entrega ? formatDate(this.extArchivoObj.fecha_entrega, 'yyyy-MM-dd', 'en-US') : null
    };
      this.EstructuraSrv.createArchivo(archivoToSave).subscribe((res:any)=>{
        if (res){
          alert('Repositorio de archivo creado correctamente');
          this.mostrarFormulario = false;
          this.getExtArchivo();
          this.extArchivoObj = new CextArchivo();
        } else{
          alert (res.message)
        }
      },
    (error: any)=> {
      const errorMessage = this.extractErrorMessage(error)
      alert(errorMessage);
    })
  }

  onUpdateExtArchivo(){
    const archivoToUpdate = {
      ...this.extArchivoObj,
      fecha_aceptacion: this.extArchivoObj.fecha_aceptacion ? formatDate(this.extArchivoObj.fecha_aceptacion, 'yyyy-MM-dd', 'en-US') : null,
      extraccion: this.extArchivoObj.extraccion ? formatDate(this.extArchivoObj.extraccion, 'yyyy-MM-dd', 'en-US') : null,
      fecha_grabacion: this.extArchivoObj.fecha_grabacion ? formatDate(this.extArchivoObj.fecha_grabacion, 'yyyy-MM-dd', 'en-US') : null,
      fecha_entrega: this.extArchivoObj.fecha_entrega ? formatDate(this.extArchivoObj.fecha_entrega, 'yyyy-MM-dd', 'en-US') : null
    };
    this.EstructuraSrv.updateArchivo(this.extArchivoObj.id, archivoToUpdate).subscribe((res:any)=>{
      if (res){
        alert('Repositorio de archivo actualizado correctamente');
        this.mostrarFormulario = false;
        this.getExtArchivo();
        this.extArchivoObj = new CextArchivo();
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
      this.extArchivoObj.id = id
      this.EstructuraSrv.deleteArchivo(id).subscribe((res:any)=>{
        if (res) {
          alert('Repositorio de archivo eliminado correctamente');
          this.getExtArchivo();
        } else {
          alert(res.message)
        }
      })
    }
  }

  onEdit(data: any){
    this.mostrarFormulario = true;
    this.extArchivoObj = Object.assign({}, data);
  }
            
  onCancel(){
    this.mostrarFormulario = false;
    this.extArchivoObj = new CextArchivo();
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
