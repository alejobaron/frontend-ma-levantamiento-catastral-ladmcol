import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InteresadoService } from '../../../services/interesado.service';
import { CommonModule } from '@angular/common';
import { CinteresadoCOL, IinteresadoCOL } from '../../../model/paqueteInteresados/interesadoCol';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipe } from '../../../pipe/filter.pipe';
import { RouterModule } from '@angular/router';
import { IinteresadoExt } from '../../../model/estructura/extInteresado';
import { EstructuraService } from '../../../services/estructura.service';

@Component({
  selector: 'app-col-interesado',
  imports: [FormsModule, CommonModule, NgxPaginationModule, FilterPipe, RouterModule],
  templateUrl: './col-interesado.component.html',
  styleUrl: './col-interesado.component.css'
})
export class ColInteresadoComponent {

  mostrarFormulario: boolean = false;
  
  searchText: string = '';

  page: number = 1; 
  pageSize: number = 5;

  colInteresadoObj: CinteresadoCOL = new CinteresadoCOL();

  colInteresadoArray: IinteresadoCOL [] = []

    interesados: IinteresadoExt[] = [];

  constructor(
    private InteresadoSrv: InteresadoService,
    private EstructuraSrv: EstructuraService
  ){}

  ngOnInit(): void {
    this.getColInteresado();
    this.getExtInteresado(); 
  }

  getExtInteresado() {
    this.EstructuraSrv.loadExtInteresado().subscribe({
      next: (res: any) => {
        this.interesados = res;
      },
      error: (err) => {
        console.error('Error cargando interesados:', err);
      }
    });
  }

  getColInteresado(){
    this.InteresadoSrv.loadColInteresado().subscribe((res:any)=>{
      this.colInteresadoArray = res;
    })
  }

  onSaveColInteresado(){
    this.mostrarFormulario = true;
    this.InteresadoSrv.createNewInteresadoCOL(this.colInteresadoObj).subscribe((res:any)=>{
      if (res) {
        alert('Interesado COL creado correctamente');
        this.mostrarFormulario = false;
        this.getColInteresado();
        this.colInteresadoObj = new CinteresadoCOL();
      } else {
        alert(res.message)
      }
    },
    (error: any) => {
      const errorMessage = this.extractErrorMessage(error); 
      alert(errorMessage);  
    })
  }

  onUpdateColInteresdo(){
    this.InteresadoSrv.updateInteresadoCOL(this.colInteresadoObj.id, this.colInteresadoObj).subscribe((res:any)=>{
      if (res) {
        alert('Interesado COL actualizado correctamente');
        this.mostrarFormulario = false;
        this.getColInteresado();
        this.colInteresadoObj = new CinteresadoCOL();
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
      this.colInteresadoObj.id = id
      this.InteresadoSrv.deleteInteresadoCOL(id).subscribe((res:any)=>{
      if (res) {
        alert('Interesado COL eliminado correctamente');
        this.getColInteresado();
      } else {
        alert(res.message)
      }
    })
    }    
  }

  onEdit(data: any){
    this.mostrarFormulario = true;
    this.colInteresadoObj = Object.assign({}, data);
  }

  onCancel(){
    this.mostrarFormulario = false;
    this.colInteresadoObj = new CinteresadoCOL();
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
