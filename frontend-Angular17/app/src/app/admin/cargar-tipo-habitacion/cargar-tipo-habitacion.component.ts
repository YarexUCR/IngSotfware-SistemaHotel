import { Component } from '@angular/core';
import { FooterComponent } from "../../footer/footer.component";
import {ActivatedRoute, Router } from '@angular/router';
import { TipoHabitacionService } from '../../api/tipo.habitacion.service';
import { TipoHabitacion } from '../../dominio/TipoHabitacion';
import { Habitacion } from '../../dominio/Habitacion';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cargar-tipo-habitacion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cargar-tipo-habitacion.component.html',
  styleUrl: './cargar-tipo-habitacion.component.scss'
})
export class CargarTipoHabitacionComponent {
  token: string | null;//token de session
  tipo : TipoHabitacion | null = null;
  constructor(private route: ActivatedRoute,private router: Router,private servicio : TipoHabitacionService) {
    //para resguardar ruta
    if (typeof localStorage !== 'undefined') {
      this.token = localStorage.getItem('token');
    } else {
      this.token = null;
    }
    this.route.queryParams.subscribe(params => {
      this.tipo = params['tipo'] ? JSON.parse(params['tipo']) : null; // Recibe la reserva como parámetro
    });
  }
  ngOnInit() {
    //verificar autenticacion
    if (this.token == null) {
      this.router.navigate(['/login']);
    }
  }

}
