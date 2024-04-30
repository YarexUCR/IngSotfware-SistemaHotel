
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { HabiacionesConsulta } from "../dominio/HabiacionesConsulta";
@Injectable({providedIn: "root"})
export class HabitacionesService{
    private readonly _http= inject(HttpClient);

    getHabitaciones(check:string):Observable<HabiacionesConsulta>{
       
        return this._http.get<HabiacionesConsulta>('https://localhost:7200/Habitacion/verificar?check='+check);
    }

}