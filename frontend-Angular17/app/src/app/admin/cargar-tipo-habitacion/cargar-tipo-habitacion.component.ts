import { Component } from '@angular/core';
import { FooterComponent } from "../../footer/footer.component";
import { ActivatedRoute, Router } from '@angular/router';
import { TipoHabitacionService } from '../../api/tipo.habitacion.service';
import { TipoHabitacion } from '../../dominio/TipoHabitacion';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';

interface Enlace {
  url: string
}

@Component({
  selector: 'app-cargar-tipo-habitacion',
  standalone: true,
  templateUrl: './cargar-tipo-habitacion.component.html',
  styleUrl: './cargar-tipo-habitacion.component.scss',
  imports: [CommonModule, FormsModule, EditorModule, MatDividerModule, FooterComponent]
})

export class CargarTipoHabitacionComponent {
  token: string | null;//token de session
  tipo: TipoHabitacion | null = null;
  rutaImagen : string | null = null;
  precio: number | null = null;
  descripcion: string | null = null;
  imagen: string | null = null;
  nuevaImagen: File | null = null;
  enlace: Enlace | null = null;

  constructor(private route: ActivatedRoute, private router: Router, private servicio: TipoHabitacionService) {
    //para resguardar ruta
    if (typeof localStorage !== 'undefined') {
      this.token = localStorage.getItem('token');
    } else {
      this.token = null;
    }
   
  }

  ngOnInit() {
    //verificar autenticacion
    if (this.token == null) {
      this.router.navigate(['/login']);
    }

    this.route.queryParams.subscribe(params => {
      this.tipo = params['tipo'] ? JSON.parse(params['tipo']) : null; // Recibe la reserva como parámetro
      if (this.tipo) {
        this.precio = this.tipo?.precio;
        this.descripcion = this.tipo?.descripcion
        this.rutaImagen = this.tipo.imagen;
      }
    });
  }

  cancelar() {
    this.router.navigate(['/admin/administrarHabitaciones']);
  }

  enviar(_tipo: TipoHabitacion) {
    this.servicio.actualizarTipoHabitacion(_tipo).subscribe(
      data => {
        if (data) {
          if (this.tipo) {
            alert('Actualizacion completa');
            this.router.navigate(['/admin/administrarHabitaciones']);
          }

        } else {
          alert('Ha ocurrido un error');
        }
      },
      error => {
        alert('Ha ocurrido un error con el servicio');
      }
    );
  }

  actualizar() {
    if (!this.precio || !this.descripcion) {
      alert('Recuerda que todos los campos son obligatorios');
      return;
    }
    if (this.precio <= 0) {
      alert('El precio debe ser mayor a 0');
      return;
    }
    if (this.tipo) {
      this.tipo.precio = this.precio;
      this.tipo.descripcion = this.descripcion;
      this.enviar(this.tipo);
    }
  }

  validarImagen(archivo: File): boolean {
    const tiposValidos = ['image/jpeg', 'image/png', 'image/gif'];

    if (!tiposValidos.includes(archivo.type)) {
      alert('Debes seleccionar una imagen con formarto JPEG, PNG O GIF');
      return false;
    } else {
      return true;
    }
  }

  cambiarImagen() {
    if (this.nuevaImagen) {

      this.servicio.CambiarImagen(this.nuevaImagen).subscribe(
        data => {
          if (data) {
            this.enlace = data;
            if (this.tipo && this.enlace) {

              this.tipo.imagen = this.enlace?.url;
              this.enviar(this.tipo);
            }

          } else {
            alert('Ha ocurrido un error al actualizar la imagen');
          }
        },
        error => {
          alert('Ha ocurrido un erro con el servicio');
        }

      );
    } else {
      alert('Por favor ingresa una imagen de tipo JPEG, PNG O GIF');
    }
  }

  archivoSeleccionado(event: any) {
    const imagen = event.target.files[0];
    if (imagen) {
      if (this.validarImagen(imagen)) {
        this.nuevaImagen = imagen;
      }
    }
  }

}
