import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipe } from '../../../pipe/filter.pipe';
import { CcolFuenteAdministrativa, IcolFuenteAdministrativa } from '../../../model/soporteDocumental/colFuenteAdministrativa';
import { SoporteDocumentalService } from '../../../services/soporte-documental.service';
import { RouterModule } from '@angular/router';
import { Ifuente } from '../../../model/soporteDocumental/fuente';
import { DominiosService } from '../../../services/dominios.service';

@Component({
  selector: 'app-col-fuente-administrativa',
  imports: [FormsModule, CommonModule, NgxPaginationModule, FilterPipe, RouterModule],
  templateUrl: './col-fuente-administrativa.component.html',
  styleUrl: './col-fuente-administrativa.component.css'
})
export class ColFuenteAdministrativaComponent {

  mostrarFormulario: boolean = false;
  searchText: string = '';

  tiposfuenteadministrativa: { valor: number; etiqueta: string }[] = [];

  page: number = 1; 
  pageSize: number = 5; 

  colFuenteAdministrativaObj: CcolFuenteAdministrativa = new CcolFuenteAdministrativa();
  colFuenteAdministrativaArray: IcolFuenteAdministrativa [] = []

  fuentes: Ifuente[] = [];

  constructor(
    private SoporteDocumentalSrv: SoporteDocumentalService,
    private DominiosSrv: DominiosService,
  ){}

  ngOnInit():void{
    this.getColFuenteAdministrativa();
    this.getFuentes();
    this.getTipoFuenteAdministrativa()

  }
    
  getColFuenteAdministrativa(){
    this.SoporteDocumentalSrv.loadColFuenteAdministrativa().subscribe((res:any)=>{
      this.colFuenteAdministrativaArray = res;
    })
  }

  getTipoFuenteAdministrativa() {
    this.DominiosSrv.loadTipoFuenteAdministrativa().subscribe(res => {
      this.tiposfuenteadministrativa = res.map(item => ({
        valor: item.id,
        etiqueta: item.tipo_display
      }));
    });
  }

  getFuentes() {
    this.SoporteDocumentalSrv.loadFuente().subscribe({
      next: (res: any) => {
        this.fuentes = res;
      },
      error: (err) => {
        console.error('Error cargando fuentes', err);
      }
    });
  }

  onSave(){
    this.mostrarFormulario = true;
      this.SoporteDocumentalSrv.createColFuenteAdministrativa(this.colFuenteAdministrativaObj).subscribe((res:any)=>{
        if (res){
          alert('Fuente administrativa COL creada correctamente');
          this.mostrarFormulario = false;
          this.getColFuenteAdministrativa();
          this.colFuenteAdministrativaObj = new CcolFuenteAdministrativa();
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
    this.SoporteDocumentalSrv.updateColFuenteAdministrativa(this.colFuenteAdministrativaObj.id, this.colFuenteAdministrativaObj).subscribe((res:any)=>{
      if (res){
        alert('Fuente administrativa COL correctamente');
        this.mostrarFormulario = false;
        this.getColFuenteAdministrativa();
        this.colFuenteAdministrativaObj = new CcolFuenteAdministrativa();
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
      this.colFuenteAdministrativaObj.id = id
      this.SoporteDocumentalSrv.deleteColFuenteAdministrativa(id).subscribe((res:any)=>{
        if (res) {
          alert('Fuente administrativa COL eliminada correctamente');
          this.getColFuenteAdministrativa();
        } else {
          alert(res.message)
        }
      })
    }
  }

  onEdit(data: any){
    this.mostrarFormulario = true;
    this.colFuenteAdministrativaObj = Object.assign({}, data);
  }
            
  onCancel(){
    this.mostrarFormulario = false;
    this.colFuenteAdministrativaObj = new CcolFuenteAdministrativa();
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
