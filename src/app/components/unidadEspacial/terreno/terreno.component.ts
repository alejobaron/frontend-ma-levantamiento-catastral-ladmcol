import { CommonModule } from '@angular/common';
import { Component, Inject, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipe } from '../../../pipe/filter.pipe';
import { Cterreno, Iterreno } from '../../../model/paqueteUnidadEspacial/terreno';
import { UnidadEspacialService } from '../../../services/unidad-espacial.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { GeometriaComponent } from '../../estructuras/geometria/geometria.component';
import { GeoJSON, WKT } from 'ol/format';
import { Geometry } from 'ol/geom';
import { Feature } from 'ol';
import { RouterModule } from '@angular/router';
import { IunidadEspacial } from '../../../model/paqueteUnidadEspacial/unidadEspacial';
import { EstructuraService } from '../../../services/estructura.service';

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
  selector: 'app-terreno',
  imports: [FormsModule, CommonModule, NgxPaginationModule, FilterPipe, RouterModule],
  templateUrl: './terreno.component.html',
  styleUrl: './terreno.component.css'
})
export class TerrenoComponent {

  mostrarFormulario: boolean = false;
  searchText: string= '';

  page: number = 1;
  pageSize: number = 5;

  terrenoObj: Cterreno = new Cterreno();
  terrenoArray: Iterreno [] = []

  unidadesespaciales: IunidadEspacial[] = [];

  constructor(
    private UnidadEspacialSrv: UnidadEspacialService
  ){}

  ngOnInit():void{
    this.getTerreno();
    this.getUnidadEspacial()
  }
  
  getTerreno(){
    this.UnidadEspacialSrv.loadTerreno().subscribe((res:any)=>{
      this.terrenoArray = res;
    })
  }

  getUnidadEspacial() {
    this.UnidadEspacialSrv.loadUnidadEspacial().subscribe({
      next: (res: any) => {
        this.unidadesespaciales = res;
      },
      error: (err) => {
        console.error('Error cargando areas', err);
      }
    });
  }
  
  onSave(){
    this.mostrarFormulario = true;
    this.UnidadEspacialSrv.createTerreno(this.terrenoObj).subscribe((res:any)=>{
      if (res) {
        alert('Terreno creado correctamente');
        this.mostrarFormulario = false;
        this.getTerreno();
        this.terrenoObj = new Cterreno();
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
    this.UnidadEspacialSrv.updateTerreno(this.terrenoObj.id, this.terrenoObj).subscribe((res:any)=>{
      if (res){
        alert('Terreno actualizado correctamente');
        this.mostrarFormulario = false;
        this.getTerreno();
        this.terrenoObj = new Cterreno();
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
      this.terrenoObj.id = id
      this.UnidadEspacialSrv.deleteTerreno(id).subscribe((res:any)=>{
        if (res){
          alert('Terreno eliminada correctamente');
          this.getTerreno();
        } else {
          alert(res.message)
        }
      })
    }
  }

  onEdit(data: any){
    this.mostrarFormulario = true;
    this.terrenoObj = Object.assign({}, data);
    this.terrenoObj.terreno_geometria = data.geometria;
    console.log("Editando terreno:", this.terrenoObj);
  }

  onCancel(){
    this.mostrarFormulario = false;
    this.terrenoObj = new Cterreno();
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

  const geojsonObject = {
    type: 'Feature',
    geometry: item.geometria,
    properties: {}
  };

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
        geometry: this.terrenoObj.terreno_geometria,
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
          this.terrenoObj.terreno_geometria = result;
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
