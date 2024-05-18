import { Component, Inject } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
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
import { Observable, catchError, of, tap } from 'rxjs';

export interface DialogData {
  id: number;
}
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
    descuento: 0,
    descripcion: '',
    // Otros campos necesarios
  };
  oferta: Oferta | undefined;

  tiposDeHabitaciones: TipoHabitacion[] = [];
  TipoHabitacion: (TipoHabitacion & { check: boolean })[] = [];
  tiposSeleccionados: TipoHabitacion[] = [];
  tipoHabOfertaSer: TipoHabitacion[] = [];
  mensajeError = '';
  mostrarError = false;
  mostrarConfirmacion = false;
  mensajeConfirmacion = '';

  mensajeError_ = '';
  mostrarError_ = false;
  mostrarConfirmacion_ = false;
  mensajeConfirmacion_ = '';


  updateMontoDescuento(event: any) {
    this.formData.descuento = event.target.value;
  }
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<Oferta>,
    private serv_TipoHabitacion_: TipoHabitacionService,
    private changeDetectorRef: ChangeDetectorRef,
    private serv_Oferta_: OfertaService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }
  ngOnInit(): void {
    this.obtenerOferta(this.data.id);


  }

 

  obtenerOferta(id: number): void {
    this.serv_Oferta_.getOferta(id).subscribe(
      (oferta: Oferta) => {
        this.formData.id = oferta.id;
        this.formData.checkIn = oferta.inicio;
        this.formData.checkOut = oferta.fin;
        this.formData.descuento =  parseInt(oferta.descuento.toString());
        this.formData.descripcion = oferta.nombre;
        this.tipoHabOfertaSer = oferta.tipoHabitacions;
        this.obtenerTipoHabitacion();
       
    
      },
      (error) => {
        console.error('Error al obtener la oferta:', error);
      }
    );
  }


  obtenerTipoHabitacion(): void {
    this.serv_TipoHabitacion_.obtenerTiposHabitaciones().subscribe(
      (data: TipoHabitacion[]) => {
       
        this.tiposDeHabitaciones = data.map(tipo => ({ ...tipo, check: false }));
        // Recorrer cada tipo de habitación en this.tiposDeHabitaciones
        this.tiposDeHabitaciones.forEach(tipo => {
          // Verificar si el tipo de habitación existe en this.tipoHabOfertaSer
          console.log(this.tipoHabOfertaSer);
          const existe = this.tipoHabOfertaSer.some(tipoOferta => tipoOferta.id === tipo.id);
          // Si el tipo de habitación existe en this.tipoHabOfertaSer, establecer la propiedad 'check' en true
          if (existe) {
            tipo.check = true;
          }
        });

        this.changeDetectorRef.detectChanges(); // Forzar detección de cambios
      },
      (error: any) => {
        console.error(error);
        // Maneja el error aquí
      }
    );
  }


  obtenerTiposSeleccionados(): void {
    this.tiposSeleccionados = this.tiposDeHabitaciones
        .filter((tipo: any) => tipo.check); // Filtra solo los tipos de habitaciones que estén seleccionados
}



  actualizarOferta(): void {
 
    this.obtenerTiposSeleccionados();

    if (this.tiposSeleccionados.length === 0) {
   
      return;
    } else {
      this.oferta = {
        id: this.formData.id,
        inicio: this.formData.checkIn,
        fin: this.formData.checkOut,
        descuento: this.formData.descuento,
        nombre: this.formData.descripcion,
        tipoHabitacions: this.tiposSeleccionados
      };

      this.serv_Oferta_.actualizarOferta(this.data.id,this.oferta).subscribe(
        (data) => {
          this.dialogRef.close();
        },
        (error) => {
          console.error('Error al actualizar la oferta:', error);
        }
      );
      this.changeDetectorRef.detectChanges(); // Forzar detección de cambios
    }


    
    //fin de actualizarOferta


  }

  onNoClick(): void {
    this.dialogRef.close();
  }

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
}/// fin de la clase
