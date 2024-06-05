import { Component } from '@angular/core';

import { FooterComponent } from "../footer/footer.component";

import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Reserva } from '../dominio/Reserva'; // Importa la interfaz Reserva
import { ReservaService } from '../api/reserva.service';
import { FormsModule } from '@angular/forms';
import { TipoHabitacion } from '../dominio/TipoHabitacion';
import { Habitacion } from '../dominio/Habitacion';
import { ModalComponent } from '../modal/modal.component';



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
      CommonModule,
      FormsModule,
      ModalComponent
    ]
})
export class DisponibleComponent {
  token: string | null;//token de session
  reserva: Reserva | null = null; // Propiedad para recibir la reserva
  cedula: string = '';
  showModal: boolean = false;
  modalTitle!: string;
  modalMessage!: string;
  private paypalSDK: any;
  constructor(private route: ActivatedRoute, private router: Router, private reservarService: ReservaService){
    this.paypalSDK = (window as any).paypal;
     //para resguardar ruta
     if (typeof localStorage !== 'undefined') {
      this.token = localStorage.getItem('token');
    } else {
      this.token = null;
    }
  }

  tipos : TipoHabitacion []=[];

  obtenerTipos(){
    this.reserva?.habitaciones.forEach(habitacion=>{
    const tipoExistente = this.tipos.find(tipo => tipo.id === habitacion.tipo.id);
    if (!tipoExistente) {
      this.tipos.push(habitacion.tipo);
    }
    });
  }
  obtenerHabitacionesPorTipo(id:number){
    return  this.reserva?.habitaciones.filter(habitacion => habitacion.tipo.id === id);
  }
  ngOnInit(): void {
    //verificar autenticacion
    if (this.token != null) {
      this.router.navigate(['/admin/home']);
    }
    this.route.queryParams.subscribe(params => {
      this.reserva = params['reserva'] ? JSON.parse(params['reserva']) : null; // Recibe la reserva como parámetro
      
    });
    this.obtenerTipos();
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
              value: this.reserva?.total, // Precio del pago
              currency_code: 'USD'
            }
          }]
        });
      },  
      onApprove: (data: any, actions: any) => {
        // Mostrar confirmación antes de ejecutar el pago
        if(!this.cedula){
          //alert('Por favor agregue un numero de identificación para continuar');
          this.modalTitle = 'Mensaje';
          this.modalMessage = 'Por favor agregue un numero de identificación para continuar';
          this.showModal = true;
          return;
        }
        return actions.order.capture().then((details: any) => {
          //console.log('Pago completado:', details);
          const nombrePaypal = details.payer.name.given_name; // Nombre del comprador de PayPal
          const apellidoPaypal = details.payer.name.surname;
          const correoPaypal = details.payer.email_address; // Correo electrónico del comprador de PayPal
        
          if(this.reserva){
            this.reserva.email = correoPaypal;
            this.reserva.cliente = nombrePaypal+' '+apellidoPaypal;
            this.reserva.cedula = this.cedula;
            this.reservarService.insertarReserva(this.reserva).subscribe(
              (respuesta) => {
                // Aquí puedes manejar la respuesta según tu lógica
                const id =respuesta;
                if (this.reserva) { // Asegurarse de que this.reserva no es null ni undefined
                  this.reserva.id = id;
                  this.router.navigate(['reserva-realizada'], { queryParams: { reserva: JSON.stringify(this.reserva) } });
                }
              },
              (error) => {
                console.error('Error al llamar al servicio:', error);
                // Aquí puedes manejar el error según tu lógica
                //alert('Error con el servicio');
                this.modalTitle = 'Mensaje';
                this.modalMessage = 'Error con el servicio';
                this.showModal = true;
              }
            );
          }
          //
          // Aquí puedes enviar el ID de la orden a tu backend para procesar la reserva
          
        });
      }
    }).render('#paypal-button-container');
  }  
  
  closeModal() {
    this.showModal = false; // Cierra el modal cuando se emite el evento desde el componente hijo
  } 


   ////////////////////////////////////paypal
   ngAfterViewInit() {
    this.renderPaypalButton();
    
  }
}
