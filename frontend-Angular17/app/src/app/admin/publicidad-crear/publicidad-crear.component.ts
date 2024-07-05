import { Component } from '@angular/core';
import { FooterComponent } from "../../footer/footer.component";
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Publicidad } from '../../dominio/Publicidada';
import { PublicidadService } from '../../api/Publicidad.service';
import { error } from 'console';
interface Enlace {
  url: string
}
@Component({
  selector: 'app-publicidad-crear',
  standalone: true,
  imports: [FooterComponent,FormsModule],
  templateUrl: './publicidad-crear.component.html',
  styleUrl: './publicidad-crear.component.scss'
})
export class PublicidadCrearComponent {
  token: string | null;//token de session
  nuevaImagen: File | null = null;
  publicidad: Publicidad = {id : 0, nombre : "",enlace: "", imagen: "" };
  enlace: Enlace | null = null;


  constructor(private router: Router, private servicio : PublicidadService) {
    
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

  cargarImagen(){
    if(this.nuevaImagen){
      this.servicio.InsertarImagen(this.nuevaImagen).subscribe(
        data=>{
          this.enlace = data;
          if(this.enlace){
            this.publicidad.imagen =this.enlace?.url;
            this.cargarPublicidad();
          }else{
            "Intente de nuevo"
          }  
        },
        error =>{
          alert('error con el servicio');
        }
      );
    }
  }

  cargarPublicidad(){
    this.servicio.InsertarPublicidad(this.publicidad).subscribe(
      data=>{
        if(data){
          alert("La Publicidad se inserto correctamente");
          this.router.navigate(['admin/publicidadAdmin']);
        }else{
          alert("Error al insertar la Publicidad intente de nuevo")
        }
      },
      error=>{
        alert('error con el servicio');
      }
    );
  }

  crearPublicidad(){
    if(this.publicidad.nombre==""||this.publicidad.enlace==""||!this.nuevaImagen){
      alert('Todos los campos son requeirdos');
    }else{
      this.cargarImagen();//
    }
  }
}
