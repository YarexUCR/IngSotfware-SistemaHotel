// src/app/services/temporada.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Temporada } from "../dominio/Temporada";


@Injectable({
  providedIn: 'root'
})
export class TemporadaService {
  private apiUrl = `https://localhost:7200/api/Temporada`;

  constructor(private http: HttpClient) { }

  getTemporadas(): Observable<Temporada[]> {
    return this.http.get<Temporada[]>(this.apiUrl);
  }

  getTemporadaByDate(fecha: Date): Observable<Temporada> {
    const url = `${this.apiUrl}/${fecha.toISOString()}`;
    return this.http.get<Temporada>(url);
  }

  createTemporada(temporada: Temporada): Observable<boolean> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<boolean>(this.apiUrl, temporada, { headers });
  }

  updateTemporada(id: number, temporada: Temporada): Observable<boolean> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<boolean>(url, temporada, { headers });
  }

  deleteTemporada(id: number): Observable<boolean> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<boolean>(url);
  }
}
