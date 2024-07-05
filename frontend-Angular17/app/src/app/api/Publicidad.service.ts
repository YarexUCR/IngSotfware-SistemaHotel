import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { DescuentoOferta } from "../dominio/DescuentoOferta";
import { Publicidad } from "../dominio/Publicidada";
@Injectable({providedIn: "root"})
export class PublicidadService{
    private readonly _http= inject(HttpClient);

    InsertarImagen(file: File): Observable<any> {
        const formulario: FormData = new FormData();
        formulario.append('file', file, file.name);
    
        return this._http.post<any>('https://localhost:7200/Publicidad/CrearPublicidadImagen', formulario);
    }

    InsertarPublicidad(publicidad:Publicidad):Observable<any>{
        return this._http.post<any>('https://localhost:7200/Publicidad/InsertarPublicidad',publicidad);
    }
    
    ObtenerTodasPublicidad():Observable<Publicidad[]>{
        return this._http.get<Publicidad[]>('https://localhost:7200/Publicidad/ObtenerTodasPublicidad');
    }

    EliminarPublicidad(id:number):Observable<any>{
        return this._http.delete<any>('https://localhost:7200/Publicidad/'+id);
    }
}