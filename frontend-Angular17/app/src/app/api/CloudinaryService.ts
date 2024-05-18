import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {
  private cloudName = 'ml_default';
  private apiKey = '344191312322118';
  private apiSecret = 'v5SCZED9ZJaiX3p4VGESbsSFKA8';
  private cloudinaryBaseUrl = `https://api.cloudinary.com/v1_1/${this.cloudName}/resources/image/upload?folder=FotosHotel`;

  constructor(private http: HttpClient) {}

  getCloudinaryImages(): Observable<any> {
    // Configurar los encabezados de autenticación
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(`${this.apiKey}:${this.apiSecret}`)
    });

    // Realizar la solicitud GET con los encabezados de autenticación
    return this.http.get<any>(this.cloudinaryBaseUrl, { headers: headers });
  }
}


