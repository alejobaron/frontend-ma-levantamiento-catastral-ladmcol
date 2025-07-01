import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipe } from '../../../pipe/filter.pipe';
import { ClcFuenteAdministrativa, IlcFuenteAdministrativa } from '../../../model/soporteDocumental/lcFuenteAdministrativa';
import { SoporteDocumentalService } from '../../../services/soporte-documental.service';
import { RouterModule } from '@angular/router';
import { DominiosService } from '../../../services/dominios.service';

@Component({
  selector: 'app-lc-fuente-administrativa',
  imports: [FormsModule, CommonModule, NgxPaginationModule, FilterPipe, RouterModule],
  templateUrl: './lc-fuente-administrativa.component.html',
  styleUrl: './lc-fuente-administrativa.component.css'
})
export class LcFuenteAdministrativaComponent {

  mostrarFormulario: boolean = false;
  searchText: string = '';

  tiposfuenteadministrativalc: { valor: number; etiqueta: string }[] = [];

  page: number = 1; 
  pageSize: number = 5; 

  lcFuenteAdministrativaObj: ClcFuenteAdministrativa = new ClcFuenteAdministrativa();
  lcFuenteAdministrativaArray: IlcFuenteAdministrativa [] = []

  fuentesadministrativas: IlcFuenteAdministrativa[] = [];

  constructor(
    private SoporteDocumentalSrv: SoporteDocumentalService,
    private DominiosSrv: DominiosService
  ){}

  ngOnInit(): void{
    this.getlcFuenteAdministrativa()
    this.getColFuenteAdministrativa()
    this.getTipoFuenteAdministrativaLC();

  }
    
  getlcFuenteAdministrativa(){
    this.SoporteDocumentalSrv.loadLCFuenteAdministrativa().subscribe((res:any)=>{
      this.lcFuenteAdministrativaArray = res;
    })
  }

  getTipoFuenteAdministrativaLC() {
    this.DominiosSrv.loadTipoFuenteAdministrativaLC().subscribe(res => {
      this.tiposfuenteadministrativalc = res.map(item => ({
        valor: item.id,
        etiqueta: item.tipo_display
      }));
    });
  }

  getColFuenteAdministrativa() {
    this.SoporteDocumentalSrv.loadLCFuenteAdministrativa().subscribe({
      next: (res: any) => {
        this.fuentesadministrativas = res;
      },
      error: (err) => {
        console.error('Error cargando fuentes administrativas', err);
      }
    });
  }

  onSave(){
    this.mostrarFormulario = true;
      this.SoporteDocumentalSrv.createLCFuenteAdministrativa(this.lcFuenteAdministrativaObj).subscribe((res:any)=>{
        if (res){
          alert('Fuente administrativa LC creada correctamente');
          this.mostrarFormulario = false;
          this.getlcFuenteAdministrativa();
          this.lcFuenteAdministrativaObj = new ClcFuenteAdministrativa();
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
    this.SoporteDocumentalSrv.updateLCFuenteAdministrativa(this.lcFuenteAdministrativaObj.id, this.lcFuenteAdministrativaObj).subscribe((res:any)=>{
      if (res){
        alert('Fuente administrativa LC correctamente');
        this.mostrarFormulario = false;
        this.getlcFuenteAdministrativa();
        this.lcFuenteAdministrativaObj = new ClcFuenteAdministrativa();
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
      this.lcFuenteAdministrativaObj.id = id
      this.SoporteDocumentalSrv.deleteLCFuenteAdministrativa(id).subscribe((res:any)=>{
        if (res) {
          alert('Fuente administrativa LC eliminada correctamente');
          this.getlcFuenteAdministrativa();
        } else {
          alert(res.message)
        }
      })
    }
  }

  onEdit(data: any){
    this.mostrarFormulario = true;
    this.lcFuenteAdministrativaObj = Object.assign({}, data);
  }
            
  onCancel(){
    this.mostrarFormulario = false;
    this.lcFuenteAdministrativaObj = new ClcFuenteAdministrativa();
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
