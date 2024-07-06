import { Component, OnInit,NgModule } from '@angular/core';
import { FooterComponent } from '../../footer/footer.component';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Reserva } from '../../dominio/Reserva';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ReservasService } from '../../api/reservas.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-reserva',
  standalone: true,
  imports: [FooterComponent,
    MatPaginator, MatPaginatorModule,
    MatProgressSpinnerModule,MatTableModule
    ,MatDividerModule,MatButtonModule,
    MatIconModule,CommonModule,FormsModule
  ],
  templateUrl: './listar-reserva.component.html',
  styleUrl: './listar-reserva.component.scss'
})
export class ListarReservaComponent implements OnInit{



  cargando: boolean = false;
  paginacion: Reserva[] = [];
  reservas: Reserva[] = [];

  displayedColumns: string[] = ['idReserva','Cliente','cedula','Email','CheckIn', 'CheckOut','total', 'Ver','Eliminar'];
constructor(private reservasService : ReservasService,private router: Router){
  this.cargar();

}
delete(id: number) {
this.reservasService.actualizarBorradoLogicoReserva(id).subscribe(
  (data:any) => {
    this.cargar();
this.cargar(); 
 },
  (error:any) => {
    this.cargar();
  }
);
  }


  ngOnInit(): void {
    this.cargando = true;
  }
  cargar() {
this.reservasService.obtenerReservas().subscribe(
  (data) => {
      this.reservas = data;
      this.paginacion = this.reservas;
      this.cargando = false;
  },
  (error) => {
      console.error(error);
      this.cargando = false;
      
  }
);

}
ver(reservacion: Reserva) {
  this.router.navigate(['/ver-reserva', { reservacion: JSON.stringify(reservacion) }]);
}

textoBusqueda: string = '';

buscar(): void {
  if (this.textoBusqueda === '') {
    // Maneja la lógica cuando no hay texto de búsqueda
    console.log('No se ingresó texto de búsqueda');
    this.cargar();
    return;
  }

  // Llama al método obtenerReserva del servicio con el texto de búsqueda
  this.cargando = true; // Activa el estado de carga

  this.reservasService.obtenerReserva(this.textoBusqueda).subscribe(
    (data) => {
      this.reservas = data; // Asigna los resultados a la variable de reservas
      this.cargando = false; // Desactiva el estado de carga
      this.paginacion=this.reservas
      console.log('Reservas encontradas:', this.reservas);
    },
    (error) => {
      console.error('Error al obtener reservas:', error);
      this.cargando = false; // Asegúrate de desactivar el estado de carga en caso de error
    }
  );
}





  cargarPaginadas($event: PageEvent) {
    this.cargando = true;
    if ($event) {
        const startIndex = $event.pageIndex * $event.pageSize;
        const endIndex = startIndex + $event.pageSize;
        this.paginacion = this.reservas.slice(startIndex, endIndex);
        this.cargando = false;
    }
}
}
