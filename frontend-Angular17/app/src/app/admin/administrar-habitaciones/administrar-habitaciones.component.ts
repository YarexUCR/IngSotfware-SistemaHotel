import { Component } from '@angular/core';
import { FooterComponent } from "../../footer/footer.component";
import { Router } from '@angular/router';
import { TipoHabitacionService } from '../../api/tipo.habitacion.service';
import { TipoHabitacion } from '../../dominio/TipoHabitacion';
import { Habitacion } from '../../dominio/Habitacion';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-administrar-habitaciones',
    standalone: true,
    templateUrl: './administrar-habitaciones.component.html',
    styleUrl: './administrar-habitaciones.component.scss',
    imports: [FooterComponent,CommonModule]
})
export class AdministrarHabitacionesComponent {
  token: string | null;//token de session
  tipos : TipoHabitacion[]=[];
  habitaciones : Habitacion[]=[];
  constructor(private router: Router,private servicio : TipoHabitacionService) {
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
    this.servicio.obtenerTiposHabitaciones().subscribe(data => {
      this.tipos = data;
    });

    this.servicio.obtenerTodasHabitaciones().subscribe(data => {
      this.habitaciones = data;
    });
  }

  obtenerHabitacionesPorTipo(id:number){
    return  this.habitaciones.filter(habitacion => habitacion.tipo.id === id);
  }

  cargarTipo(id:number){
    alert(id);
  }
}
