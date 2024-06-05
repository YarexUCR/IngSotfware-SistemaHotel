import { Component, } from '@angular/core';
import { FooterComponent } from "../../footer/footer.component";
import { Router } from '@angular/router';;
import { EditorModule } from '@tinymce/tinymce-angular';
import { FormsModule } from '@angular/forms';
import { HotelService } from '../../api/hotel.service';
import { Hotel } from '../../dominio/Hotel';

@Component({
  selector: 'app-modificar-como-llegar',
  standalone: true,
  templateUrl: './modificar-como-llegar.component.html',
  styleUrl: './modificar-como-llegar.component.scss',
  imports: [
    FooterComponent,
    EditorModule,
    FormsModule
  ]
})
export class ModificarComoLlegarComponent {
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
    this.service.ObtenerComoLlegar(1).subscribe(
      data => {
        this.hotel = data;
        this.contenido = this.hotel.como_Llegar;
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
      alert('Debe ingresar algún valor para el texto de la pagina ¿Como llegar?');
      return;
    }
    if(this.hotel){
      this.hotel.como_Llegar= this.contenido;
      this.service.ActualizarComoLlegar(this.hotel).subscribe(

        data => {
          if (data) {
            alert('¿Como llegar? ha sido actualizado');
            this.router.navigate(['admin/modificarPaginas']);
          } else {
            alert('Ha ocurrido un error al actualizar ¿Como llegar?');
          }
        },
        error => {
          alert('Ha ocurrido un erro con el servicio');
        }
      );
    }
  }
}
