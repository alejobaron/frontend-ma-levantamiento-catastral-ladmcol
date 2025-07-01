import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipe } from '../../../pipe/filter.pipe';
import { CinteresadoContacto, IinteresadoContacto } from '../../../model/paqueteInteresados/contactoInteresado';
import { InteresadoService } from '../../../services/interesado.service';
import { RouterModule } from '@angular/router';
import { IinteresadoCR } from '../../../model/paqueteInteresados/interesadoCr';

@Component({
  selector: 'app-lc-interesado-contacto',
  imports: [FormsModule, CommonModule, NgxPaginationModule, FilterPipe, RouterModule],
  templateUrl: './lc-interesado-contacto.component.html',
  styleUrl: './lc-interesado-contacto.component.css'
})
export class LcInteresadoContactoComponent {

  mostrarFormulario: boolean = false;

  searchText: string = '';

  page: number = 1; 
  pageSize: number = 5; 

  interesadoContactoObj: CinteresadoContacto = new CinteresadoContacto();
  interesadoContactoArray: IinteresadoContacto [] = []

  interesados: IinteresadoCR[] = [];

  constructor(
    private InteresadoSrv: InteresadoService)
    {}

  ngOnInit(): void {
    this.getContactoInteresado();
    this.getInteresadocr()

  }

  getContactoInteresado(){
    this.InteresadoSrv.loadContactoInteresado().subscribe((res:any)=>{
      this.interesadoContactoArray = res
    })
  }

  getInteresadocr() {
    this.InteresadoSrv.loadCrInteresado().subscribe({
      next: (res: any) => {
        this.interesados = res;
      },
      error: (err) => {
        console.error('Error cargando interesados', err);
      }
    });
  }

  onSaveContactoInteresado(){
    this.mostrarFormulario = true;
    this.InteresadoSrv.createNewContactoInteresado(this.interesadoContactoObj).subscribe((res:any)=>{
      if (res){
        alert('Contacto de interesado creado correctamente');
        this.mostrarFormulario = false;
        this.getContactoInteresado();
        this.interesadoContactoObj = new CinteresadoContacto();
      } else{
        alert (res.message)
      }
    },
  (error: any)=> {
    const errorMessage = this.extractErrorMessage(error)
    alert(errorMessage);
  })
  }

  onUpdateContactoInteresado(){
    this.InteresadoSrv.updateContactoInteresado(this.interesadoContactoObj.id, this.interesadoContactoObj).subscribe((res:any)=>{
      if (res){
        alert('Contacto de interesado actualizado correctamente');
        this.mostrarFormulario = false;
        this.getContactoInteresado();
        this.interesadoContactoObj = new CinteresadoContacto();
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
      this.interesadoContactoObj.id = id
      this.InteresadoSrv.deleteContactoInteresado(id).subscribe((res:any)=>{
        if (res) {
          alert('Interesado COL eliminado correctamente');
          this.getContactoInteresado();
        } else {
          alert(res.message)
        }
      })
    }
  }

  onEdit(data: any){
    this.mostrarFormulario = true;
    this.interesadoContactoObj = Object.assign({}, data);
  }
    
  onCancel(){
    this.mostrarFormulario = false;
    this.interesadoContactoObj = new CinteresadoContacto();
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
