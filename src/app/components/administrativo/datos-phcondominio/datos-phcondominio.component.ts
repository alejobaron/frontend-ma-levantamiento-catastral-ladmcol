import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipe } from '../../../pipe/filter.pipe';
import { CdatosPHCondominio, IdatosPHCondominio } from '../../../model/paqueteAdministrativo/datosPHCondominio';
import { AdministrativoService } from '../../../services/administrativo.service';
import { RouterModule } from '@angular/router';
import { Ipredio } from '../../../model/paqueteAdministrativo/predio';

@Component({
  selector: 'app-datos-phcondominio',
  imports: [FormsModule, CommonModule, NgxPaginationModule, FilterPipe, RouterModule],
  templateUrl: './datos-phcondominio.component.html',
  styleUrl: './datos-phcondominio.component.css'
})
export class DatosPHCondominioComponent {

  mostrarFormulario: boolean = false;
  searchText: string = '';

  page: number = 1; 
  pageSize: number = 5; 

  datosPHCondominioObj: CdatosPHCondominio = new CdatosPHCondominio();
  
  datosPHCondominioArray: IdatosPHCondominio [] = []

  predios: Ipredio[] = [];

  constructor(
    private AdministrativoSrv: AdministrativoService)
    {}

  ngOnInit(): void {
    this.getDatosPHCondominio();
    this.getPredios()
    
  }
    
  getDatosPHCondominio(){
    this.AdministrativoSrv.loadDatosPHCondominio().subscribe((res:any)=>{
      this.datosPHCondominioArray = res;
    })
  }

  getPredios() {
    this.AdministrativoSrv.loadPredio().subscribe({
      next: (res: any) => {
        this.predios = res;
      },
      error: (err) => {
        console.error('Error cargando predios', err);
      }
    });
  }

  onSave(){
    this.mostrarFormulario = true;
      this.AdministrativoSrv.createDatosPHCondominio(this.datosPHCondominioObj).subscribe((res:any)=>{
        if (res){
          alert('Datos de PH-Condominio creado correctamente');
          this.mostrarFormulario = false;
          this.getDatosPHCondominio();
          this.datosPHCondominioObj = new CdatosPHCondominio();
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
    this.AdministrativoSrv.updateDatosPHCondominio(this.datosPHCondominioObj.id, this.datosPHCondominioObj).subscribe((res:any)=>{
      if (res){
        alert('Datos de PH-Condominio actualizado correctamente');
        this.mostrarFormulario = false;
        this.getDatosPHCondominio();
        this.datosPHCondominioObj = new CdatosPHCondominio();
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
      this.datosPHCondominioObj.id = id
      this.AdministrativoSrv.deleteDatosPHCondominio(id).subscribe((res:any)=>{
        if (res) {
          alert('Datos de PH-Condominio eliminado correctamente');
          this.getDatosPHCondominio();
        } else {
          alert(res.message)
        }
      })
    }
  }

  onEdit(data: any){
    this.mostrarFormulario = true;
    this.datosPHCondominioObj = Object.assign({}, data);
  }
            
  onCancel(){
    this.mostrarFormulario = false;
    this.datosPHCondominioObj = new CdatosPHCondominio();
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
