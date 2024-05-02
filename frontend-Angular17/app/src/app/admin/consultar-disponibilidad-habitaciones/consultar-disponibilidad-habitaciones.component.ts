import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../../footer/footer.component";
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TipoHabitacion } from '../../dominio/TipoHabitacion';
import { FormsModule, NgForm, Validators } from '@angular/forms';
import { TipoHabitacionService } from '../../api/tipo.habitacion.service';
import { Habitacion } from '../../dominio/Habitacion';

import { differenceInDays, parseISO } from 'date-fns';

interface ResultadoConsulta {
  numeroHabitacion: number,
  tipo: string,
  costo: number
}



@Component({
  selector: 'app-consultar-disponibilidad-habitaciones',
  standalone: true,
  templateUrl: './consultar-disponibilidad-habitaciones.component.html',
  styleUrl: './consultar-disponibilidad-habitaciones.component.scss',
  imports: [FooterComponent, CommonModule, FormsModule]
})
export class ConsultarDisponibilidadHabitacionesComponent implements OnInit {
  token: string | null;//token de session
  checkOutDesactivado: boolean;
  checkInDesactivado: boolean;
  tipo_habitacionDesactivado: boolean;
  formData: any = [];//acceso a los input del formulario
  mensajeError = '';
  mostrarError = false;
  mostrarConfirmacion = false;
  mensajeConfirmacion = '';
  tiposDeHabitacion: TipoHabitacion[] = [];//todos los tipos de habitaciones disponibles
  habitacionesDisponibles: Habitacion[] = [];

  constructor(private router: Router, private service: TipoHabitacionService) {

    //para resguardar ruta
    if (typeof localStorage !== 'undefined') {
      this.token = localStorage.getItem('token');
    } else {
      this.token = null;
    }
    this.checkInDesactivado = false;
    this.checkOutDesactivado = true;
    this.tipo_habitacionDesactivado = true;

  }

  ngOnInit(): void {

    //verificar autenticacion
    if (this.token == null) {
      this.router.navigate(['/login']);
    }

    this.service.obtenerTiposHabitaciones().subscribe(data => {
      this.tiposDeHabitacion = data;
    });
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
  validarRequerido() {
    this.validarCheckIn();
    this.validarCheckOut();
    this.validarTipoHabitacion();
  }

  //validar que la reserva sea del día actual o posterior, que no sea un día pasado
  validarFechaEntrada(event: Event) {
    //const fechaActualCR = moment().tz('America/Costa_Rica').format('YYYY-MM-DD');
    const fechaActual = new Date().toISOString().split('T')[0];
    const fechaLlegada = new Date(this.formData.checkIn); // Obtener la fecha de llegada a las 00:00:00

    // Validar que la fecha de llegada sea posterior o igual al día actual
    if (fechaLlegada.toISOString().slice(0, 10) === fechaActual) {//si es el día de hoy
      this.mostrarConfirmacion = true;
      this.mensajeConfirmacion = 'El check in es a partir de las 3 pm.';
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
      this.mensajeConfirmacion = 'El check in para el día ' + fechaLlegada.toISOString().slice(0, 10) + ' es a partir de las 3 pm.';
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
      this.mensajeConfirmacion_ = 'El día ' + fechaSalida.toISOString().slice(0, 10) + ' a las 11 am se hace check out';
      this.mostrarError_ = false;//no hay error
      this.mostrarConfirmacion_ = true;//se confirma la hora recivido
      this.checkOutDesactivado = true;//se desactiva el campo check out
      this.tipo_habitacionDesactivado = false;//se activa el tipo de habtacion
    }
    this.validarCheckOut();
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

  consultar() {
    this.validarRequerido();
    if (
      this.mostrarErrorTipoHabitacion
      || this.mostrarErrorCheckIn
      || this.mostrarErrorCheckOut
      || this.mostrarError
      || this.mostrarError_
    ) {
      return;
    }


    this.service.obtenerHabitacionesDisponibles(this.formData.checkIn, this.formData.checkOut, this.formData.tipo_habitacion)
      .subscribe((data) => {
        this.habitacionesDisponibles = data;
        this.contarNoches();
        alert('Cantidad de días: ' + this.cantidadNoches);
        this.habitacionesDisponibles.forEach(habitacion => {
          alert(habitacion.numero);
        });

      });
  }
}
