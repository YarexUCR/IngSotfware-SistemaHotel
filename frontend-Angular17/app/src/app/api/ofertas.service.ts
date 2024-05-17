import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { Reserva } from "../dominio/Reserva";
import { Oferta } from "../dominio/Oferta";
import { get } from "http";
@Injectable({providedIn: "root"})
export class OfertaService {
    eliminarOferta(idOferta: number) {
      return this.http.delete(`${this.apiUrl}/api/Oferta/${idOferta}`);
    }
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

    getOferta(id: number): Observable<Oferta> {
      return this.http.get<Oferta>(`${this.apiUrl}/api/Oferta/${id}`);
    }
    actualizarOferta(id: number, oferta: Oferta): Observable<boolean> {
 
            return this.http.put<boolean>(`${this.apiUrl}/api/Oferta/${id}`, oferta);
    }
   
    
    
  }