import { Component } from '@angular/core';
import { FooterComponent } from "../../footer/footer.component";
import {ActivatedRoute, Router } from '@angular/router';
import { TipoHabitacionService } from '../../api/tipo.habitacion.service';
import { TipoHabitacion } from '../../dominio/TipoHabitacion';
import { Habitacion } from '../../dominio/Habitacion';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { error } from 'console';

@Component({
  selector: 'app-cargar-tipo-habitacion',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './cargar-tipo-habitacion.component.html',
  styleUrl: './cargar-tipo-habitacion.component.scss'
})
export class CargarTipoHabitacionComponent {
  token: string | null;//token de session
  tipo : TipoHabitacion | null = null;
  precio : number|null=null;
  descripcion: string|null=null;
  constructor(private route: ActivatedRoute,private router: Router,private servicio : TipoHabitacionService) {
    //para resguardar ruta
    if (typeof localStorage !== 'undefined') {
      this.token = localStorage.getItem('token');
    } else {
      this.token = null;
    }
    this.route.queryParams.subscribe(params => {
      this.tipo = params['tipo'] ? JSON.parse(params['tipo']) : null; // Recibe la reserva como parámetro
      if(this.tipo){
        this.precio = this.tipo?.precio;
        this.descripcion = this.tipo?.descripcion
      }
      
    });
  }
  ngOnInit() {
    //verificar autenticacion
    if (this.token == null) {
      this.router.navigate(['/login']);
    }
  }

  cancelar(){
    this.router.navigate(['/admin/administrarHabitaciones']);
  }

  enviar(_tipo:TipoHabitacion){
    this.servicio.actualizarTipoHabitacion(_tipo).subscribe(
      data=>{
        if(data){
          if(this.tipo){
            alert('Actualizacion completa');
          }
          
        }else{
          alert('Ha ocurrido un error');
        }
      },
      error=>{
        alert('Ha ocurrido un error con el servicio');
      }
    );
  }

  actualizar(){
    if(!this.precio||!this.descripcion){
      alert('Recuerda que todos los campos son obligatorios');
      return;
    }
    if(this.precio<=0){
      alert('El precio debe ser mayor a 0');
      return;
    }
    if(this.tipo){
      this.tipo.precio=this.precio;
      this.tipo.descripcion=this.descripcion;
      this.enviar(this.tipo);
    }
  }

}
