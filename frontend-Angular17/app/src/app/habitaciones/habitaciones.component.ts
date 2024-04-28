import {Component} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import {MatPaginatorModule} from '@angular/material/paginator';

interface Habitacion {
  Numero: number;
  TipoHabitacion: string;
  Disponible: boolean ;
  Activa: boolean;
}


const ELEMENT_DATA: Habitacion[] = [
  { Numero: 1, TipoHabitacion: 'Habitación Estándar', Disponible: false, Activa:true },
  { Numero: 2, TipoHabitacion: 'Habitación Junior',Disponible: true, Activa:true  },
  { Numero: 3, TipoHabitacion: 'Habitación Presidencial', Disponible: false, Activa:true }
];


@Component({
  selector: 'app-habitaciones',
  standalone: true,
  imports: [MatTableModule,MatButtonModule,MatDividerModule,MatIconModule,CommonModule,MatPaginatorModule],
  templateUrl: './habitaciones.component.html',
  styleUrl: './habitaciones.component.scss'
})
export class HabitacionesComponent {
  displayedColumns: string[] = ['Numero', 'TipoHabitacion', 'Disponible', 'Activa'];

  dataSource = ELEMENT_DATA;
}
