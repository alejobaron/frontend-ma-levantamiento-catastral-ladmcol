import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipe } from '../../../pipe/filter.pipe';
import { Cmiembros, Imiembros } from '../../../model/paqueteInteresados/miembros';
import { InteresadoService } from '../../../services/interesado.service';
import { RouterModule } from '@angular/router';
import { IinteresadoCOL } from '../../../model/paqueteInteresados/interesadoCol';
import { IcolAgrupacionInteresados } from '../../../model/paqueteInteresados/agrupacionInteresadosCOL';

@Component({
  selector: 'app-col-miembros',
  imports: [FormsModule, CommonModule, NgxPaginationModule, FilterPipe, RouterModule],
  templateUrl: './col-miembros.component.html',
  styleUrl: './col-miembros.component.css'
})
export class ColMiembrosComponent {

  mostrarFormulario: boolean = false;
  searchText: string = '';

  page: number = 1; 
  pageSize: number = 5; 

  miembrosObj: Cmiembros = new Cmiembros();
  miembrosArray: Imiembros [] = []

  interesados: IinteresadoCOL[] = [];
  agrupaciones: IcolAgrupacionInteresados[] = [];

  constructor(
    private InteresadoSrv: InteresadoService
  ){}

  ngOnInit(): void {
    this.getMiembros();
    this.getInteresadosCOL();
    this.getColAgrupacionInteresados()
  }
    
  getMiembros(){
    this.InteresadoSrv.loadMiembros().subscribe((res:any)=>{
      this.miembrosArray = res;
    })
  }

  getInteresadosCOL() {
    this.InteresadoSrv.loadColInteresado().subscribe({
      next: (res: any) => {
        this.interesados = res;
      },
      error: (err) => {
        console.error('Error cargando interesados', err);
      }
    });
  }

  getColAgrupacionInteresados() {
    this.InteresadoSrv.loadColAgrupacionInteresados().subscribe({
      next: (res: any) => {
        this.agrupaciones = res;
      },
      error: (err) => {
        console.error('Error cargando agrupaciones', err);
      }
    });
  }

  onSave(){
    this.mostrarFormulario = true;
      this.InteresadoSrv.createMiembros(this.miembrosObj).subscribe((res:any)=>{
        if (res){
          alert('Miembros creado correctamente');
          this.mostrarFormulario = false;
          this.getMiembros();
          this.miembrosObj = new Cmiembros();
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
    this.InteresadoSrv.updateMiembros(this.miembrosObj.id, this.miembrosObj).subscribe((res:any)=>{
      if (res){
        alert('Miembros actulizado correctamente');
        this.mostrarFormulario = false;
        this.getMiembros();
        this.miembrosObj = new Cmiembros();
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
      this.miembrosObj.id = id
      this.InteresadoSrv.deleteMiembros(id).subscribe((res:any)=>{
        if (res) {
          alert('Miembros eliminado correctamente');
          this.getMiembros();
        } else {
          alert(res.message)
        }
      })
    }
  }

  onEdit(data: any){
    this.mostrarFormulario = true;
    this.miembrosObj = Object.assign({}, data);
  }
            
  onCancel(){
    this.mostrarFormulario = false;
    this.miembrosObj = new Cmiembros();
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
