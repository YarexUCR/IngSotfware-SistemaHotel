
import { Component, inject } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, NgForm, Validators} from '@angular/forms';
import { FooterComponent } from "../footer/footer.component";
import { CommonModule } from '@angular/common';
import { HotelService } from '../api/hotel.service';
import { differenceInDays, parseISO } from 'date-fns';
import{TipoHabitacion} from '../dominio/TipoHabitacion';
import { Reserva } from '../dominio/Reserva';
import { Habitacion } from '../dominio/Habitacion';

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
        FooterComponent
    ]
})



export class ReservarComponent {
  
  token: string | null;//token de session
  
  //variables globales del proceso reservar
  formData: any = [];//acceso a los input del formulario para reservar
  tiposDeHabitacion : TipoHabitacion[]=[];//todos los tipos de habitaciones disponibles
  tiposDeHabitacionElegidos : TipoHabitacion[]=[];//tipos de habitaciones elegidos

  //controlar el orden de la captura del proceso
  checkOutDesactivado : boolean;
  checkInDesactivado : boolean;
  cantidad_habitacionDesactivado : boolean;
  tipo_habitacionDesactivado : boolean;
  tabla_contenidoVisible : boolean;

constructor(private hotelService: HotelService, private routerA: ActivatedRoute, private router: Router){
    
     //para resguardar ruta
     if (typeof localStorage !== 'undefined') {
      this.token = localStorage.getItem('token');
    } else {
      this.token = null;
    }
    //mostrar campos para entradas de forma ordenada
    this.checkInDesactivado = false;
    this.checkOutDesactivado = true;
    this.cantidad_habitacionDesactivado =true;
    this.tipo_habitacionDesactivado=true;
    this.tabla_contenidoVisible=false;

}
  
  ngOnInit():void{
     //verificar autenticacion
     if (this.token != null) {
      this.router.navigate(['/admin/home']);
    }
    this.routerA.params.subscribe(parametros =>{console.log(parametros)});

    this.hotelService.getTiposHabitaciones().subscribe(data => {
      this.tiposDeHabitacion = data;
    });

    this.formData.cantidad_habitacion = 1;
  }
 

  ////////////////////////////////////validaciones
  mostrarErrorCheckIn=false;
  validarCheckIn() {
    this.mostrarErrorCheckIn = !this.formData.checkIn; // Si this.formData.checkIn está vacío, mostrarErrorCheckIn será true
    return;
  }

  mostrarErrorCheckOut=false;
  validarCheckOut() {
    this.mostrarErrorCheckOut = !this.formData.checkOut; // Si this.formData.checkOut está vacío, mostrarErrorCheckOut será true
    return;
  }
  
  mostrarErrorTipoHabitacion=false;
  validarTipoHabitacion() {
    this.mostrarErrorTipoHabitacion = !this.formData.tipo_habitacion; // Si this.formData.tipo_habitacion está vacío, mostrarErrorTipoHabitacion será true
    return;
  }

  mostrarErrorCantidadHabitacion=false;
  validarCantidadHabitacion() {
    this.mostrarErrorCantidadHabitacion = !this.formData.cantidad_habitacion; // Si this.formData.cantidad_habitacion está vacío, mostrarErrorCantidadHabitacion será true
    return;
  }

