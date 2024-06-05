import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Hotel } from "../dominio/Hotel";
@Injectable({ providedIn: "root" })


export class HotelService {
    constructor(private http: HttpClient) { }

    ObtenerHome(id: number): Observable<Hotel> {
        return this.http.get<Hotel>("https://localhost:7200/Hotel/ObtenerHome?id="+id);
    }

    ActualizarHome(hotel: Hotel): Observable<boolean> {
        return this.http.post<boolean>("https://localhost:7200/Hotel/ActualizarHome",hotel);
    }

    ObtenerComoLlegar(id: number): Observable<Hotel> {
        return this.http.get<Hotel>("https://localhost:7200/Hotel/ObtenerComoLlegar?id="+id);
    }

    ActualizarComoLlegar(hotel: Hotel): Observable<boolean> {
        return this.http.post<boolean>("https://localhost:7200/Hotel/ActualizarComoLlegar",hotel);
    }

    ObtenerSobreNosotros(id: number): Observable<Hotel> {
        return this.http.get<Hotel>("https://localhost:7200/Hotel/ObtenerSobreNosotros?id="+id);
    }

    ActualizarSobreNosotros(hotel: Hotel): Observable<boolean> {
        return this.http.post<boolean>("https://localhost:7200/Hotel/ActualizarSobreNosotros",hotel);
    }

    ObtenerFacilidades(id: number): Observable<Hotel> {
        return this.http.get<Hotel>("https://localhost:7200/Hotel/ObtenerFacilidades?id="+id);
    }

    ActualizarFacilidades(hotel: Hotel): Observable<boolean> {
        return this.http.post<boolean>("https://localhost:7200/Hotel/ActualizarFacilidades",hotel);
    }

}