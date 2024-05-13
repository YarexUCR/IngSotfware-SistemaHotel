import { Component } from '@angular/core';
import{CommonModule} from '@angular/common';
import { TipoHabitacion } from '../../dominio/TipoHabitacion';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog'
import { Oferta } from '../../dominio/Oferta';
import { FormsModule, NgForm, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TipoHabitacionService } from '../../api/tipo.habitacion.service';
import { ChangeDetectorRef } from '@angular/core';
import { OfertaService } from '../../api/ofertas.service';
@Component({
  selector: 'app-actalizar-oferta',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    FormsModule,
    MatFormFieldModule,
    CommonModule],
  templateUrl: './actalizar-oferta.component.html',
  styleUrl: './actalizar-oferta.component.scss'
})
export class ActalizarOfertaComponent {
  formData: any = {
    id: 0,
    checkIn: '',
    checkOut: '',
    montoDescuento: 0,
    nombreOferta: '',
    // Otros campos necesarios
  };
  tiposDeHabitaciones: TipoHabitacion[] = [];
  TipoHabitacion: (TipoHabitacion & { check: boolean })[] = [];
  tiposSeleccionados:TipoHabitacion [] = [];

  mensajeError = '';
  mostrarError = false;
  mostrarConfirmacion = false;
  mensajeConfirmacion = '';

  mensajeError_ = '';
  mostrarError_ = false;
  mostrarConfirmacion_ = false;
  mensajeConfirmacion_ = '';
  updateMontoDescuento(event: any) {
    this.formData.montoDescuento = event.target.value;
  }
  constructor(  public dialog: MatDialog,
    public dialogRef: MatDialogRef<Oferta>,
    private serv_TipoHabitacion_: TipoHabitacionService,
    private changeDetectorRef: ChangeDetectorRef,
    private serv_Oferta_: OfertaService
  ) { this.obtenerTipoHabitacion();}
  getOferta(): void {
   this.serv_Oferta_.obtenerOferta().subscribe(
    (data: any) => {
      console.log('Data recibida:', JSON.stringify(data));
      // Haz algo con la oferta recibida
    },
    (error: any) => {
      // Maneja el error aquí si es necesario
    }
  );

  }
  
  obtenerTipoHabitacion(): void  { 
    this.serv_TipoHabitacion_.obtenerTiposHabitaciones().subscribe(
      (data: TipoHabitacion[]) => {
        this.tiposDeHabitaciones = data.map(tipo => ({ ...tipo, check: false }));

        this.changeDetectorRef.detectChanges(); // Forzar detección de cambios
      },
      (error: any) => {
        console.error(error);
        // Maneja el error aquí
      }
    );
  }
  
  actualizarOferta(): void {
    alert('actualizarOferta');
    this.dialogRef.close();
  }//fin de actualizarOferta


  onNoClick(): void {
    this.dialogRef.close();
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
}/// fin de la clase