  validarRequerido(){
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
  validarFechaEntrada(event: Event){
    //const fechaActualCR = moment().tz('America/Costa_Rica').format('YYYY-MM-DD');
    const fechaActual = new Date().toISOString().split('T')[0];
    const fechaLlegada = new Date(this.formData.checkIn); // Obtener la fecha de llegada a las 00:00:00
   
    // Validar que la fecha de llegada sea posterior o igual al día actual
    if (fechaLlegada.toISOString().slice(0, 10) === fechaActual) {//si es el día de hoy
      this.mostrarConfirmacion = true;
      this.mensajeConfirmacion='Puedes hacer el check in a partir de las 3 pm.';
      this.mostrarError=false;
      this.checkOutDesactivado=false;
      this.checkInDesactivado=true;
    } else if (fechaLlegada.toISOString().slice(0, 10) < fechaActual) {//si elije un día pasado
      this.mostrarError=true;
      this.mostrarConfirmacion = false;
      this.mensajeError = 'La fecha de llegada debe ser el día de '+fechaActual+' o posterior';
      
    }else{//si elije un día futuro
      this.mostrarError=false;
      this.mostrarConfirmacion = true;
      this.mensajeConfirmacion='Puedes hacer el check in el '+fechaLlegada.toISOString().slice(0, 10)+' a partir de las 3 pm.';
      this.checkOutDesactivado=false;
      this.checkInDesactivado=true;
    }
    this.validarCheckIn();
  }

  mensajeError_ = '';
  mostrarError_ = false;
  mostrarConfirmacion_ = false;
  mensajeConfirmacion_ = '';
//validar fecha de salida
validarFechaDeSalida(event: Event){
  const fechaLlegada = new Date(this.formData.checkIn); // Obtener la fecha de llegada a las 00:00:00
  const fechaSalida = new Date(this.formData.checkOut); // Obtener la fecha de salida a las 00:00:00

  // Validar que la fecha de salida sea posterior a la fecha de llegada
  if(!this.formData.checkIn){
    this.mensajeError_='Primero elije la fecha de entrada';
    this.mostrarError_=true;
    this.mostrarConfirmacion_=false;
  }else if (fechaSalida <= fechaLlegada) {
    this.mensajeError_='La fecha de salida debe ser posterior a la fecha de llegada.';
    this.mostrarError_=true;
    this.mostrarConfirmacion_=false;
  }else{
    this.mensajeConfirmacion_='El día ' + fechaSalida.toISOString().slice(0, 10) + ' a las 11 am debes hacer la salida del hotel';
    this.mostrarError_=false;//no hay error
    this.mostrarConfirmacion_=true;//se confirma la hora recivido
    this.checkOutDesactivado = true;//se desactiva el campo check out
    this.cantidad_habitacionDesactivado=false;//se activa cantidad
    this.tipo_habitacionDesactivado=false;//se activa el tipo de habtacion
  }
  this.validarCheckOut();
}

////////////////////////////////////////funciones
totalReserva: number=0;
detelleReserva='';
calcular(){
  this.totalReserva=0;
  this.tiposDeHabitacionElegidos.forEach(tipoActual=>{
    this.totalReserva += (tipoActual.precio * this.cantidadNoches)*tipoActual.cantidad;
  });
}

cantidadNoches =0;
contarNoches(){
  if (this.formData.checkIn && this.formData.checkOut) {
    const fechaInicioParsed = parseISO(this.formData.checkIn); // Parsea la fecha de inicio
    const fechaFinParsed = parseISO(this.formData.checkOut); // Parsea la fecha de fin
    this.cantidadNoches = differenceInDays(fechaFinParsed, fechaInicioParsed); // Calcula la diferencia en días
  } else {
    this.cantidadNoches = 0; // Reinicia la cantidad de noches si las fechas no están completas
  }
}


  /////////////////////////////////////acciones de los botones
  agregarHabitacion(){

    this.validarRequerido();

    if(
        this.mostrarErrorCantidadHabitacion
        ||this.mostrarErrorTipoHabitacion
        ||this.mostrarErrorCheckIn
        ||this.mostrarErrorCheckOut
        ||this.mostrarError
        ||this.mostrarError_
      )
    {
      return;
    }
    


    this.tiposDeHabitacionElegidos = this.tiposDeHabitacionElegidos.filter(item => item.id != this.formData.tipo_habitacion);
    
    this.tiposDeHabitacion.forEach(tipoActual=>{
      
      if(tipoActual.id==this.formData.tipo_habitacion){
        tipoActual.cantidad=this.formData.cantidad_habitacion;
        this.tiposDeHabitacionElegidos.push(tipoActual);
      }
      
    });
    this.contarNoches();
    this.calcular();
    this.tabla_contenidoVisible=true;
  }


  quitarHabitacion(indice : number){
    //obteber el valor del input oculto en la tabla dinamica con el carrito de habitaciones
    const valorInputHidden = (<HTMLInputElement>document.getElementById(indice+'')).value;
    //eliminar el tipo de habitacion con el id recibido del carrito de compras
    this.tiposDeHabitacionElegidos = this.tiposDeHabitacionElegidos.filter(item => item.id !== parseInt(valorInputHidden));
    this.contarNoches();
    this.calcular();
    if(this.tiposDeHabitacionElegidos.length==0){
      this.tabla_contenidoVisible=false;
    }
  }

  habitaciones : Habitacion[]=[];
  reservar(){
    this.habitaciones = [];
    for (const tipo of this.tiposDeHabitacionElegidos) {
      for (let i = 1; i <= tipo.cantidad; i++) {
        const habitacion: Habitacion = {
          id: this.habitaciones.length + 1, // ID dinámico
          estado: 'Disponible',
          numero: this.habitaciones.length + 101, // Número dinámico
          tipo: tipo,
          activo : true
        };
        this.habitaciones.push(habitacion);
      }
    }
    
    let reserva= {
      id : 0,
      cliente : "",
      cedula : "",
      email : "",
      total : this.totalReserva,
      checkIn : this.formData.checkIn,
      checkOut : this.formData.checkOut,
      habitaciones: this.habitaciones
    }
    
    this.router.navigate(['disponible'], { queryParams: { reserva: JSON.stringify(reserva) } });
  }

  reiniciarFormulario(){
    this.formData.checkIn='';
    this.formData.checkOut='';
    this.formData.cantidad_habitacion='';
    this.formData.tipo='';
    this.cantidadNoches=0;
     //mostrar campos para entradas de forma ordenada
     this.checkInDesactivado = false;
     this.checkOutDesactivado = true;
     this.cantidad_habitacionDesactivado =true;
     this.tipo_habitacionDesactivado=true;
     this.tabla_contenidoVisible=false;
  }

}
