import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { Tipo, TipoHabitacion } from "../dominio/TipoHabitacion";
import { DatePipe } from '@angular/common';
import { Habitacion } from "../dominio/Habitacion";
import { HabitacionesDisponibles } from "../dominio/Habitacion";
@Injectable({ providedIn: "root" })

export class TipoHabitacionService {

  private readonly _http = inject(HttpClient);

  obtenerTiposHabitaciones(): Observable<TipoHabitacion[]> {
    return this._http.get<TipoHabitacion[]>('https://localhost:7200/TipoHabitacion');
  }

  obtenerHabitacionesDisponibles(checkIn: string, checkOut: string, tipoHabitacion: number): Observable<Habitacion[]> {
    return this._http.get<Habitacion[]>('https://localhost:7200/TipoHabitacion/ObtenerHabitacionesDisponiblesParaReserva?checkIn=' + checkIn + '&checkOut=' + checkOut + '&tipoHabitacion=' + tipoHabitacion);
  }

  obtenerTodasHabitacionesDisponibles(checkIn: string, checkOut: string): Observable<Habitacion[]> {
    return this._http.get<Habitacion[]>('https://localhost:7200/TipoHabitacion/ObtenerTodasHabitacionesDisponiblesParaReserva?checkIn=' + checkIn + '&checkOut=' + checkOut);
  }

  obtenerCantidadHabitacionesDisponibles(checkIn: string, checkOut: string): Observable<HabitacionesDisponibles[]> {
    return this._http.get<HabitacionesDisponibles[]>(`https://localhost:7200/TipoHabitacion/ObtenerCantidadHabitacionesDisponibles?fechaInicio=${checkIn}&fechaFin=${checkOut}`);
  }

  obtenerCantidadHabitacionesDisponiblesPorDiaTipo(tipo: number, fecha: string): Observable<number> {
    return this._http.get<number>('https://localhost:7200/TipoHabitacion/ObtenerCantidadHabitacionesDisponiblesPorDiaTipo?fecha=' + fecha + '&tipoHabitacionId=' + tipo);
  }

  obtenerTodasHabitaciones(): Observable<Habitacion[]> {
    return this._http.get<Habitacion[]>('https://localhost:7200/TipoHabitacion/ObtenerTodasHabitaciones');
  }

  actualizarTipoHabitacion(tipo: TipoHabitacion): Observable<boolean> {
    let _tipo = {
      nombre: tipo.nombre,
      id: tipo.id,
      descripcion: tipo.descripcion,
      precio: tipo.precio,
      imagen: tipo.imagen,
      cantidad: tipo.cantidad
    }
    return this._http.post<boolean>(`https://localhost:7200/TipoHabitacion/ActualizarTipoHabitacion`, _tipo);
  }
}