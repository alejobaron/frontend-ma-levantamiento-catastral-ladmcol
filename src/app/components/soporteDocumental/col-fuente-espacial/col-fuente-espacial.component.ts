import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipe } from '../../../pipe/filter.pipe';
import { CcolFuenteEspacial, IcolFuenteEspacial } from '../../../model/soporteDocumental/colFuenteEspacial';
import { SoporteDocumentalService } from '../../../services/soporte-documental.service';
import { RouterModule } from '@angular/router';
import { DominiosService } from '../../../services/dominios.service';
import { Ifuente } from '../../../model/soporteDocumental/fuente';

@Component({
  selector: 'app-col-fuente-espacial',
  imports: [FormsModule, CommonModule, NgxPaginationModule, FilterPipe, RouterModule],
  templateUrl: './col-fuente-espacial.component.html',
  styleUrl: './col-fuente-espacial.component.css'
})
export class ColFuenteEspacialComponent {

  mostrarFormulario: boolean = false;
  searchText: string = '';

  tiposfuenteespacial: { valor: number; etiqueta: string }[] = [];

  page: number = 1;
  pageSize: number = 5; 

  colFuenteEspacialObj: CcolFuenteEspacial = new CcolFuenteEspacial();
  colFuenteEspacialArray: IcolFuenteEspacial [] = []

   fuentes: Ifuente[] = [];

  constructor(
    private SoporteDocumentalSrv: SoporteDocumentalService,
    private DominiosSrv: DominiosService
  ){}

  ngOnInit(): void{
    this.getColFuenteEspacial();
    this.getFuentes();
    this.getTipoFuenteEspacial()

  }
    
  getColFuenteEspacial(){
    this.SoporteDocumentalSrv.loadColFuenteEspacial().subscribe((res:any)=>{
      this.colFuenteEspacialArray = res;
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
      this.SoporteDocumentalSrv.createColFuenteEspacial(this.colFuenteEspacialObj).subscribe((res:any)=>{
        if (res){
          alert('Fuente espacial COL creada correctamente');
          this.mostrarFormulario = false;
          this.getColFuenteEspacial();
          this.colFuenteEspacialObj = new CcolFuenteEspacial();
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
    this.SoporteDocumentalSrv.updateColFuenteEspacial(this.colFuenteEspacialObj.id, this.colFuenteEspacialObj).subscribe((res:any)=>{
      if (res){
        alert('Fuente espacial COL correctamente');
        this.mostrarFormulario = false;
        this.getColFuenteEspacial();
        this.colFuenteEspacialObj = new CcolFuenteEspacial();
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
      this.colFuenteEspacialObj.id = id
      this.SoporteDocumentalSrv.deleteColFuenteEspacial(id).subscribe((res:any)=>{
        if (res) {
          alert('Fuente espacial COL eliminada correctamente');
          this.getColFuenteEspacial();
        } else {
          alert(res.message)
        }
      })
    }
  }

  onEdit(data: any){
    this.mostrarFormulario = true;
    this.colFuenteEspacialObj = Object.assign({}, data);
  }
            
  onCancel(){
    this.mostrarFormulario = false;
    this.colFuenteEspacialObj = new CcolFuenteEspacial();
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
