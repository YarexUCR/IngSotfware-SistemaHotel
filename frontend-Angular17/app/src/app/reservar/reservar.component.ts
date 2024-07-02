
import { Component, inject } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule} from '@angular/forms';
import { FooterComponent } from "../footer/footer.component";
import { CommonModule } from '@angular/common';
import { differenceInDays, parseISO, addDays, format  } from 'date-fns';
import { TipoHabitacion } from '../dominio/TipoHabitacion';
import { Habitacion, HabitacionesDisponibles } from '../dominio/Habitacion';
import { TipoHabitacionService } from '../api/tipo.habitacion.service';
import { ModalComponent } from '../modal/modal.component';

interface Recomendacion{
  fecha: string,
  cantidad : number
}

@Component({
  selector: 'app-reservar',
  standalone: true,
  templateUrl: './reservar.component.html',
  styleUrl: './reservar.component.scss',
  imports: [
    CommonModule,
    FormsModule,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    FooterComponent,
    ModalComponent
  ]
})



export class ReservarComponent {

  token: string | null;//token de session

  //variables globales del proceso reservar
  formData: any = [];//acceso a los input del formulario para reservar
  tiposDeHabitacion: TipoHabitacion[] = [];//todos los tipos de habitaciones disponibles
  tiposDeHabitacionElegidos: TipoHabitacion[] = [];//tipos de habitaciones elegidos

  //controlar el orden de la captura del proceso
  checkOutDesactivado: boolean;
  checkInDesactivado: boolean;
  cantidad_habitacionDesactivado: boolean;
  tipo_habitacionDesactivado: boolean;
  tabla_contenidoVisible: boolean;
  showModal: boolean = false;
  modalTitle!: string;
  modalMessage!: string;


  constructor(private service: TipoHabitacionService, private routerA: ActivatedRoute, private router: Router) {

    //para resguardar ruta
    if (typeof localStorage !== 'undefined') {
      this.token = localStorage.getItem('token');
    } else {
      this.token = null;
    }
    //mostrar campos para entradas de forma ordenada
    this.checkInDesactivado = false;
    this.checkOutDesactivado = true;
    this.cantidad_habitacionDesactivado = true;
    this.tipo_habitacionDesactivado = true;
    this.tabla_contenidoVisible = false;

  }

  ngOnInit(): void {
    //verificar autenticacion
    if (this.token != null) {
      this.router.navigate(['/admin/home']);
    }
    this.routerA.params.subscribe(parametros => { console.log(parametros) });

    this.service.obtenerTiposHabitaciones().subscribe(data => {
      this.tiposDeHabitacion = data;
    });

    this.formData.cantidad_habitacion = 0;
  }


  ////////////////////////////////////validaciones
  mostrarErrorCheckIn = false;
  validarCheckIn() {
    this.mostrarErrorCheckIn = !this.formData.checkIn; // Si this.formData.checkIn está vacío, mostrarErrorCheckIn será true
    return;
  }

  mostrarErrorCheckOut = false;
  validarCheckOut() {
    this.mostrarErrorCheckOut = !this.formData.checkOut; // Si this.formData.checkOut está vacío, mostrarErrorCheckOut será true
    return;
  }

  mostrarErrorTipoHabitacion = false;
  validarTipoHabitacion() {
    this.mostrarErrorTipoHabitacion = !this.formData.tipo_habitacion; // Si this.formData.tipo_habitacion está vacío, mostrarErrorTipoHabitacion será true
    return;
  }

  mostrarErrorCantidadHabitacion = false;
  validarCantidadHabitacion() {
    this.mostrarErrorCantidadHabitacion = !this.formData.cantidad_habitacion; // Si this.formData.cantidad_habitacion está vacío, mostrarErrorCantidadHabitacion será true
    return;
  }


  
  validarRequerido() {
    this.validarCheckIn();
    this.validarCheckOut();
    this.validarTipoHabitacion();
    this.validarCantidadHabitacion();
  }
  //////////////////////////////////validar formato de fechas al cambiar los campos
  mensajeError = '';
  mostrarError = false;
  mostrarConfirmacion = false;
  mensajeConfirmacion = '';


