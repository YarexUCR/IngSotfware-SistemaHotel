import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../../footer/footer.component";
import { Router } from '@angular/router';



@Component({
  selector: 'app-consultar-disponibilidad-habitaciones',
  standalone: true,
  templateUrl: './consultar-disponibilidad-habitaciones.component.html',
  styleUrl: './consultar-disponibilidad-habitaciones.component.scss',
  imports: [ FooterComponent,]
})
export class ConsultarDisponibilidadHabitacionesComponent implements OnInit {
  token: string | null;//token de session

  constructor( private router: Router) {

    //para resguardar ruta
    if (typeof localStorage !== 'undefined') {
      this.token = localStorage.getItem('token');
    } else {
      this.token = null;
    }
   
    
  }

  ngOnInit(): void{
    
    //verificar autenticacion
    if (this.token == null) {
      this.router.navigate(['/login']);
    }

    

  }
  
  

}
