import { Component, } from '@angular/core';
import { FooterComponent } from "../../footer/footer.component";
import { Router } from '@angular/router';;
import { EditorModule } from '@tinymce/tinymce-angular';
import { FormsModule } from '@angular/forms';
import { HotelService } from '../../api/hotel.service';
import { Hotel } from '../../dominio/Hotel';
import { ModalComponent } from '../../modal/modal.component';

@Component({
  selector: 'app-modificar-sobre-nosotros',
  standalone: true,
  imports: [
    FooterComponent,
      EditorModule,
      FormsModule, 
      ModalComponent
  ],
  templateUrl: './modificar-sobre-nosotros.component.html',
  styleUrl: './modificar-sobre-nosotros.component.scss'
})
export class ModificarSobreNosotrosComponent {
  token: string | null;//token de session
  contenido = '';
  hotel: Hotel | null = null;
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
  ngOnInit() {
    //verificar autenticacion
    if (this.token == null) {
      this.router.navigate(['/login']);
    }
    this.service.ObtenerSobreNosotros(1).subscribe(
      data => {
        this.hotel = data;
        this.contenido = this.hotel.sobre_nosotros;
      },
      error => {
        //alert('Ha ocurrido un erro con el servicio');
        this.modalTitle = 'Mensaje';
        this.modalMessage = 'Ha ocurrido un error con el servicio';
        this.showModal = true;
      }
    );
  }

  cancelar() {
    const confirmacion = window.confirm('¿Desea desechar los cambios?');
    if (confirmacion) {
      this.router.navigate(['admin/modificarPaginas']);
    }
  }

  Actualizar() {
    if (!this.contenido) {
      //alert('Debe ingresar algún valor para el texto de la pagina Sobre Nosotros');
      this.modalTitle = 'Mensaje';
      this.modalMessage = 'Debe ingresar algún valor para el texto de la pagina Sobre Nosotros';
      this.showModal = true;
      return;
    }
    if(this.hotel){
      this.hotel.sobre_nosotros= this.contenido;
      this.service.ActualizarSobreNosotros(this.hotel).subscribe(

        data => {
          if (data) {
            //alert('Sobre Nosotros ha sido actualizado');
            this.modalTitle = 'Mensaje';
            this.modalMessage = 'Sobre Nosotros ha sido actualizado';
            this.showModal = true;
            this.router.navigate(['admin/modificarPaginas']);
          } else {
            //alert('Ha ocurrido un error al actualizar Sobre Nosotros');
            this.modalTitle = 'Mensaje';
            this.modalMessage = 'Ha ocurrido un error al actualizar Sobre Nosotros';
            this.showModal = true;
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
  }

  closeModal() {
    this.showModal = false; // Cierra el modal cuando se emite el evento desde el componente hijo
  }

}
