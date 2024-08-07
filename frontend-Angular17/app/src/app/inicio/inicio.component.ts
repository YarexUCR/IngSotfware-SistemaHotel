import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FooterComponent } from '../footer/footer.component';
import { Router } from "@angular/router";
import { HotelService } from '../api/hotel.service';
import { Hotel } from '../dominio/Hotel';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss',
  standalone: true,
  imports: [

    FooterComponent,

    AsyncPipe,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    ModalComponent
  ]
})
export class InicioComponent {

  token: string | null;//token de session
  hotel: Hotel | null = null;
  ruta : string | null = null;
  hotelTemporal: Hotel | null = null;
  showModal: boolean = false;
  modalTitle!: string;
  modalMessage!: string;

  constructor(private router: Router,private servicio: HotelService ) {
    //para resguardar ruta
    if (typeof localStorage !== 'undefined') {
      this.token = localStorage.getItem('token');
    } else {
      this.token = null;
    }
  }
  ngOnInit() {
    //verificar autenticacion
    if (this.token != null) {
      this.router.navigate(['/admin/home']);
    }
    this.servicio.ObtenerHome(1).subscribe(
      data => {
        this.hotel = data;
      },
      error => {
        //alert('Ha ocurrido un erro con el servicio');
        this.modalTitle = 'Mensaje';
        this.modalMessage = 'Ha ocurrido un error con el servicio';
        this.showModal = true;
      }
    );

    this.servicio.ObtenerImagenHome(1).subscribe(
      data => {
        this.hotelTemporal = data;
        if(this.hotelTemporal){
          if(this.hotel){
            this.hotel.imagen_Home =this.hotelTemporal.imagen_Home;
          }
        }   
      },
      error => {
        //alert('Ha ocurrido un erro con el servicio');
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
