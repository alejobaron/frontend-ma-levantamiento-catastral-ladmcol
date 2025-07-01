import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipe } from '../../../pipe/filter.pipe';
import { CcrFuenteEspacial, IcrFuenteEspacial } from '../../../model/soporteDocumental/crFuenteEspacial';
import { SoporteDocumentalService } from '../../../services/soporte-documental.service';
import { RouterModule } from '@angular/router';
import { DominiosService } from '../../../services/dominios.service';
import { IcolFuenteEspacial } from '../../../model/soporteDocumental/colFuenteEspacial';

@Component({
  selector: 'app-cr-fuente-espacial',
  imports: [FormsModule, CommonModule, NgxPaginationModule, FilterPipe, RouterModule],
  templateUrl: './cr-fuente-espacial.component.html',
  styleUrl: './cr-fuente-espacial.component.css'
})
export class CrFuenteEspacialComponent {

  mostrarFormulario: boolean = false;
  searchText: string = '';

  tiposfuenteespacial: { valor: number; etiqueta: string }[] = [];

  page: number = 1; 
  pageSize: number = 5; 

  crFuenteEspacialObj: CcrFuenteEspacial = new CcrFuenteEspacial();
  crFuenteEspacialArray: IcrFuenteEspacial [] = []

  fuentesespaciales: IcolFuenteEspacial[] = [];

  constructor(
    private SoporteDocumentalSrv: SoporteDocumentalService,
    private DominiosSrv: DominiosService
  ){}

  ngOnInit(): void{
    this.getCRFuenteEspacial();
    this.getTipoFuenteEspacial();
    this.getColFuenteEspacial()
  }
    
  getCRFuenteEspacial(){
    this.SoporteDocumentalSrv.loadCRFuenteEspacial().subscribe((res:any)=>{
      this.crFuenteEspacialArray = res;
    })
  }

  getTipoFuenteEspacial() {
    this.DominiosSrv.loadTipoFuenteEspacial().subscribe(res => {
      this.tiposfuenteespacial = res.map(item => ({
        valor: item.id,
        etiqueta: item.tipo_display
      }));
    });
  }

  getColFuenteEspacial() {
    this.SoporteDocumentalSrv.loadColFuenteEspacial().subscribe({
      next: (res: any) => {
        this.fuentesespaciales = res;
      },
      error: (err) => {
        console.error('Error cargando fuentes espaciales', err);
      }
    });
  }

  onSave(){
    this.mostrarFormulario = true;
      this.SoporteDocumentalSrv.createCRFuenteEspacial(this.crFuenteEspacialObj).subscribe((res:any)=>{
        if (res){
          alert('Fuente espacial CR creada correctamente');
          this.mostrarFormulario = false;
          this.getCRFuenteEspacial();
          this.crFuenteEspacialObj = new CcrFuenteEspacial();
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
    this.SoporteDocumentalSrv.updateCRFuenteEspacial(this.crFuenteEspacialObj.id, this.crFuenteEspacialObj).subscribe((res:any)=>{
      if (res){
        alert('Fuente espacial CR correctamente');
        this.mostrarFormulario = false;
        this.getCRFuenteEspacial();
        this.crFuenteEspacialObj = new CcrFuenteEspacial();
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
      this.crFuenteEspacialObj.id = id
      this.SoporteDocumentalSrv.deleteCRFuenteEspacial(id).subscribe((res:any)=>{
        if (res) {
          alert('Fuente espacial CR eliminada correctamente');
          this.getCRFuenteEspacial();
        } else {
          alert(res.message)
        }
      })
    }
  }

  onEdit(data: any){
    this.mostrarFormulario = true;
    this.crFuenteEspacialObj = Object.assign({}, data);
  }
            
  onCancel(){
    this.mostrarFormulario = false;
    this.crFuenteEspacialObj= new CcrFuenteEspacial();
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