  //validar que la reserva sea del día actual o posterior, que no sea un día pasado
  validarFechaEntrada(event: Event) {
    //const fechaActualCR = moment().tz('America/Costa_Rica').format('YYYY-MM-DD');
    const fechaActual = new Date().toISOString().split('T')[0];
    const fechaLlegada = new Date(this.formData.checkIn); // Obtener la fecha de llegada a las 00:00:00

    // Validar que la fecha de llegada sea posterior o igual al día actual
    if (fechaLlegada.toISOString().slice(0, 10) === fechaActual) {//si es el día de hoy
      this.mostrarConfirmacion = true;
      this.mensajeConfirmacion = 'Puedes hacer el check in a partir de las 3 pm.';
      this.mostrarError = false;
      this.checkOutDesactivado = false;
      this.checkInDesactivado = true;
    } else if (fechaLlegada.toISOString().slice(0, 10) < fechaActual) {//si elije un día pasado
      this.mostrarError = true;
      this.mostrarConfirmacion = false;
      this.mensajeError = 'La fecha de llegada debe ser el día de ' + fechaActual + ' o posterior';

    } else {//si elije un día futuro
      this.mostrarError = false;
      this.mostrarConfirmacion = true;
      this.mensajeConfirmacion = 'Puedes hacer el check in el ' + fechaLlegada.toISOString().slice(0, 10) + ' a partir de las 3 pm.';
      this.checkOutDesactivado = false;
      this.checkInDesactivado = true;
    }
    this.validarCheckIn();
  }

  mensajeError_ = '';
  mostrarError_ = false;
  mostrarConfirmacion_ = false;
  mensajeConfirmacion_ = '';
  //validar fecha de salida
  validarFechaDeSalida(event: Event) {
    const fechaLlegada = new Date(this.formData.checkIn); // Obtener la fecha de llegada a las 00:00:00
    const fechaSalida = new Date(this.formData.checkOut); // Obtener la fecha de salida a las 00:00:00

    // Validar que la fecha de salida sea posterior a la fecha de llegada
    if (!this.formData.checkIn) {
      this.mensajeError_ = 'Primero elije la fecha de entrada';
      this.mostrarError_ = true;
      this.mostrarConfirmacion_ = false;
    } else if (fechaSalida <= fechaLlegada) {
      this.mensajeError_ = 'La fecha de salida debe ser posterior a la fecha de llegada.';
      this.mostrarError_ = true;
      this.mostrarConfirmacion_ = false;
    } else {
      this.mensajeConfirmacion_ = 'El día ' + fechaSalida.toISOString().slice(0, 10) + ' a las 11 am debes hacer la salida del hotel';
      this.mostrarError_ = false;//no hay error
      this.mostrarConfirmacion_ = true;//se confirma la hora recivido
      this.checkOutDesactivado = true;//se desactiva el campo check out
      //this.cantidad_habitacionDesactivado=false;//se activa cantidad
      this.tipo_habitacionDesactivado = false;//se activa el tipo de habtacion
    }
    this.validarCheckOut();
  }

  minimo: number = 0;
  maximo: number = 0;
  recomendacion: string = '';
  disponibles : HabitacionesDisponibles[]=[];
  recomendacionDesactivado=false;
  validarCantidad(event: Event) {

    this.service.obtenerHabitacionesDisponibles(this.formData.checkIn, this.formData.checkOut, this.formData.tipo_habitacion).subscribe(data => {

      if (data.length === 0) {
        this.recomendacion = '¡Lo sentimos! En ese rango de fechas no tenemos habitaciones disponibles: \n'
        this.service.obtenerCantidadHabitacionesDisponibles(this.formData.checkIn, this.formData.checkOut).
          subscribe(data => {
           this.disponibles = data;
           if(this.disponibles.length==0)
            {
              this.recomendacion+="Todas nuestras habitaciones estan ocupadas";
              //alert(this.recomendacion);
              this.modalTitle = 'Mensaje';
              this.showModal = true;
            }else{
           this.disponibles.forEach(element => {
            if(element.tipo!=this.formData.tipo_habitacion0){
              this.recomendacion += "Para las habitaciones de tipo "+element.tipo+" tenemos "+element.cantidad+" habitaciones disponibles. ";
            }
            this.cantidad_habitacionDesactivado=true;
            this.recomendacionDesactivado=true;
            });
            //alert(this.recomendacion);
            this.modalTitle = 'Recomendaciones';
            this.modalMessage = this.recomendacion;
            this.showModal = true;
            this.cantidad_habitacionDesactivado=true;
            this.recomendacionDesactivado=true;
            }
            this.cargarRecomendacion();
          });
        

      } else {
        this.cantidad_habitacionDesactivado = false;
        this.recomendacionDesactivado = false;
        this.minimo = 1;
        this.maximo = data.length;
      }
      this.formData.cantidad_habitacion = data.length;
    });

  }
  ////////////////////////////////////////funciones
  recomendaciones : Recomendacion []=[];
  recomendacionesTemporal : Recomendacion []=[];
  cargando : boolean =false;
  cargarRecomendacion(){
    this.recomendaciones = [];
    for (let i = 0; i < 7; i++) {
      const nextDate = addDays(parseISO(this.formData.checkIn), i);
      const formattedDate = format(nextDate, 'yyyy-MM-dd');
      const cantidad = 0;
      this.service.obtenerCantidadHabitacionesDisponiblesPorDiaTipo(this.formData.tipo_habitacion, formattedDate).subscribe
        (data=>{
          let _recomendacion={
            fecha : formattedDate,
            cantidad: data
          };
          this.recomendaciones.push(_recomendacion);
          this.recomendaciones.sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
      });
      
    }
  }


