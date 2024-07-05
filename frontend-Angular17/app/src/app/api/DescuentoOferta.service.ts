
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { DescuentoOferta } from "../dominio/DescuentoOferta";
@Injectable({providedIn: "root"})
export class DescuentoOfertaService{
    private readonly _http= inject(HttpClient);

    ObtenerTodasOfertas():Observable<DescuentoOferta[]>{
       
        return this._http.get<DescuentoOferta[]>('https://localhost:7200/DescuentoOferta/ObtenerTodasOfertas?idTipoHabitacion');
    }

}