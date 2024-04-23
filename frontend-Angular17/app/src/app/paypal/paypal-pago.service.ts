import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PaypalPagoService  {
  private paypalSDK: any;
  private total = 0;

  constructor(private router: Router) {
    // Inicializa el SDK de PayPal en el constructor del servicio
    this.paypalSDK = (window as any).paypal;
  }

  setTotal(totalReserva : number){
    this.total = totalReserva;
  }

  renderPaypalButton() {
    if (!this.paypalSDK) {
      console.error('El SDK de PayPal no está disponible');
      return;
    }

    this.paypalSDK.Buttons({
      style: {
        layout: 'vertical',
        color:  'gold',
        shape:  'rect',
        label:  'paypal',
        disableMaxWidth: true
      },
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: '10.00', // Precio del pago
              currency_code: 'USD'
            }
          }]
        });
      },
      onApprove: (data: any, actions: any) => {
        // Mostrar confirmación antes de ejecutar el pago
        return actions.order.capture().then((details: any) => {
          console.log('Pago completado:', details);
          
          // Aquí puedes enviar el ID de la orden a tu backend para procesar la reserva
          this.router.navigate(['']);
        });
      }
    }).render('#paypal-button-container');
  }  
  
}