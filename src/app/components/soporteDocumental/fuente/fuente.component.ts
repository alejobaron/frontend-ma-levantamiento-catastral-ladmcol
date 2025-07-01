import { CommonModule, formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipe } from '../../../pipe/filter.pipe';
import { Cfuente, Ifuente } from '../../../model/soporteDocumental/fuente';
import { SoporteDocumentalService } from '../../../services/soporte-documental.service';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { RouterModule } from '@angular/router';
import { DominiosService } from '../../../services/dominios.service';
import { IextArchivo } from '../../../model/estructura/extArchivo';
import { EstructuraService } from '../../../services/estructura.service';

@Component({
  selector: 'app-fuente',
  imports: [FormsModule, CommonModule, NgxPaginationModule, FilterPipe, MatNativeDateModule, MatInputModule, MatDatepickerModule, RouterModule],
  templateUrl: './fuente.component.html',
  styleUrl: './fuente.component.css'
})
export class FuenteComponent {

  mostrarFormulario: boolean = false; 
  searchText: string = '';

  tiposEstadoDisponibilidad: { valor: number; etiqueta: string }[] = [];
  tiposPrincipal: { valor: number; etiqueta: string }[] = [];

  page: number = 1;
  pageSize: number = 5;

  fuenteObj: Cfuente = new Cfuente();
  fuenteArray: Ifuente [] = []

  archivos: IextArchivo[] = [];

  constructor(
    private SoporteDocumentalSrv: SoporteDocumentalService,
    private DominiosSrv: DominiosService,
    private EstructuraSrv: EstructuraService,
  ){}

  ngOnInit(): void{
    this.getFuente();
    this.getTiposEstadoDisponibilidad()
    this.getFormaPresentacionCodigo()
    this.getArchivos()
  }
    
  getFuente(){
    this.SoporteDocumentalSrv.loadFuente().subscribe((res:any)=>{
      this.fuenteArray = res;
    })
  }

  getTiposEstadoDisponibilidad() {
    this.DominiosSrv.loadTiposEstadoDisponibilidad().subscribe(res => {
      this.tiposEstadoDisponibilidad = res.map(item => ({
        valor: item.id,
        etiqueta: item.tipo_display
      }));
    });
  }

  getFormaPresentacionCodigo() {
    this.DominiosSrv.loadFormaPresentacionCodigo().subscribe(res => {
      this.tiposPrincipal = res.map(item => ({
        valor: item.id,
        etiqueta: item.tipo_display
      }));
    });
  }

  getArchivos() {
    this.EstructuraSrv.loadArchivo().subscribe({
      next: (res: any) => {
        this.archivos = res;
      },
      error: (err) => {
        console.error('Error cargando archivos', err);
      }
    });
  }

  onSave(){
    this.mostrarFormulario = true;
    const fuenteToSave = {
          ...this.fuenteObj,
          fecha_documento_fuente: this.fuenteObj.fecha_documento_fuente ? formatDate(this.fuenteObj.fecha_documento_fuente, 'yyyy-MM-dd', 'en-US') : null,
    };
      this.SoporteDocumentalSrv.createFuente(fuenteToSave).subscribe((res:any)=>{
        if (res){
          alert('Fuente creada correctamente');
          this.mostrarFormulario = false;
          this.getFuente();
          this.fuenteObj = new Cfuente();
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
    const fuenteToSave = {
      ...this.fuenteObj,
      fecha_documento_fuente: this.fuenteObj.fecha_documento_fuente ? formatDate(this.fuenteObj.fecha_documento_fuente, 'yyyy-MM-dd', 'en-US') : null,
    };
    this.SoporteDocumentalSrv.updateFuente(this.fuenteObj.id, fuenteToSave).subscribe((res:any)=>{
      if (res){
        alert('Fuente actualizada correctamente');
        this.mostrarFormulario = false;
        this.getFuente();
        this.fuenteObj = new Cfuente();
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
      this.fuenteObj.id = id
      this.SoporteDocumentalSrv.deleteFuente(id).subscribe((res:any)=>{
        if (res) {
          alert('Fuente eliminada correctamente');
          this.getFuente();
        } else {
          alert(res.message)
        }
      })
    }
  }

  onEdit(data: any){
    this.mostrarFormulario = true;
    this.fuenteObj = Object.assign({}, data);
  }
            
  onCancel(){
    this.mostrarFormulario = false;
    this.fuenteObj = new Cfuente();
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
