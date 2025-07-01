import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipe } from '../../../pipe/filter.pipe';
import { CcolAgrupacionInteresados, IcolAgrupacionInteresados } from '../../../model/paqueteInteresados/agrupacionInteresadosCOL';
import { InteresadoService } from '../../../services/interesado.service';
import { RouterModule } from '@angular/router';
import { DominiosService } from '../../../services/dominios.service';
import { IinteresadoCOL } from '../../../model/paqueteInteresados/interesadoCol';

@Component({
  selector: 'app-col-agrupacion-interesados',
  imports: [FormsModule, CommonModule, NgxPaginationModule, FilterPipe, RouterModule],
  templateUrl: './col-agrupacion-interesados.component.html',
  styleUrl: './col-agrupacion-interesados.component.css'
})
export class ColAgrupacionInteresadosComponent {

  mostrarFormulario: boolean = false;
  searchText: string = '';

  tiposGrupoInteresado: { valor: number; etiqueta: string }[] = [];

  page: number = 1; 
  pageSize: number = 5; 

  colAgrupacionInteresadosObj: CcolAgrupacionInteresados = new CcolAgrupacionInteresados();
  colAgrupacionInteresadosArray: IcolAgrupacionInteresados [] = []

  interesados: IinteresadoCOL[] = [];

  constructor(
    private InteresadoSrv: InteresadoService,
    private DominiosSrv: DominiosService
  ){}

  ngOnInit(): void {
    this.getColAgrupacionInteresados();
    this.getTiposGrupoInteresado();
    this.getInteresadosCOL()
  }
    
  getColAgrupacionInteresados(){
    this.InteresadoSrv.loadColAgrupacionInteresados().subscribe((res:any)=>{
      this.colAgrupacionInteresadosArray = res;
    })
  }

  getTiposGrupoInteresado() {
    this.DominiosSrv.loadTiposGrupoInteresado().subscribe(res => {
      this.tiposGrupoInteresado = res.map(item => ({
        valor: item.id,
        etiqueta: item.tipo_display
      }));
    });
  }

  getInteresadosCOL() {
    this.InteresadoSrv.loadColInteresado().subscribe({
      next: (res: any) => {
        this.interesados = res;
      },
      error: (err) => {
        console.error('Error cargando interesados', err);
      }
    });
  }

  onSave(){
    this.mostrarFormulario = true;
      this.InteresadoSrv.createColAgrupacionInteresados(this.colAgrupacionInteresadosObj).subscribe((res:any)=>{
        if (res){
          alert('Agrupación de interesado COL creada correctamente');
          this.mostrarFormulario = false;
          this.getColAgrupacionInteresados();
          this.colAgrupacionInteresadosObj = new CcolAgrupacionInteresados();
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
    this.InteresadoSrv.updateColAgrupacionInteresados(this.colAgrupacionInteresadosObj.id, this.colAgrupacionInteresadosObj).subscribe((res:any)=>{
      if (res){
        alert('Agrupación de interesado COL actualizada correctamente');
        this.mostrarFormulario = false;
        this.getColAgrupacionInteresados();
        this.colAgrupacionInteresadosObj = new CcolAgrupacionInteresados();
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
      this.colAgrupacionInteresadosObj.id = id
      this.InteresadoSrv.deleteColAgrupacionInteresados(id).subscribe((res:any)=>{
        if (res) {
          alert('Agrupación de interesado COL eliminada correctamente');
          this.getColAgrupacionInteresados();
        } else {
          alert(res.message)
        }
      })
    }
  }

  onEdit(data: any){
    this.mostrarFormulario = true;
    this.colAgrupacionInteresadosObj = Object.assign({}, data);
  }
            
  onCancel(){
    this.mostrarFormulario = false;
    this.colAgrupacionInteresadosObj = new CcolAgrupacionInteresados();
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
