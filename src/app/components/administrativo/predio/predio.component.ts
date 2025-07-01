import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipe } from '../../../pipe/filter.pipe';
import { Cpredio, Ipredio } from '../../../model/paqueteAdministrativo/predio';
import { AdministrativoService } from '../../../services/administrativo.service';
import { RouterModule } from '@angular/router';
import { IunidadAdministrativaBasica } from '../../../model/paqueteAdministrativo/unidadBasicaAdministrativa';
import { Idireccion } from '../../../model/estructura/extDireccion';
import { EstructuraService } from '../../../services/estructura.service';
import { DominiosService } from '../../../services/dominios.service';

@Component({
  selector: 'app-predio',
  imports: [FormsModule, CommonModule, NgxPaginationModule, FilterPipe, RouterModule],
  templateUrl: './predio.component.html',
  styleUrl: './predio.component.css'
})
export class PredioComponent {

  mostrarFormulario: boolean = false;
  searchText: string = '';

  tiposPredio: { valor: number; etiqueta: string }[] = [];
  tiposCondicionPredio: { valor: number; etiqueta: string }[] = [];
  tiposDestinacionEconomica: { valor: number; etiqueta: string }[] = [];

  page: number = 1; 
  pageSize: number = 5; 

  predioObj: Cpredio = new Cpredio();
  
  predioArray: Ipredio [] = []

  unidadesAdministrativas: IunidadAdministrativaBasica[] = [];
  direcciones: Idireccion[] = [];

  constructor(
    private AdministrativoSrv: AdministrativoService,
    private EstructuraSrv: EstructuraService,
    private DominiosSrv: DominiosService
  ){}

  ngOnInit(): void {
    this.getPredio();
    this.getUnidadesAdministrativas();
    this.getDirecciones();
    this.getTiposPredio();
    this.getTiposCondicionPredio();
    this.getTiposDestinacionEconomica()
  }

  getTiposPredio() {
    this.DominiosSrv.loadTiposPredio().subscribe(res => {
      this.tiposPredio = res.map(item => ({
        valor: item.id,
        etiqueta: item.tipo_display
      }));
    });
  }

  getTiposCondicionPredio() {
    this.DominiosSrv.loadTiposCondicionPredio().subscribe(res => {
      this.tiposCondicionPredio = res.map(item => ({
        valor: item.id,
        etiqueta: item.tipo_display
      }));
    });
  }

  getTiposDestinacionEconomica() {
    this.DominiosSrv.loadTiposDestinacionEconomica().subscribe(res => {
      this.tiposDestinacionEconomica = res.map(item => ({
        valor: item.id,
        etiqueta: item.tipo_display
      }));
    });
  }

  getPredio(){
    this.AdministrativoSrv.loadPredio().subscribe((res:any)=>{
      this.predioArray = res;
    })
  }

  getUnidadesAdministrativas() {
    this.AdministrativoSrv.loadUnidadAdministrativaBasica().subscribe({
      next: (res: any) => {
        this.unidadesAdministrativas = res;
      },
      error: (err) => {
        console.error('Error cargando unidades administrativas:', err);
      }
    });
  }

  getDirecciones() {
    this.EstructuraSrv.loadDireccion().subscribe({
      next: (res: any) => {
        this.direcciones = res;
      },
      error: (err) => {
        console.error('Error cargando direcciones:', err);
      }
    });
  }

  onSave(){
    this.mostrarFormulario = true;
      this.AdministrativoSrv.createPredio(this.predioObj).subscribe((res:any)=>{
        if (res){
          alert('Predio creado correctamente');
          this.mostrarFormulario = false;
          this.getPredio();
          this.predioObj = new Cpredio();
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
    this.AdministrativoSrv.updatePredio(this.predioObj.id, this.predioObj).subscribe((res:any)=>{
      if (res){
        alert('Predio actualizado correctamente');
        this.mostrarFormulario = false;
        this.getPredio();
        this.predioObj = new Cpredio();
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
      this.predioObj.id = id
      this.AdministrativoSrv.deletePredio(id).subscribe((res:any)=>{
        if (res) {
          alert('Predio eliminado correctamente');
          this.getPredio();
        } else {
          alert(res.message)
        }
      })
    }
  }

  onEdit(data: any){
    this.mostrarFormulario = true;
    this.predioObj = Object.assign({}, data);
  }
            
  onCancel(){
    this.mostrarFormulario = false;
    this.predioObj = new Cpredio();
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
