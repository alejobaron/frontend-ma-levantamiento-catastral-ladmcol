import { CommonModule } from '@angular/common';
import { Component, Inject, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipe } from '../../../pipe/filter.pipe';
import { CunidadConstruccion, IunidadConstruccion } from '../../../model/paqueteUnidadEspacial/unidadConstruccion';
import { UnidadEspacialService } from '../../../services/unidad-espacial.service';
import { GeoJSON, WKT } from 'ol/format';
import { Geometry } from 'ol/geom';
import { Feature } from 'ol';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { GeometriaComponent } from '../../estructuras/geometria/geometria.component';
import { RouterModule } from '@angular/router';
import { IcaracteristicasUnidadConstruccion } from '../../../model/paqueteUnidadEspacial/caracteristicasUnidadConstruccion';
import { IunidadEspacial } from '../../../model/paqueteUnidadEspacial/unidadEspacial';
import { DominiosService } from '../../../services/dominios.service';

import proj4 from 'proj4';
import {register} from 'ol/proj/proj4';
import {get as getProjection} from 'ol/proj'

proj4.defs('EPSG:9377', '+proj=tmerc +lat_0=4.596200416666666 +lon_0=-73.0 +k=0.9992 +x_0=1000000 +y_0=1000000 +ellps=GRS80 +units=m +no_defs');
register(proj4);

export interface DialogMapaData {
  wkt: string;
  modo: 'visualizar' | 'editar';

}

@Component({
  selector: 'app-unidad-construccion',
  imports: [FormsModule, CommonModule, NgxPaginationModule, FilterPipe, RouterModule],
  templateUrl: './unidad-construccion.component.html',
  styleUrl: './unidad-construccion.component.css'
})
export class UnidadConstruccionComponent {
  
  mostrarFormulario: boolean = false;
  searchText: string = '';

  page: number = 1; 
  pageSize: number = 5; 

  tiposconstruccionplanta: { valor: number; etiqueta: string }[] = [];  

  unidadConstruccionObj: CunidadConstruccion = new CunidadConstruccion();
  unidadConstruccionArray: IunidadConstruccion [] = []

  unidadesespaciales: IunidadEspacial[] = [];
  caracteristicasunidadconstruccion: IcaracteristicasUnidadConstruccion[] = [];

  constructor(
    private UnidadEspacialSrv: UnidadEspacialService,
    private DominiosSrv: DominiosService
  ){}

  ngOnInit():void{
    this.getUnidadConstruccion();
    this.getUnidadEspacial();
    this.getCaracteristicaUnidadConstruccion();
    this.getTipoConstruccionPlanta()
  }
    
  getUnidadConstruccion(){
    this.UnidadEspacialSrv.loadUnidadConstruccion().subscribe((res:any)=>{
      this.unidadConstruccionArray = res;
    })
  }

  getTipoConstruccionPlanta() {
      this.DominiosSrv.loadTipoConstruccionPlanta().subscribe(res => {
        this.tiposconstruccionplanta = res.map(item => ({
          valor: item.id,
          etiqueta: item.tipo_display
        }));
      });
    }

  getUnidadEspacial() {
    this.UnidadEspacialSrv.loadUnidadEspacial().subscribe({
      next: (res: any) => {
        this.unidadesespaciales = res;
      },
      error: (err) => {
        console.error('Error cargando unidades espaciales', err);
      }
    });
  }

  getCaracteristicaUnidadConstruccion() {
    this.UnidadEspacialSrv.loadCaracteristicasUnidadConstruccion().subscribe({
      next: (res: any) => {
        this.caracteristicasunidadconstruccion = res;
      },
      error: (err) => {
        console.error('Error cargando caracteristicas unidad construcción', err);
      }
    });
  }

