import { Component, } from '@angular/core';
import { FooterComponent } from "../../footer/footer.component";
import { Router } from '@angular/router';;
import { EditorModule } from '@tinymce/tinymce-angular';
import { FormsModule } from '@angular/forms';
import { HotelService } from '../../api/hotel.service';
import { Hotel } from '../../dominio/Hotel';

@Component({
  selector: 'app-modificar-facilidades',
  standalone: true,
  imports: [
    FooterComponent,
      EditorModule,
      FormsModule
  ],
  templateUrl: './modificar-facilidades.component.html',
  styleUrl: './modificar-facilidades.component.scss'
})
export class ModificarFacilidadesComponent {
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
    this.service.ObtenerFacilidades(1).subscribe(
      data => {
        this.hotel = data;
        this.contenido = this.hotel.facilidades;
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
      alert('Debe ingresar algún valor para el texto de la pagina Facilidades');
      return;
    }
    if(this.hotel){
      this.hotel.facilidades= this.contenido;
      this.service.ActualizarFacilidades(this.hotel).subscribe(

        data => {
          if (data) {
            alert('Facilidades ha sido actualizado');
            this.router.navigate(['admin/modificarPaginas']);
          } else {
            alert('Ha ocurrido un error al actualizar Facilidades');
          }
        },
        error => {
          alert('Ha ocurrido un erro con el servicio');
        }
      );
    }
  }
}
