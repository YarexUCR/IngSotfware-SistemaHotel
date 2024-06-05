import { Component } from '@angular/core';
import { Reserva } from '../dominio/Reserva';

import { FooterComponent } from "../footer/footer.component";

import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservaService } from '../api/reserva.service';
import { FormsModule } from '@angular/forms';
import { TipoHabitacion } from '../dominio/TipoHabitacion';
import { Habitacion } from '../dominio/Habitacion';
import { ModalComponent } from '../modal/modal.component';

@Component({
    selector: 'app-reservacion-realizada',
    standalone: true,
    templateUrl: './reservacion-realizada.component.html',
    styleUrl: './reservacion-realizada.component.scss',
    imports: [CommonModule, FooterComponent, ModalComponent]
})
export class ReservacionRealizadaComponent {
  token: string | null;//token de session
  reserva: Reserva | null = null; // Propiedad para recibir la reserva
  showModal: boolean = false;
  modalTitle!: string;
  modalMessage!: string;

  constructor(private route: ActivatedRoute, private router: Router){
     //para resguardar ruta
     if (typeof localStorage !== 'undefined') {
      this.token = localStorage.getItem('token');
    } else {
      this.token = null;
    }
  }

  ngOnInit(): void {
    //verificar autenticacion
    if (this.token != null) {
      this.router.navigate(['/admin/home']);
    }
    this.route.queryParams.subscribe(params => {
      this.reserva = params['reserva'] ? JSON.parse(params['reserva']) : null; // Recibe la reserva como parámetro
      
    });
  }

  closeModal() {
    this.showModal = false; // Cierra el modal cuando se emite el evento desde el componente hijo
  }

}
