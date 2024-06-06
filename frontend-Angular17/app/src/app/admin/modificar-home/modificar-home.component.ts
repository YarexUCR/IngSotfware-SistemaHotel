import { Component, } from '@angular/core';
import { FooterComponent } from "../../footer/footer.component";
import { Router } from '@angular/router';;
import { EditorModule } from '@tinymce/tinymce-angular';
import { FormsModule } from '@angular/forms';
import { HotelService } from '../../api/hotel.service';
import { error } from 'console';
import { Hotel } from '../../dominio/Hotel';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modificar-home',
  standalone: true,
  imports: [
    FooterComponent,
    EditorModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './modificar-home.component.html',
  styleUrl: './modificar-home.component.scss'
})
export class ModificarHomeComponent {
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
    this.service.ObtenerHome(1).subscribe(
      data => {
        this.hotel = data;
        this.contenido = this.hotel.home;
      },
      error => {
        alert('Ha ocurrido un erro con el servicio');
      }
    );
  }

  nuevaImagen : File | null = null;
  archivoSeleccionado(event : any ){
    const imagen = event.target.files[0];
    if(imagen){
      this.nuevaImagen = imagen;
      alert(this.nuevaImagen?.name);
    }      
  }

  cancelar() {
    const confirmacion = window.confirm('¿Desea desechar los cambios?');
    if (confirmacion) {
      this.router.navigate(['admin/modificarPaginas']);
    }
  }

  ActualizarHome() {
    if (!this.contenido) {
      alert('Debe ingresar algún valor para el texto de la pagina home');
      return;
    }
    if(this.hotel){
      this.hotel.home= this.contenido;
      this.service.ActualizarHome(this.hotel).subscribe(

        data => {
          if (data) {
            alert('Home ha sido actualizado');
            this.router.navigate(['admin/modificarPaginas']);
          } else {
            alert('Ha ocurrido un error al actualizar home');
          }
        },
        error => {
          alert('Ha ocurrido un erro con el servicio');
        }
      );
    }
  }
}
