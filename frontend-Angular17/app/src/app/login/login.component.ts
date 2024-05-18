import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { Router } from "@angular/router";
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { SeguridadService } from '../api/seguridad.service';
import { ModalComponent } from "../modal/modal.component";
@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    imports: [
        MatGridListModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        FooterComponent,
        CommonModule,
        FormsModule,
        ModalComponent
    ]
})
export class LoginComponent {
  token: string | null;//token de session
  usuario: string = '';
  password: string = '';
  showModal: boolean = false;
  modalTitle!: string;
  modalMessage!: string;

  constructor(private router: Router, private seguridad: SeguridadService) {
    //para resguardar ruta
    if (typeof localStorage !== 'undefined') {
      this.token = localStorage.getItem('token');
    } else {
      this.token = null;
    }
  }
  ngOnInit() {
    //verificar autenticacion
    if (this.token != null) {
      this.router.navigate(['/admin/home']);
    }
  }

  login() {
    if (!this.usuario || !this.password) {
      //modal
      this.modalTitle = 'Mensaje';
      this.modalMessage = 'Todos los campos son requeridos';
      this.showModal = true;
      //alert('Por favor, completa todos los campos.');
      return;
    }
    this.seguridad.login(this.usuario,this.password).subscribe(
    
      (respuesta) => {
        alert(JSON.stringify(respuesta));
        if(respuesta ==""){

         
          //alert('usario y constraseña invalido');
          this.modalTitle = 'Error';
          this.modalMessage = 'Usuario y/o contraseña incorrecta';
          this.showModal = true;
        }else{
         
          localStorage.setItem('token', respuesta);
          window.location.reload();
        }
        
      },
      (error) => {
        console.error('Error al llamar al servicio:', error);
        // Aquí puedes manejar el error según tu lógica
        this.modalTitle = 'Mensaje';
        this.modalMessage = 'Error en el Servicio de Seguridad';
        this.showModal = true;
      }
    );
    
  }

  closeModal() {
    this.showModal = false; // Cierra el modal cuando se emite el evento desde el componente hijo
  }

}
