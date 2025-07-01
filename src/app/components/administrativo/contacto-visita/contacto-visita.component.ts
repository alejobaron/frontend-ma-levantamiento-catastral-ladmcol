import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipe } from '../../../pipe/filter.pipe';
import { CcontactoVisita, IContactoVisita } from '../../../model/paqueteAdministrativo/contactoVisita';
import { AdministrativoService } from '../../../services/administrativo.service';
import { RouterModule } from '@angular/router';
import { DominiosService } from '../../../services/dominios.service';
import { IdatosAdicionlesLevantamientoCatastral } from '../../../model/paqueteAdministrativo/datosAdicionalesLevantamientoCatastral';

@Component({
  selector: 'app-contacto-visita',
  imports: [FormsModule, CommonModule, NgxPaginationModule, FilterPipe, RouterModule],
  templateUrl: './contacto-visita.component.html',
  styleUrl: './contacto-visita.component.css'
})
export class ContactoVisitaComponent {

  mostrarFormulario: boolean = false;
  searchText: string = '';

  tiposDocumento: { valor: number; etiqueta: string }[] = [];

  page: number = 1; 
  pageSize: number = 5; 

  contactoVisitaObj: CcontactoVisita = new CcontactoVisita();
  contactoVisitaArray: IContactoVisita [] = []

  datosAdicionalesLevantamientoCatastral: IdatosAdicionlesLevantamientoCatastral[] = [];

  constructor(
    private AdministrativoSrv: AdministrativoService,
    private DominiosSrv: DominiosService
  ){}

    ngOnInit(): void {
    this.getContactoVisita();
    this.getTiposDocumento();
    this.getDatosAdicionalesLevantamientoCatastral()
  }
    
  getContactoVisita(){
    this.AdministrativoSrv.loadContactoVisita().subscribe((res:any)=>{
      this.contactoVisitaArray = res;
    })
  }

  getTiposDocumento() {
    this.DominiosSrv.loadTiposDocumento().subscribe(res => {
      this.tiposDocumento = res.map(item => ({
        valor: item.id,
        etiqueta: item.tipo_display
      }));
    });
  }

  getDatosAdicionalesLevantamientoCatastral() {
    this.AdministrativoSrv.loadDatoAdicionalLevantamientoCatastral().subscribe({
      next: (res: any) => {
        this.datosAdicionalesLevantamientoCatastral = res;
      },
      error: (err) => {
        console.error('Error cargando datosa dicionales de levantamientocatastral', err);
      }
    });
  }

  onSave(){
    this.mostrarFormulario = true;
      this.AdministrativoSrv.createContactoVisita(this.contactoVisitaObj).subscribe((res:any)=>{
        if (res){
          alert('Contacto de visita creado correctamente');
          this.mostrarFormulario = false;
          this.getContactoVisita();
          this.contactoVisitaObj = new CcontactoVisita();
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
    this.AdministrativoSrv.updateContactoVisita(this.contactoVisitaObj.id, this.contactoVisitaObj).subscribe((res:any)=>{
      if (res){
        alert('Contacto de visita actualizado correctamente');
        this.mostrarFormulario = false;
        this.getContactoVisita();
        this.contactoVisitaObj = new CcontactoVisita();
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
      this.contactoVisitaObj.id = id
      this.AdministrativoSrv.deleteContactoVisita(id).subscribe((res:any)=>{
        if (res) {
          alert('Contacto de visita eliminado correctamente');
          this.getContactoVisita();
        } else {
          alert(res.message)
        }
      })
    }
  }

  onEdit(data: any){
    this.mostrarFormulario = true;
    this.contactoVisitaObj = Object.assign({}, data);
  }
            
  onCancel(){
    this.mostrarFormulario = false;
    this.contactoVisitaObj = new CcontactoVisita();
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
