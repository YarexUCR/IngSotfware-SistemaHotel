import { Component, } from '@angular/core';
import { FooterComponent } from "../../footer/footer.component";
import { Router } from '@angular/router';;
import { EditorModule } from '@tinymce/tinymce-angular';
import { FormsModule } from '@angular/forms';
import { HotelService } from '../../api/hotel.service';
import { Hotel } from '../../dominio/Hotel';

@Component({
  selector: 'app-modificar-sobre-nosotros',
  standalone: true,
  imports: [
    FooterComponent,
      EditorModule,
      FormsModule
  ],
  templateUrl: './modificar-sobre-nosotros.component.html',
  styleUrl: './modificar-sobre-nosotros.component.scss'
})
export class ModificarSobreNosotrosComponent {
  token: string | null;//token de session
  contenido = '';
  hotel: Hotel | null = null;
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
        alert('Ha ocurrido un erro con el servicio');
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
      alert('Debe ingresar algún valor para el texto de la pagina Sobre Nosotros');
      return;
    }
    if(this.hotel){
      this.hotel.sobre_nosotros= this.contenido;
      this.service.ActualizarSobreNosotros(this.hotel).subscribe(

        data => {
          if (data) {
            alert('Sobre Nosotros ha sido actualizado');
            this.router.navigate(['admin/modificarPaginas']);
          } else {
            alert('Ha ocurrido un error al actualizar Sobre Nosotros');
          }
        },
        error => {
          alert('Ha ocurrido un erro con el servicio');
        }
      );
    }
  }
}
