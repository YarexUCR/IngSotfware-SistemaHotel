import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { Reserva } from "../dominio/Reserva";
import { TipoHabitacion } from "../dominio/TipoHabitacion";

@Injectable({providedIn: "root"})
export class ReservaService {
    private apiUrl = 'https://localhost:7200'; // Reemplaza esto con la URL de tu servicio
  
    constructor(private http: HttpClient) { }
  
    // Método para insertar una reserva
    insertarReserva(nuevaReserva: Reserva): Observable<string> {
          return this.http.post<any>(`${this.apiUrl}/Reserva`, nuevaReserva);
    }
  }