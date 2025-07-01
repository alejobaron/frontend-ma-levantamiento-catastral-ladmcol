import { CommonModule, formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipe } from '../../../pipe/filter.pipe';
import { Cderecho, Iderecho } from '../../../model/paqueteAdministrativo/derecho';
import { AdministrativoService } from '../../../services/administrativo.service';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { RouterModule } from '@angular/router';
import { DominiosService } from '../../../services/dominios.service';
import { Idrr } from '../../../model/paqueteAdministrativo/drr';

@Component({
  selector: 'app-derecho',
  imports: [FormsModule, CommonModule, NgxPaginationModule, FilterPipe, MatNativeDateModule, MatInputModule, MatDatepickerModule, RouterModule],
  templateUrl: './derecho.component.html',
  styleUrl: './derecho.component.css'
})
export class DerechoComponent {

  mostrarFormulario: boolean = false;
  searchText: string = '';

  tiposDerecho: { valor: number; etiqueta: string }[] = [];

  page: number = 1;
  pageSize: number = 5; 

  derechoObj: Cderecho = new Cderecho();
  derechoArray: Iderecho [] = []
  drrs: Idrr[] = [];

  constructor(
    private AdministrativoSrv: AdministrativoService,
    private DominiosSrv: DominiosService
  ){}

  ngOnInit(): void {
    this.getDerecho();
    this.getTiposDerecho();
    this.getDRRs()
  }
  
  getDerecho(){
    this.AdministrativoSrv.loadDerecho().subscribe((res:any)=>{
      this.derechoArray = res;
    })
  }

  getTiposDerecho() {
    this.DominiosSrv.loadTiposDerecho().subscribe(res => {
      this.tiposDerecho = res.map(item => ({
        valor: item.id,
        etiqueta: item.tipo_display
      }));
    });
  }

  getDRRs() {
    this.AdministrativoSrv.loadDRR().subscribe({
      next: (res: any) => {
        this.drrs = res;
      },
      error: (err) => {
        console.error('Error cargando DRR', err);
      }
    });
  }

  onSave(){
    this.mostrarFormulario = true;
    const derechoToSave = {
          ...this.derechoObj,
          fecha_inicio_tenencia: this.derechoObj.fecha_inicio_tenencia ? formatDate(this.derechoObj.fecha_inicio_tenencia, 'yyyy-MM-dd', 'en-US') : null,
    }; 
      this.AdministrativoSrv.createDerecho(derechoToSave).subscribe((res:any)=>{
        if (res){
          alert('Derecho creado correctamente');
          this.mostrarFormulario = false;
          this.getDerecho();
          this.derechoObj = new Cderecho();
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
    const derechoToSave = {
      ...this.derechoObj,
      fecha_inicio_tenencia: this.derechoObj.fecha_inicio_tenencia ? formatDate(this.derechoObj.fecha_inicio_tenencia, 'yyyy-MM-dd', 'en-US') : null,
    };
    this.AdministrativoSrv.updateDerecho(this.derechoObj.id, derechoToSave).subscribe((res:any)=>{
      if (res){
        alert('Derecho actualizado correctamente');
        this.mostrarFormulario = false;
        this.getDerecho();
        this.derechoObj = new Cderecho();
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
      this.derechoObj.id = id
      this.AdministrativoSrv.deleteDerecho(id).subscribe((res:any)=>{
        if (res) {
          alert('Derecho eliminado correctamente');
          this.getDerecho();
        } else {
          alert(res.message)
        }
      })
    }
  }

  onEdit(data: any){
    this.mostrarFormulario = true;
    this.derechoObj = Object.assign({}, data);
  }
            
  onCancel(){
    this.mostrarFormulario = false;
    this.derechoObj = new Cderecho();
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
