import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaypalPagoService {
  private paypalSDK: any;
  private total=0;

  constructor() {
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
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: '10.00' // Precio del pago
              }
            }]
          });
        },
        onApprove: (data: any, actions: any) => {
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
