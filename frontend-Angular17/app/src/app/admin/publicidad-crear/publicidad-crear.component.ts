import { Component } from '@angular/core';
import { FooterComponent } from "../../footer/footer.component";
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Publicidad } from '../../dominio/Publicidada';

@Component({
  selector: 'app-publicidad-crear',
  standalone: true,
  imports: [FooterComponent,FormsModule],
  templateUrl: './publicidad-crear.component.html',
  styleUrl: './publicidad-crear.component.scss'
})
export class PublicidadCrearComponent {
  token: string | null;//token de session
  datosFormulario: any = [];//acceso a los input del formulario para reservar
  nuevaImagen: File | null = null;

  constructor(private router: Router) {
    
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
  }

  validarImagen(archivo: File): boolean {
    const tiposValidos = ['image/jpeg', 'image/png', 'image/gif'];
      
      if (!tiposValidos.includes(archivo.type)) {
        alert('Debes seleccionar una imagen con formarto JPEG, PNG O GIF');
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
        alert(this.nuevaImagen?.name+" ha sido seleccionada");
      }
    }
  }

  crearPublicidad(){
    if(this.datosFormulario.nombre && this.datosFormulario.enlace && this.nuevaImagen){
      alert(this.datosFormulario.nombre+" "+this.datosFormulario.enlace+" "+this.nuevaImagen.name);
    }else{
      alert("Todos los datos son requeridos");
    }
  }
}
