import { ChangeDetectionStrategy, Component, Inject, inject, model, signal, ViewChild } from '@angular/core';
import { CunidadEspacial, IunidadEspacial } from '../../../model/paqueteUnidadEspacial/unidadEspacial';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipe } from '../../../pipe/filter.pipe';
import { UnidadEspacialService } from '../../../services/unidad-espacial.service';
import { GeoJSON, WKT } from 'ol/format';
import { RouterModule } from '@angular/router';

import {MatButtonModule} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { GeometriaComponent } from '../../estructuras/geometria/geometria.component';
import { Geometry } from 'ol/geom';
import { Feature } from 'ol';
import { DominiosService } from '../../../services/dominios.service';
import { IareaValor } from '../../../model/estructura/areaValor';
import { Idireccion } from '../../../model/estructura/extDireccion';
import { IvolumenValor } from '../../../model/estructura/volumenValor';
import { EstructuraService } from '../../../services/estructura.service';

export interface DialogMapaData {
  wkt: string;
  modo: 'visualizar' | 'editar';

}


@Component({
  selector: 'app-col-unidad-espacial',
  imports: [FormsModule, CommonModule, NgxPaginationModule, FilterPipe, RouterModule],
  templateUrl: './col-unidad-espacial.component.html',
  styleUrl: './col-unidad-espacial.component.css'
})
export class ColUnidadEspacialComponent {
  
  mostrarFormulario: boolean = false;
  searchText: string= '';

  tiposdimension: { valor: number; etiqueta: string }[] = [];
  tiposrelacionsuperficie: { valor: number; etiqueta: string }[] = [];
  
  page: number = 1; 
  pageSize: number = 20; 

  unidadEspacialObj: CunidadEspacial = new CunidadEspacial();
  unidadEspacialArray: IunidadEspacial [] = []

  areas: IareaValor[] = [];
  direcciones: Idireccion[] = [];
  volumenes: IvolumenValor[] = [];

  constructor(
    private UnidadEspacialSrv: UnidadEspacialService,
    private DominiosSrv: DominiosService,
    private EstructuraSrv: EstructuraService,
  ){}

  ngOnInit():void{
    this.getUnidadEspacial();
    this.getTipoDimension();
    this.getTipoRelacionSuperficie();
    this.getArea();
    this.getDireccion();
    this.getVolumen()
  }
  
  getUnidadEspacial(){
    this.UnidadEspacialSrv.loadUnidadEspacial().subscribe((res:any)=>{
      this.unidadEspacialArray = res;
    })
  }

  getTipoDimension() {
    this.DominiosSrv.loadTipoDimension().subscribe(res => {
      this.tiposdimension = res.map(item => ({
        valor: item.id,
        etiqueta: item.tipo_display
      }));
    });
  }

  getTipoRelacionSuperficie() {
    this.DominiosSrv.loadTipoRelacionSuperficie().subscribe(res => {
      this.tiposrelacionsuperficie = res.map(item => ({
        valor: item.id,
        etiqueta: item.tipo_display
      }));
    });
  }

  getArea() {
    this.EstructuraSrv.loadAreaValor().subscribe({
      next: (res: any) => {
        this.areas = res;
      },
      error: (err) => {
        console.error('Error cargando areas', err);
      }
    });
  }

  getDireccion() {
    this.EstructuraSrv.loadDireccion().subscribe({
      next: (res: any) => {
        this.direcciones = res;
      },
      error: (err) => {
        console.error('Error cargando direcciones', err);
      }
    });
  }

  getVolumen() {
    this.EstructuraSrv.loadVolumenValor().subscribe({
      next: (res: any) => {
        this.volumenes = res;
      },
      error: (err) => {
        console.error('Error cargando volumenes', err);
      }
    });
  }

  onSaveUnidadEspacial(){
    this.mostrarFormulario = true;
    this.UnidadEspacialSrv.createUnidadEspacial(this.unidadEspacialObj).subscribe((res:any)=>{
      if (res) {
        alert('Unidad Espacial creada correctamente');
        this,this.mostrarFormulario = false;
        this.getUnidadEspacial();
        this.unidadEspacialObj = new CunidadEspacial();
      } else{
        alert(res.message)
      }
    },
    (error: any) => {
      const errorMessage = this.extractErrorMessage(error);
      alert(errorMessage);
    })
  }

  onUpdate(){
    this.UnidadEspacialSrv.updateUnidadEspacial(this.unidadEspacialObj.id, this.unidadEspacialObj).subscribe((res:any)=>{
      if (res){
        alert('Unidad Espacial actualizado correctamente');
        this.mostrarFormulario = false;
        this.getUnidadEspacial();
        this.unidadEspacialObj = new CunidadEspacial();
      } else {
        alert(res.message)
      }
    },
    (error: any)=> {
      const errorMessage = this.extractErrorMessage(error);
      alert(errorMessage);
    })
  }
  
  onDelete(id:number){
    const isDelete = confirm("¿Esta seguro que desea eliminar este registro?");
    if(isDelete == true){
      this.unidadEspacialObj.id = id
      this.UnidadEspacialSrv.deleteUnidadEspacial(id).subscribe((res:any)=>{
        if (res){
          alert('Unidad Espacial eliminada correctamente');
          this.getUnidadEspacial();
        } else {
          alert(res.message)
        }
      })
    }
  }

  onEdit(data: any){
    this.mostrarFormulario = true;
    this.unidadEspacialObj = Object.assign({}, data);
    console.log("Editando unidad:", this.unidadEspacialObj);
  }

  onCancel(){
    this.mostrarFormulario = false;
    this.unidadEspacialObj = new CunidadEspacial();
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