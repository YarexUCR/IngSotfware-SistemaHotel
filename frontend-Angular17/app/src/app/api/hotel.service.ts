import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
interface TipoHabitacion_{
   id : number;
   descripcion : string;
   cantidad : number;
   nombre : string;
   imagen : string;
   precio : number;
}
@Injectable({providedIn: "root"})
export class HotelService{
    private readonly _http= inject(HttpClient);

    getTiposHabitaciones():Observable<TipoHabitacion_[]>{
         return this._http.get<TipoHabitacion_[]>('https://localhost:7200/TipoHabitacion');
    }
}