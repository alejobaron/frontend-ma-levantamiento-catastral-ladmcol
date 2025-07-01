import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { CunidadAdministrativaBasica, IunidadAdministrativaBasica } from '../../../model/paqueteAdministrativo/unidadBasicaAdministrativa';
import { AdministrativoService } from '../../../services/administrativo.service';
import { FilterPipe } from '../../../pipe/filter.pipe';
import { DominiosService } from '../../../services/dominios.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-unidad-administrativa-basica',
  imports: [FormsModule, CommonModule, NgxPaginationModule, FilterPipe, RouterModule],
  templateUrl: './unidad-administrativa-basica.component.html',
  styleUrl: './unidad-administrativa-basica.component.css'
})
export class UnidadAdministrativaBasicaComponent {

  mostrarFormulario: boolean = false;
  searchText: string = '';

  tiposUAB: { valor: number; etiqueta: string }[] = [];

  page: number = 1; 
  pageSize: number = 5; 

  unidadAdministrativaBasicaObj: CunidadAdministrativaBasica = new CunidadAdministrativaBasica();
  unidadAdministrativaBasicaArray: IunidadAdministrativaBasica [] = []

  constructor(
    private AdministrativoSrv: AdministrativoService,
    private DominiosSrv: DominiosService
  ){}

  ngOnInit(): void {
    this.getUnidadAdministrativaBasica();
    this.getTiposUAB();
  }

  getTiposUAB() {
    this.DominiosSrv.loadTiposUAB().subscribe(res => {
      this.tiposUAB = res.map(item => ({
        valor: item.id,
        etiqueta: item.tipo_display
      }));
    });
  }

  getUnidadAdministrativaBasica(){
    this.AdministrativoSrv.loadUnidadAdministrativaBasica().subscribe((res:any)=>{
      this.unidadAdministrativaBasicaArray = res;
    })
  }

  onSave(){
    this.mostrarFormulario = true;
      this.AdministrativoSrv.createUnidadAdministrativaBasica(this.unidadAdministrativaBasicaObj).subscribe((res:any)=>{
        if (res){
          alert('Unidad administrativa básica creada correctamente');
          this.mostrarFormulario = false;
          this.getUnidadAdministrativaBasica();
          this.unidadAdministrativaBasicaObj = new CunidadAdministrativaBasica();
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
    this.AdministrativoSrv.updateUnidadAdministrativaBasica(this.unidadAdministrativaBasicaObj.id, this.unidadAdministrativaBasicaObj).subscribe((res:any)=>{
      if (res){
        alert('Unidad administrativa básica actualizada correctamente');
        this.mostrarFormulario = false;
        this.getUnidadAdministrativaBasica();
        this.unidadAdministrativaBasicaObj = new CunidadAdministrativaBasica();
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
      this.unidadAdministrativaBasicaObj.id = id
      this.AdministrativoSrv.deleteUnidadAdministrativaBasica(id).subscribe((res:any)=>{
        if (res) {
          alert('Unidad administrativa básica eliminadA correctamente');
          this.getUnidadAdministrativaBasica();
        } else {
          alert(res.message)
        }
      })
    }
  }

  onEdit(data: any){
    this.mostrarFormulario = true;
    this.unidadAdministrativaBasicaObj = Object.assign({}, data);
  }
            
  onCancel(){
    this.mostrarFormulario = false;
    this.unidadAdministrativaBasicaObj = new CunidadAdministrativaBasica();
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
