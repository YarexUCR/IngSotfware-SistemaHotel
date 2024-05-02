import { HttpClient,HttpParams } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { TipoHabitacion } from "../dominio/TipoHabitacion";
@Injectable({providedIn: "root"})
export class HotelService{
    private readonly _http= inject(HttpClient);

    obtenerTiposHabitaciones():Observable<TipoHabitacion[]>{
         return this._http.get<TipoHabitacion[]>('https://localhost:7200/TipoHabitacion');
    }

    obtenerHabitacionesDisponibles(checkIn: string, checkOut: string, tipoHabitacion: number): Observable<any> {
        const params = new HttpParams()
          .set('checkIn', checkIn)
          .set('checkOut', checkOut)
          .set('tipoHabitacion', tipoHabitacion.toString());
    
        return this._http.get('https://localhost:7200/TipoHabitacion/ObtenerHabitacionesDisponiblesParaReserva', { params });
      }
}