import { Component } from '@angular/core';
import { FooterComponent } from "../../footer/footer.component";
import { Router } from '@angular/router';
import { TipoHabitacionService } from '../../api/tipo.habitacion.service';
import { TipoHabitacion } from '../../dominio/TipoHabitacion';
import { Habitacion } from '../../dominio/Habitacion';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../modal/modal.component';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
    selector: 'app-administrar-habitaciones',
    standalone: true,
    templateUrl: './administrar-habitaciones.component.html',
    styleUrl: './administrar-habitaciones.component.scss',
    imports: [FooterComponent,CommonModule,MatProgressSpinnerModule,ModalComponent]
})
export class AdministrarHabitacionesComponent {
  token: string | null;//token de session
  tipos : TipoHabitacion[]=[];
  habitaciones : Habitacion[]=[];
  cargando = false;
  showModal: boolean = false;
  modalTitle!: string;
  modalMessage!: string;
  constructor(private router: Router,private servicio : TipoHabitacionService) {
    //para resguardar ruta
    if (typeof localStorage !== 'undefined') {
      this.token = localStorage.getItem('token');
    } else {
      this.token = null;
    }
  }
  ngOnInit() {
    //verificar autenticacion
    if (this.token == null) {
      this.router.navigate(['/login']);
    }
    this.servicio.obtenerTiposHabitaciones().subscribe(data => {
      this.tipos = data;

    });
    this.cargando = true;
    this.servicio.obtenerTodasHabitaciones().subscribe(data => {
      this.habitaciones = data;
      this.cargando = false;
    });
  }

  obtenerHabitacionesPorTipo(id:number){
    
    return  this.habitaciones.filter(habitacion => habitacion.tipo.id === id);
  }

  
  cargarTipo(id:number){
    
    this.router.navigate(['admin/cargarTipoHabitacion'], { queryParams: { tipo: JSON.stringify(this.tipos.find(tipo => tipo.id===id)) } });
  }

  activar(id:number,event: Event){
    const checkbox = event.target as HTMLInputElement;
    const esActivo = checkbox.checked;
    this.servicio.actualizarEstadoHabitacion(id, esActivo).subscribe(
      response => {
        if(response){
          //alert("La habitacion ha sido modificada");
          this.modalTitle = 'Mensaje';
          this.modalMessage = 'La habitacion ha sido modificada';
          this.showModal = true;
        }else{
          //alert("Ocurrio un error intenta de nuevo");
          this.modalTitle = 'Mensaje';
          this.modalMessage = 'Ocurrio un error intenta de nuevo';
          this.showModal = true;
        }
      },
      error => {
        //alert("Ha ocurrido un error con el servicio");
        this.modalTitle = 'Mensaje';
        this.modalMessage = 'Ha ocurrido un error con el servicio';
        this.showModal = true;
      }
    );
    
  }

  closeModal() {
    this.showModal = false; // Cierra el modal cuando se emite el evento desde el componente hijo
  }

}
