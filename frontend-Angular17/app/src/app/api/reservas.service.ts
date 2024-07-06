import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reserva } from "../dominio/Reserva";

@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  private apiUrl = 'https://localhost:7200/api/reservas'; // Reemplaza con la URL de tu API

  constructor(private http: HttpClient) { }

  obtenerReserva(cliente: string): Observable<Reserva[]> {
    const url = `${this.apiUrl}/${cliente}`;
    return this.http.get<Reserva[]>(url);
  }
   obtenerReservas(cliente: string | null = null): Observable<Reserva[]> {
    const url = cliente ? `${this.apiUrl}` : this.apiUrl;
    return this.http.get<Reserva[]>(url);
  }

  actualizarBorradoLogicoReserva(id: number): Observable<boolean> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<boolean>(url, null); // Envía null o un objeto vacío dependiendo de la API
  }

  // Agrega más métodos según sea necesario para tu aplicación

}
