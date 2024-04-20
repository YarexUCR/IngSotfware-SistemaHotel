import { Component } from '@angular/core';

import { PaypalPagoService } from '../paypal/paypal-pago.service';
import { FooterComponent } from "../footer/footer.component";

import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Reserva } from '../dominio/Reserva'; // Importa la interfaz Reserva

@Component({
    selector: 'app-disponible',
    standalone: true,
    templateUrl: './disponible.component.html',
    styleUrl: './disponible.component.scss',
    imports: [FooterComponent,
      MatGridListModule,
      MatMenuModule,
      MatIconModule,
      MatButtonModule,
      MatCardModule,
      CommonModule
    ]
})
export class DisponibleComponent {

  reserva: Reserva | null = null; // Propiedad para recibir la reserva
  constructor(private paypalPagoService: PaypalPagoService,private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.reserva = params['reserva'] ? JSON.parse(params['reserva']) : null; // Recibe la reserva como parámetro
    });
  }
   ////////////////////////////////////paypal
   ngAfterViewInit() {
    this.paypalPagoService.renderPaypalButton();
    
  }
}
