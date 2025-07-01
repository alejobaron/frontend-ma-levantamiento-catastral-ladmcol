import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipe } from '../../../pipe/filter.pipe';
import { CcrAgrupacionInteresados, IcrAgrupacionINteresados } from '../../../model/paqueteInteresados/agrupacionInteresadosCR';
import { InteresadoService } from '../../../services/interesado.service';
import { RouterModule } from '@angular/router';
import { IcolAgrupacionInteresados } from '../../../model/paqueteInteresados/agrupacionInteresadosCOL';

@Component({
  selector: 'app-cr-agrupacion-interesados',
  imports: [FormsModule, CommonModule, NgxPaginationModule, FilterPipe, RouterModule],
  templateUrl: './cr-agrupacion-interesados.component.html',
  styleUrl: './cr-agrupacion-interesados.component.css'
})
export class CrAgrupacionInteresadosComponent {

  mostrarFormulario: boolean = false;
    searchText: string = '';
  
    page: number = 1; 
    pageSize: number = 5;
  
    crAgrupacionInteresadosObj: CcrAgrupacionInteresados = new CcrAgrupacionInteresados();
    crAgrupacionInteresadosArray: IcrAgrupacionINteresados [] = []

    agrupaciones: IcolAgrupacionInteresados[] = [];
  
    constructor(
      private InteresadoSrv: InteresadoService
    ){}

    ngOnInit(): void {
      this.getCRAgrupacionInteresados()
      this.getColAgrupacionInteresados()
    }
      
    getCRAgrupacionInteresados(){
      this.InteresadoSrv.loadCRAgrupacionInteresados().subscribe((res:any)=>{
        this.crAgrupacionInteresadosArray = res;
      })
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
        this.InteresadoSrv.createCRAgrupacionInteresados(this.crAgrupacionInteresadosObj).subscribe((res:any)=>{
          if (res){
            alert('Agrupación de interesado CR creada correctamente');
            this.mostrarFormulario = false;
            this.getCRAgrupacionInteresados();
            this.crAgrupacionInteresadosObj = new CcrAgrupacionInteresados();
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
      this.InteresadoSrv.updateCRAgrupacionInteresados(this.crAgrupacionInteresadosObj.id, this.crAgrupacionInteresadosObj).subscribe((res:any)=>{
        if (res){
          alert('Agrupación de interesado CR correctamente');
          this.mostrarFormulario = false;
          this.getCRAgrupacionInteresados();
          this.crAgrupacionInteresadosObj = new CcrAgrupacionInteresados();
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
        this.crAgrupacionInteresadosObj.id = id
        this.InteresadoSrv.deleteCRAgrupacionInteresados(id).subscribe((res:any)=>{
          if (res) {
            alert('Agrupación de interesado CR eliminada correctamente');
            this.getCRAgrupacionInteresados();
          } else {
            alert(res.message)
          }
        })
      }
    }
  
    onEdit(data: any){
      this.mostrarFormulario = true;
      this.crAgrupacionInteresadosObj = Object.assign({}, data);
    }
              
    onCancel(){
      this.mostrarFormulario = false;
      this.crAgrupacionInteresadosObj = new CcrAgrupacionInteresados();
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
