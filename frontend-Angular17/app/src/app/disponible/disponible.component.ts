import { Component } from '@angular/core';

import { PaypalPagoService } from '../paypal/paypal-pago.service';
import { FooterComponent } from "../footer/footer.component";

import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

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
      MatCardModule
    ]
})
export class DisponibleComponent {
  constructor(private paypalPagoService: PaypalPagoService){}
   ////////////////////////////////////paypal
   ngAfterViewInit() {
    this.paypalPagoService.renderPaypalButton();
  }
}
