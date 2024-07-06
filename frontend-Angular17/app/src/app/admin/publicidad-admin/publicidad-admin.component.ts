import { Component } from '@angular/core';
import { FooterComponent } from "../../footer/footer.component";
import { Router } from '@angular/router';
import { PublicidadService } from '../../api/Publicidad.service';
import { Publicidad } from '../../dominio/Publicidada';
import { CommonModule } from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ModalComponent } from '../../modal/modal.component';

@Component({
    selector: 'app-publicidad-admin',
    standalone: true,
    templateUrl: './publicidad-admin.component.html',
    styleUrl: './publicidad-admin.component.scss',
    imports: [
      FooterComponent, 
      CommonModule,
      MatProgressSpinnerModule,
      ModalComponent
    ]
})
export class PublicidadAdminComponent {
  token: string | null;//token de session
  publicidades : Publicidad []=[];
  cargando : boolean;
  showModal: boolean = false;
  modalTitle!: string;
  modalMessage!: string;

  constructor(private router: Router, private servicio : PublicidadService) {
    //para resguardar ruta
    if (typeof localStorage !== 'undefined') {
      this.token = localStorage.getItem('token');
    } else {
      this.token = null;
    }
    this.cargando = false;
  }
  ngOnInit() {
    //verificar autenticacion
    if (this.token == null) {
      this.router.navigate(['/login']);
    }
    this.servicio.ObtenerTodasPublicidad().subscribe(
      data=>{
        this.cargando= true;
        this.publicidades=data;
        this.cargando = false;
      },
      error=>{
        this.cargando= true;
        //alert("Error con el servicio");
        this.modalTitle = 'Mensaje';
        this.modalMessage = 'Error con el servicio';
        this.showModal = true;
        this.cargando = false;
      }
    );
  }

  quitar(id:number){
    this.servicio.EliminarPublicidad(id).subscribe(
      data=>{
        this.cargando= true;
        if(data){
          //alert("Publicidad eliminada");
          this.modalTitle = 'Mensaje';
          this.modalMessage = 'Publicidad eliminada';
          this.showModal = true;
        }
        this.cargando = false;
        window.location.reload();
      },
      error=>{
        this.cargando= true;
        //alert("Error con el servicio");
        this.modalTitle = 'Mensaje';
        this.modalMessage = 'Error con el servicio';
        this.showModal = true;
        this.cargando = false;
      }
    );
  }

  closeModal() {
    this.showModal = false; // Cierra el modal cuando se emite el evento desde el componente hijo
  }
  
}
