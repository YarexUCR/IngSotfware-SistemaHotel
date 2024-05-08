import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { Reserva } from "../dominio/Reserva";
import { Oferta } from "../dominio/Oferta";
@Injectable({providedIn: "root"})
export class OfertaService {
    private apiUrl = 'https://localhost:7200'; // Reemplaza esto con la URL de tu servicio
  
    constructor(private http: HttpClient) { }
  
    // Método para insertar una reserva
    insertarOferta(nuevaOferta: Oferta): Observable<boolean> {
          return this.http.post<boolean>(`${this.apiUrl}/api/Oferta`, nuevaOferta);
    }
    // Método para obtener todas las reservas
    obtenerOferta(): Observable<Oferta[]> {
      return this.http.get<Oferta[]>(`${this.apiUrl}/api/Oferta`);
    }
  }