import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { TipoHabitacion } from "../dominio/TipoHabitacion";
@Injectable({providedIn: "root"})
export class HotelService{
    private readonly _http= inject(HttpClient);

    getTiposHabitaciones():Observable<TipoHabitacion[]>{
         return this._http.get<TipoHabitacion[]>('https://localhost:7200/TipoHabitacion');
    }
}