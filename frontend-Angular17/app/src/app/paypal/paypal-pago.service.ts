import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PaypalPagoService {
  private paypalSDK: any;
  private total=0;

  constructor(private router: Router) {
    // Inicializa el SDK de PayPal en el constructor del servicio
    this.paypalSDK = (window as any).paypal;
    this.initPaypalSDK();
  }

  setTotal(totalReserva : number){
    this.total=totalReserva;
  }
  private initPaypalSDK() {
    if (this.paypalSDK) {
      this.paypalSDK.Buttons({
        style: {
          layout: 'horizontal',
          color:  'blue',
          shape:  'rect',
          label:  'paypal',
        },
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: '10.00', // Precio del pago
              }
            }]
          });
        },
        onClick: (data: any, actions: any) => {
          // Mostrar confirmación antes de ejecutar el pago
          return actions.order.capture().then((details: any) => {
            console.log('Pago completado:', details);
            
            // Aquí puedes enviar el ID de la orden a tu backend para procesar la reserva
            
          });
        }
      }).render('#paypal-button-container');
    } else {
      console.error('SDK de PayPal no encontrado');
    }
  }  
}