  onSave(){
    this.mostrarFormulario = true;
      this.UnidadEspacialSrv.createUnidadConstruccion(this.unidadConstruccionObj).subscribe((res:any)=>{
        if (res){
          alert('Unidad de construcción creada correctamente');
          this.mostrarFormulario = false;
          this.getUnidadConstruccion();
          this.unidadConstruccionObj = new CunidadConstruccion();
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
    this.UnidadEspacialSrv.updateUnidadConstruccion(this.unidadConstruccionObj.id, this.unidadConstruccionObj).subscribe((res:any)=>{
      if (res){
        alert('Unidad de construcción actualizada correctamente');
        this.mostrarFormulario = false;
        this.getUnidadConstruccion();
        this.unidadConstruccionObj = new CunidadConstruccion();
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
      this.unidadConstruccionObj.id = id
      this.UnidadEspacialSrv.deleteUnidadConstruccion(id).subscribe((res:any)=>{
        if (res) {
          alert('Unidad de construcción eliminada correctamente');
          this.getUnidadConstruccion();
        } else {
          alert(res.message)
        }
      })
    }
  }

  onEdit(data: any){
    this.mostrarFormulario = true;
    this.unidadConstruccionObj = Object.assign({}, data);
    this.unidadConstruccionObj.unidad_construccion_geometria = data.geometria;
  }
            
  onCancel(){
    this.mostrarFormulario = false;
    this.unidadConstruccionObj = new CunidadConstruccion();
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

  openDialogFromRow(item: any): void {
    const geojsonFormat = new GeoJSON();
    const wktFormat = new WKT();

  const feature = geojsonFormat.readFeature(
    {
      type: 'Feature',
      geometry: item.geometria,
      properties: {}
    },
    {
      dataProjection: 'EPSG:9377',
      featureProjection: 'EPSG:9377'
    }
  ) as Feature<Geometry>;

  const wkt = wktFormat.writeFeature(feature, {
    featureProjection: 'EPSG:9377',
    dataProjection: 'EPSG:9377'
  });

  const wktConSRID = `SRID=9377;${wkt}`;
  const dialogRef = this.dialog.open(DialogMapa, {
    width: '1000px',
    height: '500px',
    maxWidth: '90vw',
    maxHeight: '90vh',
    data: { wkt: wktConSRID, modo: 'visualizar' }
  });
  }

  readonly dialog = inject(MatDialog);

  openDialog(): void {
    const geojsonFormat = new GeoJSON();
    const wktFormat = new WKT();

    const geojsonObject = {
      type: 'Feature',
      geometry: this.unidadConstruccionObj.unidad_construccion_geometria,
      properties: {}
    };

    const feature = geojsonFormat.readFeature(geojsonObject, {
      featureProjection: 'EPSG:9377'
    }) as Feature<Geometry>;

    const wkt = wktFormat.writeFeature(feature, {
      featureProjection: 'EPSG:9377',
      dataProjection: 'EPSG:9377'
    });

    const wktConSRID = `SRID=9377;${wkt}`;
    const dialogRef = this.dialog.open(DialogMapa, {
      width: '1000px',
      height: '500px',
      maxWidth: '90vw',
      maxHeight: '90vh',
      data: { wkt: wktConSRID, modo: 'editar' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("Geometría recibida del diálogo:", result);
        this.unidadConstruccionObj.unidad_construccion_geometria = result; 
      }
    });
  }

  recibir(wkt:any){
    console.log("Geometría recibida:", wkt);
  }
}

@Component({
  selector: 'dialog-mapa',
  templateUrl: 'dialog-mapa.html',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogContent,
    MatDialogActions,
    GeometriaComponent
  ],
})
export class DialogMapa {
  geometria: string = ''; 
  modo: 'visualizar' | 'editar' = 'editar';

  constructor(
    public dialogRef: MatDialogRef<DialogMapa>,
    @Inject(MAT_DIALOG_DATA) public data: DialogMapaData,
  ){
    this.geometria = data.wkt;
    this.modo = data.modo;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  actualizarGeometria(wkt: string) {
    console.log("Recibiendo geometría del mapa:", wkt);
    this.data.wkt = wkt;
    this.geometria = wkt;
  }

  aceptar(): void {
    console.log("Enviando geometría al formulario:", this.geometria);
    this.dialogRef.close(this.geometria);
  } 

  cancelar(): void {
    this.dialogRef.close();
  }

  @ViewChild(GeometriaComponent)
  geometriaComp!: GeometriaComponent;

  guardarCambios() {
    const feature = this.geometriaComp.editandoFeature;
    if (feature) {
      const format = new WKT();
      const wkt = format.writeFeature(feature, {
        featureProjection: 'EPSG:9377',
        dataProjection: 'EPSG:9377',
      });
      const wktConSRID = `SRID=9377;${wkt}`;
      console.log("Guardando cambios desde dialog:", wktConSRID);
      this.geometria = wktConSRID;
    } else {
      console.warn('No hay geometría para guardar.');
    }
  }
}

