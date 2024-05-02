import { Component } from '@angular/core';
import { FooterComponent } from "../../footer/footer.component";
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HabitacionesService } from "../../api/Habitaciones.service";
import { ActivatedRoute, Router } from '@angular/router';
import {HabiacionesConsulta} from "../../dominio/HabiacionesConsulta";
import { MatPaginator, PageEvent } from '@angular/material/paginator';
@Component({
    selector: 'app-ver-estado-hotel-hoy',
    standalone: true,
    templateUrl: './ver-estado-hotel-hoy.component.html',
    styleUrl: './ver-estado-hotel-hoy.component.scss',
    imports: [MatTableModule, MatButtonModule, MatDividerModule, MatIconModule, CommonModule, MatPaginatorModule,MatPaginator,FooterComponent]
})
export class VerEstadoHotelHoyComponent {
  habitaciones: HabiacionesConsulta[] = [];
  check: string | null = null;
  token: string | null;//token de session
  habitacionesPaginadas: HabiacionesConsulta[] = [];

  cargarHabitacionesPaginadas(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.habitacionesPaginadas = this.habitaciones.slice(startIndex, endIndex);
  }
  constructor(private habitacionesServices: HabitacionesService, private routerA: ActivatedRoute,private router: Router) {
    //para resguardar ruta
    if (typeof localStorage !== 'undefined') {
      this.token = localStorage.getItem('token');
    } else {
      this.token = null;
    }
  }
  ngOnInit() {
    this.obtenerHora();
    //verificar autenticacion
    if (this.token == null) {
      this.router.navigate(['/login']);
    }
  }


  //obtener hora de costa rica
obtenerHora(){
  
  fetch('http://worldtimeapi.org/api/timezone/America/Costa_Rica')
  .then(response => response.json())
  .then(data => {
    const fechaHoraActual = new Date(data.datetime);
    // Extraer año, mes y día
    const año = fechaHoraActual.getFullYear();
    const mes = ('0' + (fechaHoraActual.getMonth() + 1)).slice(-2); // Agregar ceros a la izquierda si es necesario
    const dia = ('0' + fechaHoraActual.getDate()).slice(-2); // Agregar ceros a la izquierda si es necesario
    // Formatear la fecha en el formato AAAA-MM-DD
    this.check = `${año}-${mes}-${dia}`;
    const checkValue = this.check !== null ? this.check : '';

    this.habitacionesServices.getHabitaciones(checkValue).subscribe(data => {
      if (Array.isArray(data)) {
        this.habitaciones = data; // Asigna el array de habitaciones
        this.habitacionesPaginadas = this.habitaciones.slice(0, 5);
      } else {
        // Si data no es un array, podría manejarlo según tus necesidades, por ejemplo, asignar un array vacío
        this.habitaciones = [];
        this.habitacionesPaginadas = [];
      }
      console.log(this.habitaciones);
    });
  })
  .catch(error => {
    console.error('Error al obtener la fecha de Costa Rica:', error);
  });

}
}
