import { Component, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';

import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, NgForm, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { differenceInDays, parseISO } from 'date-fns';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ThemePalette } from '@angular/material/core';
import { Temporada } from '../../dominio/Temporada';
import { TipoHabitacion } from '../../dominio/TipoHabitacion';
import { ChangeDetectorRef } from '@angular/core';
import { Oferta } from '../../dominio/Oferta';
import { OfertaService } from '../../api/ofertas.service';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { TemporadaService } from '../../api/temporada.services';

@Component({
  selector: 'app-temporada-add',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,MatCheckboxModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,],
  templateUrl: './temporada-add.component.html',
  styleUrl: './temporada-add.component.scss'
})
export class TemporadaAddComponent implements OnInit{
  onNoClick(): void {
    this.dialogRef.close();
  }

  formData: any = {
    checkIn: '',
    checkOut: '',
    montoDescuento:  0,
    descripcion: '',
    // Otros campos necesarios
  };
  checkOutDesactivado : boolean | undefined;
  checkInDesactivado : boolean | undefined;
  cantidad_habitacionDesactivado : boolean | undefined;
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

constructor( private temporadaService: TemporadaService, private router: Router, private route: ActivatedRoute, private changeDetectorRefs: ChangeDetectorRef,public dialogRef: MatDialogRef<Oferta>,
) {
      //mostrar campos para entradas de forma ordenada
      this.checkInDesactivado = false;
      this.checkOutDesactivado = false;
      this.cantidad_habitacionDesactivado =true;
}
agregarTemporada() {
  if(this.formData.checkIn == '' || this.formData.checkOut == '') {
    this.mostrarError = true;
    this.mensajeError = 'Debe ingresar la fecha de inicio y la fecha final';
    this.mostrarConfirmacion = false;
    this.mensajeConfirmacion = '';
    return;
  }
  if(this.formData.checkIn > this.formData.checkOut) {
    this.mostrarError = true;
    this.mensajeError = 'La fecha de inicio no puede ser mayor a la fecha final';
    this.mostrarConfirmacion = false;
    this.mensajeConfirmacion = '';
    return;
  }




  const nuevatemporada: Temporada = {
    iD_Temporada: 0,
    fechaInicio: this.formData.checkIn,
    fechaFinal: this.formData.checkOut,
    descuento: this.formData.montoDescuento,
  }

  this.temporadaService.createTemporada(nuevatemporada).subscribe(
    (data:any) => {
    if(data) {
      this.mostrarConfirmacion = true;
      this.mensajeConfirmacion = 'Temporada agregada correctamente';
      this.mostrarError = false;
      this.mensajeError = ''; 
      this.dialogRef.close();
    }else {
      this.mostrarError = true;
      this.mensajeError = 'Error al agregar la temporada';
      this.mostrarConfirmacion = false;
      this.mensajeConfirmacion = '';
      console.log(data);
    } },
    (error: any) => {
      this.mostrarError = true;
      this.mensajeError = error.error.message;
      this.mostrarConfirmacion = false;
      this.mensajeConfirmacion = '';
      console.log(error);

    }
  );
}
  ngOnInit(): void {
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
  
}
