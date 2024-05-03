import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { TipoHabitacion } from "../dominio/TipoHabitacion";
import { DatePipe } from '@angular/common';
import { Habitacion } from "../dominio/Habitacion";
@Injectable({ providedIn: "root" })
export class TipoHabitacionService {
  private readonly _http = inject(HttpClient);

  obtenerTiposHabitaciones(): Observable<TipoHabitacion[]> {
    return this._http.get<TipoHabitacion[]>('https://localhost:7200/TipoHabitacion');
  }

  obtenerHabitacionesDisponibles(checkIn: string, checkOut: string, tipoHabitacion: string): Observable<Habitacion[]> {
    return this._http.get<Habitacion[]>(`https://localhost:7200/TipoHabitacion/ObtenerHabitacionesDisponiblesParaReserva?checkIn=${checkIn}&checkOut=${checkOut}&tipoHabitacion=${tipoHabitacion}`);
  }

  obtenerTodaHabitacionesDisponibles(checkIn: string, checkOut: string): Observable<Habitacion[]> {
    return this._http.get<Habitacion[]>(`https://localhost:7200/TipoHabitacion/ObtenerTodasHabitacionesDisponiblesParaReserva?checkIn=${checkIn}&checkOut=${checkOut}`);
  }
}