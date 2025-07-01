import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipe } from '../../../pipe/filter.pipe';
import { CpredioCopropiedad, IpredioCopropiedad } from '../../../model/paqueteAdministrativo/predioCopropiedad';
import { AdministrativoService } from '../../../services/administrativo.service';
import { RouterModule } from '@angular/router';
import { Ipredio } from '../../../model/paqueteAdministrativo/predio';

@Component({
  selector: 'app-predio-copropiedad',
  imports: [FormsModule, CommonModule, NgxPaginationModule, FilterPipe, RouterModule],
  templateUrl: './predio-copropiedad.component.html',
  styleUrl: './predio-copropiedad.component.css'
})
export class PredioCopropiedadComponent {

  mostrarFormulario: boolean = false;
  searchText: string = '';

  page: number = 1;
  pageSize: number = 5;

  predioCopropiedadObj: CpredioCopropiedad = new CpredioCopropiedad();
  predioCopropiedadArray: IpredioCopropiedad [] = []
  predios: Ipredio[] = [];

  constructor(
    private AdministrativoSrv: AdministrativoService
  ){}

  ngOnInit(): void{
    this.getPredioCopropiedad();
    this.getPredios()
  }
    
  getPredioCopropiedad(){
    this.AdministrativoSrv.loadPredioCopropiedad().subscribe((res:any)=>{
      this.predioCopropiedadArray = res;
    })
  }

  getPredios() {
    this.AdministrativoSrv.loadPredio().subscribe({
      next: (res: any) => {
        this.predios = res;
      },
      error: (err) => {
        console.error('Error cargando predios', err);
      }
    });
  }

  onSave(){
    this.mostrarFormulario = true;
      this.AdministrativoSrv.createPredioCopropiedad(this.predioCopropiedadObj).subscribe((res:any)=>{
        if (res){
          alert('Predio copropiedad creado correctamente');
          this.mostrarFormulario = false;
          this.getPredioCopropiedad();
          this.predioCopropiedadObj = new CpredioCopropiedad();
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
    this.AdministrativoSrv.updatePredioCopropiedad(this.predioCopropiedadObj.id, this.predioCopropiedadObj).subscribe((res:any)=>{
      if (res){
        alert('Predio copropiedad actualizado correctamente');
        this.mostrarFormulario = false;
        this.getPredioCopropiedad();
        this.predioCopropiedadObj = new CpredioCopropiedad();
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
      this.predioCopropiedadObj.id = id
      this.AdministrativoSrv.deletePredioCopropiedad(id).subscribe((res:any)=>{
        if (res) {
          alert('Predio copropiedad eliminado correctamente');
          this.getPredioCopropiedad();
        } else {
          alert(res.message)
        }
      })
    }
  }

  onEdit(data: any){
    this.mostrarFormulario = true;
    this.predioCopropiedadObj = Object.assign({}, data);
  }
            
  onCancel(){
    this.mostrarFormulario = false;
    this.predioCopropiedadObj = new CpredioCopropiedad();
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
