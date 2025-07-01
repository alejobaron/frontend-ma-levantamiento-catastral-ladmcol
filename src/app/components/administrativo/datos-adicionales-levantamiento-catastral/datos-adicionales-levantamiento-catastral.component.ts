import { CommonModule, formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipe } from '../../../pipe/filter.pipe';
import { CdatosAdicionlesLevantamientoCatastral, IdatosAdicionlesLevantamientoCatastral } from '../../../model/paqueteAdministrativo/datosAdicionalesLevantamientoCatastral';
import { AdministrativoService } from '../../../services/administrativo.service';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { RouterModule } from '@angular/router';
import { DominiosService } from '../../../services/dominios.service';
import { Ipredio } from '../../../model/paqueteAdministrativo/predio';

@Component({
  selector: 'app-datos-adicionales-levantamiento-catastral',
  imports: [FormsModule, CommonModule, NgxPaginationModule, FilterPipe, MatNativeDateModule, MatInputModule, MatDatepickerModule, RouterModule],
  templateUrl: './datos-adicionales-levantamiento-catastral.component.html',
  styleUrl: './datos-adicionales-levantamiento-catastral.component.css'
})
export class DatosAdicionalesLevantamientoCatastralComponent {

  mostrarFormulario: boolean = false;
  searchText: string = '';

  tiposResultadoVisita: { valor: number; etiqueta: string }[] = [];

  page: number = 1;
  pageSize: number = 5;

  datoAdicionlLevantamientoCatastralObj: CdatosAdicionlesLevantamientoCatastral = new CdatosAdicionlesLevantamientoCatastral();  
  datoAdicionlLevantamientoCatastralArray: IdatosAdicionlesLevantamientoCatastral [] = []

  predios: Ipredio[] = [];

  constructor(
    private AdministrativoSrv: AdministrativoService,
    private DominiosSrv: DominiosService,
  ){}

  ngOnInit(): void {
    this.getDatosAdicionlesLevantamientoCatastral();
    this.getTiposResultadoVisita();
    this.getPredios()
  }
    
  getDatosAdicionlesLevantamientoCatastral(){
    this.AdministrativoSrv.loadDatoAdicionalLevantamientoCatastral().subscribe((res:any)=>{
      this.datoAdicionlLevantamientoCatastralArray = res;
    })
  }

  getTiposResultadoVisita() {
    this.DominiosSrv.loadTiposResultadoVisita().subscribe(res => {
      this.tiposResultadoVisita = res.map(item => ({
        valor: item.id,
        etiqueta: item.tipo_display
      }));
    });
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
    const fechaToSave = {
          ...this.datoAdicionlLevantamientoCatastralObj,
          fecha_visita_predial: this.datoAdicionlLevantamientoCatastralObj.fecha_visita_predial ? formatDate(this.datoAdicionlLevantamientoCatastralObj.fecha_visita_predial, 'yyyy-MM-dd', 'en-US') : null,
    };          
    this.AdministrativoSrv.createDatoAdicionalLevantamientoCatastral(fechaToSave).subscribe((res:any)=>{
      if (res){
        alert('Dato adicional de levantamiento catastral creado correctamente');
        this.mostrarFormulario = false;
        this.getDatosAdicionlesLevantamientoCatastral();
        this.datoAdicionlLevantamientoCatastralObj = new CdatosAdicionlesLevantamientoCatastral();
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
    const dataToSave = {
      ...this.datoAdicionlLevantamientoCatastralObj,
      fecha_visita_predial: this.datoAdicionlLevantamientoCatastralObj.fecha_visita_predial ? formatDate(this.datoAdicionlLevantamientoCatastralObj.fecha_visita_predial, 'yyyy-MM-dd', 'en-US') : null,
    };

    this.AdministrativoSrv.updateDatoAdicionalLevantamientoCatastral(this.datoAdicionlLevantamientoCatastralObj.id, dataToSave).subscribe((res:any)=>{
      if (res){
        alert('Dato adicional de levantamiento catastral actualizado correctamente');
        this.mostrarFormulario = false;
        this.getDatosAdicionlesLevantamientoCatastral();
        this.datoAdicionlLevantamientoCatastralObj = new CdatosAdicionlesLevantamientoCatastral();
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
      this.datoAdicionlLevantamientoCatastralObj.id = id
      this.AdministrativoSrv.deleteDatoAdicionalLevantamientoCatastral(id).subscribe((res:any)=>{
        if (res) {
          alert('Dato adicional de levantamiento catastral eliminado correctamente');
          this.getDatosAdicionlesLevantamientoCatastral();
        } else {
          alert(res.message)
        }
      })
    }
  }

  onEdit(data: any){
    this.mostrarFormulario = true;
    this.datoAdicionlLevantamientoCatastralObj = Object.assign({}, data);
  }
            
  onCancel(){
    this.mostrarFormulario = false;
    this.datoAdicionlLevantamientoCatastralObj = new CdatosAdicionlesLevantamientoCatastral();
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
