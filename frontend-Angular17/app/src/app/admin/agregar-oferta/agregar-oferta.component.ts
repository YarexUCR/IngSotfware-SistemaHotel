import { Component, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';

import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, NgForm, Validators} from '@angular/forms';
import { FooterComponent } from "../../footer/footer.component";
import { CommonModule } from '@angular/common';
import { differenceInDays, parseISO } from 'date-fns';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ThemePalette } from '@angular/material/core';

interface TipoHabitacion {
  id: number;
  nombre: string;
  checked: boolean;
}

@Component({
  selector: 'app-agregar-oferta',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,FooterComponent,
    MatFormFieldModule,MatCheckboxModule,],
  templateUrl: './agregar-oferta.component.html',
  styleUrl: './agregar-oferta.component.scss'
})




export class AgregarOfertaComponent implements OnInit{
  token: string | null;//token de session
  formData: any = [];
  checkOutDesactivado : boolean;
  checkInDesactivado : boolean;
  cantidad_habitacionDesactivado : boolean;
  tiposDeHabitaciones: TipoHabitacion[] = [
    { id: 1, nombre: 'Individual', checked: false },
    { id: 2, nombre: 'Doble', checked: false },
    { id: 3, nombre: 'Suite', checked: false }
  ];
  

  constructor( private router: Router,private routerA: ActivatedRoute) {
    //mostrar campos para entradas de forma ordenada
    this.checkInDesactivado = false;
    this.checkOutDesactivado = false;
    this.cantidad_habitacionDesactivado =true;
 
    //para resguardar ruta
    if (typeof localStorage !== 'undefined') {
      this.token = localStorage.getItem('token');
    } else {
      this.token = null;
    }
   
    
  }

  ngOnInit(): void{
    
    //verificar autenticacion
    if (this.token == null) {
      this.router.navigate(['/login']);
    }

  }
  mensajeError = '';
  mostrarError = false;
  mostrarConfirmacion = false;
  mensajeConfirmacion = '';
  agregarOferta(){

   
  }
  mensajeError_ = '';
  mostrarError_ = false;
  mostrarConfirmacion_ = false;
  mensajeConfirmacion_ = '';
  validarFechaDeSalida(event: Event){
    const fechaLlegada = new Date(this.formData.checkIn); // Obtener la fecha de llegada a las 00:00:00
    const fechaSalida = new Date(this.formData.checkOut); // Obtener la fecha de salida a las 00:00:00
  
    // Validar que la fecha de salida sea posterior a la fecha de llegada
    if(!this.formData.checkIn){
      this.mensajeError_='Fecha valida';
      this.mostrarError_=true;
      this.mostrarConfirmacion_=false;
      this.checkOutDesactivado = false;
    }else if (fechaSalida <= fechaLlegada) {
      this.mensajeError_='Fecha no valida';
      this.mostrarError_=true;
      this.mostrarConfirmacion_=false;
    }else{
      this.mensajeConfirmacion_='Fecha valida';
      this.mostrarError_=false;//no hay error
      this.mostrarConfirmacion_=true;//se confirma la hora recivido
      this.checkOutDesactivado = false;//se desactiva el campo check out
    }
    this.validarCheckOut();
  }

  validarFechaEntrada(event: Event){
    //const fechaActualCR = moment().tz('America/Costa_Rica').format('YYYY-MM-DD');
    const fechaActual = new Date().toISOString().split('T')[0];
    const fechaLlegada = new Date(this.formData.checkIn); // Obtener la fecha de llegada a las 00:00:00
   
    // Validar que la fecha de llegada sea posterior o igual al día actual
    if (fechaLlegada.toISOString().slice(0, 10) === fechaActual) {//si es el día de hoy
      this.mostrarConfirmacion = true;
      this.mensajeConfirmacion='Fecha valida';
      this.mostrarError=false;
      this.checkOutDesactivado=false;
      this.checkInDesactivado=false;
    } else if (fechaLlegada.toISOString().slice(0, 10) < fechaActual) {//si elije un día pasado
      this.mostrarError=true;
      this.mostrarConfirmacion = false;
      this.mensajeError = 'Fecha no válida, elige un día futuro.';
      
    }else{//si elije un día futuro
      this.mostrarError=false;
      this.mostrarConfirmacion = true;
      this.mensajeConfirmacion='Fedcha valida';
      this.checkOutDesactivado=false;
      this.checkInDesactivado=true;
    }
 
    this.validarCheckIn();
  }

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

  reiniciarFormulario(){
    this.formData.checkIn='';
    this.formData.checkOut='';
    this.formData.cantidad_habitacion='';
    this.formData.tipo='';
 
     //mostrar campos para entradas de forma ordenada
     this.checkInDesactivado = false;
     this.checkOutDesactivado = false;
     this.cantidad_habitacionDesactivado =true;

  }


}