  totalReserva: number = 0;
  detelleReserva = '';
  calcular() {
    this.totalReserva = 0;
    this.tiposDeHabitacionElegidos.forEach(tipoActual => {
      this.totalReserva += (tipoActual.precio * this.cantidadNoches) * tipoActual.cantidad;
    });
  }

  cantidadNoches = 0;
  contarNoches() {
    if (this.formData.checkIn && this.formData.checkOut) {
      const fechaInicioParsed = parseISO(this.formData.checkIn); // Parsea la fecha de inicio
      const fechaFinParsed = parseISO(this.formData.checkOut); // Parsea la fecha de fin
      this.cantidadNoches = differenceInDays(fechaFinParsed, fechaInicioParsed); // Calcula la diferencia en días
    } else {
      this.cantidadNoches = 0; // Reinicia la cantidad de noches si las fechas no están completas
    }
  }


  /////////////////////////////////////acciones de los botones
  habitaciones: Habitacion[] = [];
  habitacionesTemporal : Habitacion[]=[];
  agregarHabitacion() {

    this.validarRequerido();

    if (
      this.mostrarErrorCantidadHabitacion
      || this.mostrarErrorTipoHabitacion
      || this.mostrarErrorCheckIn
      || this.mostrarErrorCheckOut
      || this.mostrarError
      || this.mostrarError_
    ) {
      return;
    }
    if(this.formData.cantidad_habitacion>this.maximo||this.formData.cantidad_habitacion<this.minimo){
      this.modalTitle = 'Mensaje';
      this.modalMessage = "El maximo de habitaciones disponibles es "+this.maximo+ " y el minimo "+ this.minimo;
      this.showModal = true;
      return;
    }

    this.tiposDeHabitacionElegidos = this.tiposDeHabitacionElegidos.filter(item => item.id != this.formData.tipo_habitacion);
    this.habitaciones = this.habitaciones.filter(item => item.tipo.id != this.formData.tipo_habitacion);
    this.tiposDeHabitacion.forEach(tipoActual => {

      if (tipoActual.id == this.formData.tipo_habitacion) {
        tipoActual.cantidad = this.formData.cantidad_habitacion;
        this.tiposDeHabitacionElegidos.push(tipoActual);
        this.service.obtenerHabitacionesDisponibles(this.formData.checkIn, this.formData.checkOut, this.formData.tipo_habitacion).
        subscribe(data => {
            this.habitacionesTemporal = data;
            this.habitacionesTemporal = this.habitacionesTemporal.slice(0, tipoActual.cantidad);
            this.habitaciones = this.habitaciones.concat(this.habitacionesTemporal);
        });
      }
    });
    
    this.contarNoches();
    this.calcular();
    this.tabla_contenidoVisible = true;
  }


  quitarHabitacion(indice: number) {
    //obteber el valor del input oculto en la tabla dinamica con el carrito de habitaciones
    const valorInputHidden = (<HTMLInputElement>document.getElementById(indice + '')).value;
    //eliminar el tipo de habitacion con el id recibido del carrito de compras
    this.tiposDeHabitacionElegidos = this.tiposDeHabitacionElegidos.filter(item => item.id !== parseInt(valorInputHidden));
    this.habitaciones = this.habitaciones.filter(item => item.tipo.id !==  parseInt(valorInputHidden));
    this.contarNoches();
    this.calcular();
    if (this.tiposDeHabitacionElegidos.length == 0) {
      this.tabla_contenidoVisible = false;
    }
  }


  reservar() {
   
    let reserva = {
      id: 0,
      cliente: "",
      cedula: "",
      email: "",
      total: this.totalReserva,
      checkIn: this.formData.checkIn,
      checkOut: this.formData.checkOut,
      habitaciones: this.habitaciones
    }

    this.router.navigate(['disponible'], { queryParams: { reserva: JSON.stringify(reserva) } });
  }

  reiniciarFormulario() {
    this.formData.checkIn = '';
    this.formData.checkOut = '';
    this.formData.cantidad_habitacion = '';
    this.formData.tipo = '';
    this.cantidadNoches = 0;
    //mostrar campos para entradas de forma ordenada
    this.checkInDesactivado = false;
    this.checkOutDesactivado = true;
    this.cantidad_habitacionDesactivado = true;
    this.tipo_habitacionDesactivado = true;
    this.tabla_contenidoVisible = false;
  }

  closeModal() {
    this.showModal = false; // Cierra el modal cuando se emite el evento desde el componente hijo
  }
}
