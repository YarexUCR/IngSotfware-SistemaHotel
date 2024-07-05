import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Temporada } from '../../dominio/Temporada';
import { TemporadaService } from '../../api/temporada.services';
import { MatDatepickerModule } from '@angular/material/datepicker';

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
import { } from '../../api/ofertas.service';
import { Observable, catchError, of, tap } from 'rxjs';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-temporada-update',
  standalone: true,
  imports: [MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    FormsModule,
    MatFormFieldModule,
    CommonModule,
    MatDatepickerModule],
    providers: [DatePipe],
  templateUrl: './temporada-update.component.html',
  styleUrl: './temporada-update.component.scss'
  
})
export class TemporadaUpdateComponent implements OnInit {
  onNoClick(): void {
    this.dialogRef.close();
  }

  
  temporada: Temporada | undefined;
  mensajeError = '';
  mostrarError = false;
  mostrarConfirmacion = false;
  mensajeConfirmacion = '';

  mensajeError_ = '';
  mostrarError_ = false;
  mostrarConfirmacion_ = false;
  mensajeConfirmacion_ = '';
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<Oferta>,
    private serv_TipoHabitacion_: TipoHabitacionService,
    private changeDetectorRef: ChangeDetectorRef,
    private TemporadaService: TemporadaService,
    @Inject(MAT_DIALOG_DATA) public data: { temporada: Temporada }
    ,private datePipe: DatePipe
  ) { console.log(); }
  ngOnInit(): void {
    this.cargarDatos();
  }

  formData: any = {
    iD_Temporada: 0,
    fechaInicio: this.datePipe.transform(new Date(), 'yyyy-MM-dd'), // Mantener como objeto Date
    fechaFinal: this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
    descuento: 0,
    // Otros campos necesarios
  };
  cargarDatos() {
    this.formData.iD_Temporada = this.data.temporada.iD_Temporada;
    this.formData.fechaInicio = this.datePipe.transform(this.data.temporada.fechaInicio, 'yyyy-MM-dd');
    this.formData.fechaFinal = this.datePipe.transform(this.data.temporada.fechaFinal, 'yyyy-MM-dd');
    
    this.formData.descuento = this.data.temporada.descuento;
  }



  updateMontoDescuento(event: any) {
    this.formData.descuento = event.target.value;
  }


  mostrarErrorCheckIn = false;
  validarCheckIn() {
    this.mostrarErrorCheckIn = !this.formData.fechaInicio; // Si this.formData.checkIn está vacío, mostrarErrorCheckIn será true
    return;
  }

  mostrarErrorCheckOut = false;
  validarCheckOut() {
    this.mostrarErrorCheckOut = !this.formData.fechaFinal; // Si this.formData.checkOut está vacío, mostrarErrorCheckOut será true
    return;
  }


  actualizartemporada() {

    
    if(this.formData.fechaInicio == '' || this.formData.fechaFinal == '') {
      this.mostrarError = true;
      this.mensajeError = 'Debe ingresar la fecha de inicio y la fecha final';
      this.mostrarConfirmacion = false;
      this.mensajeConfirmacion = '';
      return;
    }
    if(this.formData.fechaInicio > this.formData.fechaFinal) {
      this.mostrarError = true;
      this.mensajeError = 'La fecha de inicio no puede ser mayor a la fecha final';
      this.mostrarConfirmacion = false;
      this.mensajeConfirmacion = '';
      return;
    }

    const nuevatemporada: Temporada = {
      iD_Temporada: this.formData.iD_Temporada,
      fechaInicio: this.formData.fechaInicio,
      fechaFinal: this.formData.fechaFinal,
      descuento: this.formData.descuento,
    }





    this.TemporadaService.updateTemporada(this.formData.iD_Temporada, nuevatemporada).subscribe(
      (data: any) => {
        if (data) {
          this.mostrarConfirmacion = true;
          this.mensajeConfirmacion = 'Temporada actualizada correctamente';
          this.mostrarError = false;
          this.mensajeError = '';
          this.dialogRef.close();
        } else {
          this.mostrarError = true;
          this.mensajeError = data.message;
          this.mostrarConfirmacion = false;
          this.mensajeConfirmacion = '';
          console.log(data);
        }
      },
      (error: any) => {
        this.mostrarError = true;
        this.mensajeError = error.error.message;;
        this.mostrarConfirmacion = false;
        this.mensajeConfirmacion = '';
      }
    );
  }
}
