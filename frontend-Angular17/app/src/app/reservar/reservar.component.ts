import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, Validators} from '@angular/forms';
import { FooterComponent } from "../footer/footer.component";
import { CommonModule } from '@angular/common';


//obejto habitacion
interface Habitacion{
  tipo : string;
  cantidad: number;
  precio: number;
  personas: number;
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
        FooterComponent
    ]
})



export class ReservarComponent {

  formData: any = [];
  habitaciones : Habitacion[]=[];
 
  precio : number;
  personas: number;
  checkOutDesactivado : boolean;
  checkInDesactivado : boolean;

constructor(private routerA: ActivatedRoute, private router: Router){
    this.personas = 0;
    this.precio = 0;
    this.checkOutDesactivado = true;
    this.checkInDesactivado = false;

}

  ngOnInit():void{
    this.routerA.params.subscribe(parametros =>{console.log(parametros)});
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

  

  validarFechaEntrada(event: Event){
    //const fechaActualCR = moment().tz('America/Costa_Rica').format('YYYY-MM-DD');
    const fechaActual = new Date().toISOString().split('T')[0];
    const fechaLlegada = new Date(this.formData.checkIn); // Obtener la fecha de llegada a las 00:00:00
    alert(fechaActual);
    // Validar que la fecha de llegada sea posterior o igual al día actual
    if (fechaLlegada.toISOString().slice(0, 10) === fechaActual) {//si es el día de hoy
      this.mostrarConfirmacion = true;
      this.mensajeConfirmacion='Puedes hacer el check in el hoy a partir de las 3 pm.';
      this.mostrarError=false;
      this.checkOutDesactivado=false;
      this.checkInDesactivado=true;
    } else if (fechaLlegada.toISOString().slice(0, 10) < fechaActual) {//si elije un día pasado
      this.mostrarError=true;
      this.mostrarConfirmacion = false;
      this.mensajeError = 'La fecha de llegada debe ser el día de hoy o posterior. llegada '+ this.formData.checkIn+ ' actual ' +fechaActual;
      
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
    this.mostrarError_=false;
    this.mostrarConfirmacion_=true;
    this.checkOutDesactivado = true;
  }
  this.validarCheckOut();
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

    if(this.formData.tipo_habitacion==="Standart"){
      this.precio=1000*this.formData.cantidad_habitacion;
      this.personas = 4;
    }else if(this.formData.tipo_habitacion==="Junior"){
      this.precio=2000*this.formData.cantidad_habitacion;
      this.personas = 2;
    }else if(this.formData.tipo_habitacion==="Presidencial"){
      this.precio=3000*this.formData.cantidad_habitacion;
      this.personas = 8;
    }
    const nuevaHabitacion: Habitacion = {
      tipo: this.formData.tipo_habitacion,
      cantidad: this.formData.cantidad_habitacion,
      precio: this.precio,
      personas : this.personas*this.formData.cantidad_habitacion
    };
    
    this.habitaciones.push(nuevaHabitacion);
    this.formData.re
    this.precio = 0;
  }

  quitarHabitacion(){
    alert('Habitación eliminada.');
  }

  reservar(){
    alert('Reservar');
  }
}
