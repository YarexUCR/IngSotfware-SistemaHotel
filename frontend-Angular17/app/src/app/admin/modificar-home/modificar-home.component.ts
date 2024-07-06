import { Component, } from '@angular/core';
import { FooterComponent } from "../../footer/footer.component";
import { Router } from '@angular/router';;
import { EditorModule } from '@tinymce/tinymce-angular';
import { FormsModule } from '@angular/forms';
import { HotelService } from '../../api/hotel.service';
import { MatDividerModule } from '@angular/material/divider';
import { Hotel } from '../../dominio/Hotel';
import { CommonModule, JsonPipe } from '@angular/common';
import { ModalComponent } from '../../modal/modal.component';

interface Enlace {
  url: string
}

@Component({
  selector: 'app-modificar-home',
  standalone: true,
  imports: [
    MatDividerModule,
    FooterComponent,
    EditorModule,
    FormsModule,
    CommonModule,
    ModalComponent
  ],
  templateUrl: './modificar-home.component.html',
  styleUrl: './modificar-home.component.scss'
})
export class ModificarHomeComponent {
  token: string | null;//token de session
  contenido = '';
  hotel: Hotel | null = null;
  hotelTemporal : Hotel | null = null;
  nuevaImagen: File | null = null;
  enlace: Enlace | null = null;
  imagen : string | null = null;
  showModal: boolean = false;
  modalTitle!: string;
  modalMessage!: string;
  constructor(private router: Router, private service: HotelService) {
    //para resguardar ruta
    if (typeof localStorage !== 'undefined') {
      this.token = localStorage.getItem('token');
    } else {
      this.token = null;
    }


  }


  prueba: string | null=null;
  ngOnInit() {
    //verificar autenticacion
    if (this.token == null) {
      this.router.navigate(['/login']);
    }

    this.service.ObtenerHome(1).subscribe(
      data => {
        this.hotel = data;
        this.contenido = this.hotel.home;
      },
      error => {
        //alert('Ha ocurrido un error con el servicio');
        this.modalTitle = 'Mensaje';
        this.modalMessage = 'Ha ocurrido un error con el servicio';
        this.showModal = true;
      }
    );

    this.service.ObtenerImagenHome(1).subscribe(
      data => {
        this.hotelTemporal = data;
        if(this.hotelTemporal){
          if(this.hotel){
            this.hotel.imagen_Home =this.hotelTemporal.imagen_Home;
          }
        }   
      },
      error => {
        //alert('Ha ocurrido un error con el servicio');
        this.modalTitle = 'Mensaje';
        this.modalMessage = 'Ha ocurrido un error con el servicio';
        this.showModal = true;
      }
    );

  }

  validarImagen(archivo: File): boolean {
    const tiposValidos = ['image/jpeg', 'image/png', 'image/gif'];
      
      if (!tiposValidos.includes(archivo.type)) {
        //alert('Debes seleccionar una imagen con formarto JPEG, PNG O GIF');
        this.modalTitle = 'Mensaje';
        this.modalMessage = 'Por favor ingresa una imagen de tipo JPEG, PNG O GIF';
        this.showModal = true;
        return false;
      }else{
        return true;
      }
  }


  archivoSeleccionado(event: any) {
    const imagen = event.target.files[0];
    if (imagen) {
      if(this.validarImagen(imagen)){
        this.nuevaImagen = imagen;
      }
    }
  }

  cancelar() {
    //const confirmacion = window.confirm('¿Desea desechar los cambios?');
    //if (confirmacion) {
    //  this.router.navigate(['admin/modificarPaginas']);
    //}
        this.modalTitle = 'Mensaje';
        this.modalMessage = 'Has descartado los cambios'; 
        this.showModal = true; 
        this.router.navigate(['admin/modificarPaginas']);
  }

  
  cambiarImagenHome() {
    if (this.nuevaImagen) {
      
      this.service.CambiarImagenHome(this.nuevaImagen).subscribe(
        data => {
          if (data) {
            this.enlace = data;
            //alert('Home ha sido actualizado la imagen se encuentra '+ this.enlace?.url);
            this.modalTitle = 'Mensaje';
            this.modalMessage = 'Home ha sido actualizado la imagen se encuentra '+ this.enlace?.url;
            this.showModal = true;
            this.router.navigate(['admin/modificarPaginas']);
          } else {
            //alert('Ha ocurrido un error al actualizar la imagen de home');
            this.modalTitle = 'Mensaje';
            this.modalMessage = 'Ha ocurrido un error al actualizar la imagen de home';
            this.showModal = true;
          }
        },
        error => {
          //alert('Ha ocurrido un erro con el servicio');
          this.modalTitle = 'Mensaje';
          this.modalMessage = 'Ha ocurrido un error con el servicio';
          this.showModal = true;
        }

      );
    } else {
      //alert('Por favor ingresa una imagen de tipo JPEG, PNG O GIF');
      this.modalTitle = 'Mensaje';
      this.modalMessage = 'Por favor ingresa una imagen de tipo JPEG, PNG O GIF';
      this.showModal = true;
    }
  }

  ActualizarHome() {
    if (!this.contenido) {
      //alert('Debe ingresar algún valor para el texto de la pagina home');
      this.modalTitle = 'Mensaje';
      this.modalMessage = 'Debe ingresar algún valor para el texto de la pagina home';
      this.showModal = true;
      return;
    }
    if (this.hotel) {
      this.hotel.home = this.contenido;
      this.service.ActualizarHome(this.hotel).subscribe(

        data => {
          if (data) {
            //alert('Home ha sido actualizado');
            this.modalTitle = 'Mensaje';
            this.modalMessage = 'Home ha sido actualizado';
            this.showModal = true;
            this.router.navigate(['admin/modificarPaginas']);
          } else {
            //alert('Ha ocurrido un error al actualizar home');
            this.modalTitle = 'Mensaje';
            this.modalMessage = 'Ha ocurrido un error al actualizar home';
            this.showModal = true;
          }
        },
        error => {
          //alert('Ha ocurrido un erro con el servicio');
          this.modalTitle = 'Mensaje';
          this.modalMessage = 'Ha ocurrido un error con el servicio';
          this.showModal = true;
        }
      );
    }
  }

  closeModal() {
    this.showModal = false; // Cierra el modal cuando se emite el evento desde el componente hijo
  }

}
