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
  nombre : string | null;
  enlace : string | null;
  imagen : string | null;
  constructor(private router: Router) {
    this.nombre = "";
    this.enlace = "";
    this.imagen = "";
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

  crearPublicidad(){
    if(!this.nombre || !this.enlace){
      alert('Todos los campos son obligatorios');
      alert(this.nombre);
      alert(this.enlace);
    }else{
      
    }
  }
}
