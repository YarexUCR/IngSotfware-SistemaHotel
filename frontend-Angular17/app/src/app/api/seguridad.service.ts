import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({providedIn: "root"})
export class SeguridadService {
    private apiUrl = 'https://localhost:7154'; // Reemplaza esto con la URL de tu servicio
  
    constructor(private http: HttpClient) { }
  
    // Método para insertar una reserva
    login(nombreUsuario: string, contrasena : string): Observable<string> {
        const url = `${this.apiUrl}/Administrador?nombreUsuario=${nombreUsuario}&contrasena=${contrasena}`;
        return this.http.get<any>(url);
    }
  }