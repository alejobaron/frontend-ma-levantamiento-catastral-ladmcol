import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { CvolumenValor, IvolumenValor } from '../../../model/estructura/volumenValor';
import { EstructuraService } from '../../../services/estructura.service';
import { FilterPipe } from '../../../pipe/filter.pipe';

@Component({
  selector: 'app-volumen-valor',
  imports: [FormsModule, CommonModule, NgxPaginationModule, FilterPipe],
  templateUrl: './volumen-valor.component.html',
  styleUrl: './volumen-valor.component.css'
})
export class VolumenValorComponent {

  mostrarFormulario: boolean = false;
  searchText: string = '';

  page: number = 1; 
  pageSize: number = 5; 

  volumenValorObj: CvolumenValor = new CvolumenValor();
  
  volumenValorArray: IvolumenValor [] = []

  constructor(private EstructuraSrv: EstructuraService){
    this.getVolumenValor()
  }
    
  getVolumenValor(){
    this.EstructuraSrv.loadVolumenValor().subscribe((res:any)=>{
      this.volumenValorArray = res;
    })
  }

  onSaveVolumenValor(){
    this.mostrarFormulario = true;
      this.EstructuraSrv.createVolumenValor(this.volumenValorObj).subscribe((res:any)=>{
        if (res){
          alert('Valor de volumen creado correctamente');
          this.mostrarFormulario = false;
          this.getVolumenValor();
          this.volumenValorObj = new CvolumenValor();
        } else{
          alert (res.message)
        }
      },
    (error: any)=> {
      const errorMessage = this.extractErrorMessage(error)
      alert(errorMessage);
    })
  }

  onUpdateVolumenValor(){
    this.EstructuraSrv.updateVolumenValor(this.volumenValorObj.id, this.volumenValorObj).subscribe((res:any)=>{
      if (res){
        alert('Valor de volumen actualizado correctamente');
        this.mostrarFormulario = false;
        this.getVolumenValor();
        this.volumenValorObj = new CvolumenValor();
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
      this.volumenValorObj.id = id
      this.EstructuraSrv.deleteVolumenValor(id).subscribe((res:any)=>{
        if (res) {
          alert('Valor de volumen eliminado correctamente');
          this.getVolumenValor();
        } else {
          alert(res.message)
        }
      })
    }
  }

  onEdit(data: any){
    this.mostrarFormulario = true;
    this.volumenValorObj = Object.assign({}, data);
  }
            
  onCancel(){
    this.mostrarFormulario = false;
    this.volumenValorObj = new CvolumenValor();
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
