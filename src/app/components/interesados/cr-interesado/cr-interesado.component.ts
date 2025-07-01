import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipe } from '../../../pipe/filter.pipe';
import { CinteresadoCR, IinteresadoCR } from '../../../model/paqueteInteresados/interesadoCr';
import { InteresadoService } from '../../../services/interesado.service';
import { RouterModule } from '@angular/router';
import { DominiosService } from '../../../services/dominios.service';
import { IinteresadoCOL } from '../../../model/paqueteInteresados/interesadoCol';
import { IinteresadoExt } from '../../../model/estructura/extInteresado';
import { EstructuraService } from '../../../services/estructura.service';

@Component({
  selector: 'app-cr-interesado',
  imports: [FormsModule, CommonModule, NgxPaginationModule, FilterPipe, RouterModule],
  templateUrl: './cr-interesado.component.html',
  styleUrl: './cr-interesado.component.css'
})
export class CrInteresadoComponent {

  mostrarFormulario: boolean = false;
  searchText: string = '';

  tiposInteresado: { valor: number; etiqueta: string }[] = [];
  tiposDocumento: { valor: number; etiqueta: string }[] = [];
  tiposSexo: { valor: number; etiqueta: string }[] = [];
  tiposGrupoEtnico: { valor: number; etiqueta: string }[] = [];

  page: number = 1; 
  pageSize: number = 5; 

  crInteresadoObj: CinteresadoCR = new CinteresadoCR();
  crInteresadoArray: IinteresadoCR [] = []

  interesados: IinteresadoExt[] = [];

  constructor(
    private InteresadoSrv: InteresadoService,
    private DominiosSrv: DominiosService,
  ){}
  
  ngOnInit(): void {
    this.getCrInteresado();
    this.getTiposInteresado();
    this.getTiposDocumento();
    this.getTiposSexo();
    this.getTiposGrupoEtnico();
    this.getInteresados()
  }

  getCrInteresado(){
    this.InteresadoSrv.loadCrInteresado().subscribe((res:any)=>{
      this.crInteresadoArray = res;
    })
  }
  
  getTiposInteresado() {
    this.DominiosSrv.loadTiposInteresado().subscribe(res => {
      this.tiposInteresado = res.map(item => ({
        valor: item.id,
        etiqueta: item.tipo_display
      }));
    });
  }

  getTiposDocumento() {
    this.DominiosSrv.loadTiposDocumento().subscribe(res => {
      this.tiposDocumento = res.map(item => ({
        valor: item.id,
        etiqueta: item.tipo_display
      }));
    });
  }

  getTiposSexo() {
    this.DominiosSrv.loadTiposSexo().subscribe(res => {
      this.tiposSexo = res.map(item => ({
        valor: item.id,
        etiqueta: item.tipo_display
      }));
    });
  }

  getTiposGrupoEtnico() {
    this.DominiosSrv.loadTiposGrupoEtnico().subscribe(res => {
      this.tiposGrupoEtnico = res.map(item => ({
        valor: item.id,
        etiqueta: item.tipo_display
      }));
    });
  }

  getInteresados() {
    this.InteresadoSrv.loadColInteresado().subscribe({
      next: (res: any) => {
        this.interesados = res;
      },
      error: (err) => {
        console.error('Error cargando interesados', err);
      }
    });
  }

  onSaveCrInteresado(){
    this.mostrarFormulario = true;
    this.InteresadoSrv.createNewInteresadoCR(this.crInteresadoObj).subscribe((res:any)=>{
      if (res){
        alert('Interesado CR creado correctamente');
        this.mostrarFormulario = false;
        this.getCrInteresado();
        this.crInteresadoObj = new CinteresadoCR();
      } else{
        alert(res.message)
      }
    },
  (error: any) => {
    const errorMessage = this.extractErrorMessage(error);
    alert(errorMessage);
  })
  }

  onUpdateCrInteresdo(){
    this.InteresadoSrv.updateInteresadoCR(this.crInteresadoObj.id, this.crInteresadoObj).subscribe((res:any)=>{
      if (res) {
        alert('Interesado COL actualizado correctamente');
        this.mostrarFormulario = false;
        this.getCrInteresado();
        this.crInteresadoObj = new CinteresadoCR();
      } else {
        alert(res.message)
      }
    },
    (error: any) => {
      const errorMessage = this.extractErrorMessage(error);
      alert(errorMessage);  
    })
  }

  onDelete(id:number){
    const isDelete = confirm("¿Esta seguro que desea eliminar este registro?");
    if(isDelete == true){
      this.crInteresadoObj.id = id
      this.InteresadoSrv.deleteInteresadoCOL(id).subscribe((res:any)=>{
      if (res) {
        alert('Interesado COL eliminado correctamente');
        this.getCrInteresado();
      } else {
        alert(res.message)
      }
    })
    }    
  }

  onEdit(data: any){
    this.mostrarFormulario = true;
    this.crInteresadoObj = Object.assign({}, data);
  }
  
  onCancel(){
    this.mostrarFormulario = false;
    this.crInteresadoObj = new CinteresadoCR();
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
