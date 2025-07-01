import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { CareaValor, IareaValor } from '../../../model/estructura/areaValor';
import { EstructuraService } from '../../../services/estructura.service';
import { FilterPipe } from '../../../pipe/filter.pipe';

@Component({
  selector: 'app-area-valor',
  imports: [FormsModule, CommonModule, NgxPaginationModule, FilterPipe],
  templateUrl: './area-valor.component.html',
  styleUrl: './area-valor.component.css'
})
export class AreaValorComponent {
  mostrarFormulario: boolean = false;
  searchText: string = '';

  page: number = 1; 
  pageSize: number = 5; 

  areaValorObj: CareaValor = new CareaValor();
  areaValorArray: IareaValor [] = []

  constructor(private EstructuraSrv: EstructuraService){
    this.getAreaValor()
  }
    
  getAreaValor(){
    this.EstructuraSrv.loadAreaValor().subscribe((res:any)=>{
      this.areaValorArray = res;
    })
  }

  onSaveAreaValor(){
    this.mostrarFormulario = true;
      this.EstructuraSrv.createAreaValor(this.areaValorObj).subscribe((res:any)=>{
        if (res){
          alert('Valor de área creado correctamente');
          this.mostrarFormulario = false;
          this.getAreaValor();
          this.areaValorObj = new CareaValor();
        } else{
          alert (res.message)
        }
      },
    (error: any)=> {
      const errorMessage = this.extractErrorMessage(error)
      alert(errorMessage);
    })
  }

  onUpdateAreaValor(){
    this.EstructuraSrv.updateAreaValor(this.areaValorObj.id, this.areaValorObj).subscribe((res:any)=>{
      if (res){
        alert('Valor de área actualizado correctamente');
        this.mostrarFormulario = false;
        this.getAreaValor();
        this.areaValorObj = new CareaValor();
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
      this.areaValorObj.id = id
      this.EstructuraSrv.deleteAreaValor(id).subscribe((res:any)=>{
        if (res) {
          alert('Valor de área eliminado correctamente');
          this.getAreaValor();
        } else {
          alert(res.message)
        }
      })
    }
  }

  onEdit(data: any){
    this.mostrarFormulario = true;
    this.areaValorObj = Object.assign({}, data);
  }
            
  onCancel(){
    this.mostrarFormulario = false;
    this.areaValorObj = new CareaValor();
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
