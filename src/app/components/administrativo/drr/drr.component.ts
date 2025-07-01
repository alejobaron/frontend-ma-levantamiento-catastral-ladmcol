import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipe } from '../../../pipe/filter.pipe';
import { Cdrr, Idrr } from '../../../model/paqueteAdministrativo/drr';
import { AdministrativoService } from '../../../services/administrativo.service';
import { RouterModule } from '@angular/router';
import { DominiosService } from '../../../services/dominios.service';
import { IunidadAdministrativaBasica } from '../../../model/paqueteAdministrativo/unidadBasicaAdministrativa';

@Component({
  selector: 'app-drr',
  imports: [FormsModule, CommonModule, NgxPaginationModule, FilterPipe, RouterModule],
  templateUrl: './drr.component.html',
  styleUrl: './drr.component.css'
})
export class DRRComponent {

  mostrarFormulario: boolean = false;
  searchText: string = '';

  page: number = 1; 
  pageSize: number = 5; 

  DRRObj: Cdrr = new Cdrr();
  DRRArray: Idrr [] = []

  unidadesAdministrativasBasicas: IunidadAdministrativaBasica[] = [];

  constructor(
    private AdministrativoSrv: AdministrativoService
  ){}

  ngOnInit(): void {
    this.getDRR();
    this.getUnidadesBasicasAdministrativas()
  }

  getDRR(){
    this.AdministrativoSrv.loadDRR().subscribe((res:any)=>{
      this.DRRArray = res;
    })
  }

  getUnidadesBasicasAdministrativas() {
    this.AdministrativoSrv.loadUnidadAdministrativaBasica().subscribe({
      next: (res: any) => {
        this.unidadesAdministrativasBasicas = res;
      },
      error: (err) => {
        console.error('Error cargando unidades basicas administrativas', err);
      }
    });
  }

  onSave(){
    this.mostrarFormulario = true;
      this.AdministrativoSrv.createDRR(this.DRRObj).subscribe((res:any)=>{
        if (res){
          alert('DRR creada correctamente');
          this.mostrarFormulario = false;
          this.getDRR();
          this.DRRObj = new Cdrr();
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
    this.AdministrativoSrv.updateDRR(this.DRRObj.id, this.DRRObj).subscribe((res:any)=>{
      if (res){
        alert('DRR actualizada correctamente');
        this.mostrarFormulario = false;
        this.getDRR();
        this.DRRObj = new Cdrr();
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
      this.DRRObj.id = id
      this.AdministrativoSrv.deleteDRR(id).subscribe((res:any)=>{
        if (res) {
          alert('DRR eliminado correctamente');
          this.getDRR();
        } else {
          alert(res.message)
        }
      })
    }
  }

  onEdit(data: any){
    this.mostrarFormulario = true;
    this.DRRObj = Object.assign({}, data);
  }
            
  onCancel(){
    this.mostrarFormulario = false;
    this.DRRObj = new Cdrr();
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
