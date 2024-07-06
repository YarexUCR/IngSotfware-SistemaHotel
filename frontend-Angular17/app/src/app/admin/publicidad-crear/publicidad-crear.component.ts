import { Component } from '@angular/core';
import { FooterComponent } from "../../footer/footer.component";
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Publicidad } from '../../dominio/Publicidada';
import { PublicidadService } from '../../api/Publicidad.service';
import { error } from 'console';
import { ModalComponent } from '../../modal/modal.component';
interface Enlace {
  url: string
}
@Component({
  selector: 'app-publicidad-crear',
  standalone: true,
  imports: [FooterComponent,FormsModule, ModalComponent],
  templateUrl: './publicidad-crear.component.html',
  styleUrl: './publicidad-crear.component.scss'
})
export class PublicidadCrearComponent {
  token: string | null;//token de session
  nuevaImagen: File | null = null;
  publicidad: Publicidad = {id : 0, nombre : "",enlace: "", imagen: "" };
  enlace: Enlace | null = null;
  showModal: boolean = false;
  modalTitle!: string;
  modalMessage!: string;
 
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
        //alert('Debes seleccionar una imagen con formarto JPEG, PNG O GIF');
        this.modalTitle = 'Mensaje';
        this.modalMessage = 'Debes seleccionar una imagen con formarto JPEG, PNG O GIF';
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
        //alert(this.nuevaImagen?.name+" ha sido seleccionada");
        this.modalTitle = 'Mensaje';
        this.modalMessage = this.nuevaImagen?.name+" ha sido seleccionada";
        this.showModal = true;
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
          //alert('error con el servicio');
          this.modalTitle = 'Mensaje';
          this.modalMessage = 'Error con el servicio';
          this.showModal = true;
        }
      );
    }
  }

  cargarPublicidad(){
    this.servicio.InsertarPublicidad(this.publicidad).subscribe(
      data=>{
        if(data){
          //alert("La Publicidad se inserto correctamente");
          this.modalTitle = 'Mensaje';
          this.modalMessage = 'La Publicidad se inserto correctamente';
          this.showModal = true;
          this.router.navigate(['admin/publicidadAdmin']);
        }else{
          //alert("Error al insertar la Publicidad intente de nuevo")
          this.modalTitle = 'Mensaje';
          this.modalMessage = 'Error al insertar la Publicidad intente de nuevo';
          this.showModal = true;
        }
      },
      error=>{
        //alert('Error con el servicio');
        this.modalTitle = 'Mensaje';
        this.modalMessage = 'Error con el servicio';
        this.showModal = true;
      }
    );
  }

  crearPublicidad(){
    if(this.publicidad.nombre==""||this.publicidad.enlace==""||!this.nuevaImagen){
      //alert('Todos los campos son requeridos');
      this.modalTitle = 'Mensaje';
      this.modalMessage = 'Todos los campos son requeridos';
      this.showModal = true;
    }else{
      this.cargarImagen();//
    }
  }

  closeModal() {
    this.showModal = false; // Cierra el modal cuando se emite el evento desde el componente hijo
  }

}
