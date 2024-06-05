import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { HotelService } from '../api/hotel.service';
import { CommonModule } from '@angular/common';
import { Router } from "@angular/router";
interface TipoHabitacion{
    id : number;
    descripcion : string;
    cantidad : number;
    nombre : string;
    imagen : string;
    precio : number;
  }

@Component({
    selector: 'app-tarifas',
    standalone: true,
    templateUrl: './tarifas.component.html',
    styleUrl: './tarifas.component.scss',
    imports: [FooterComponent,CommonModule]
})



export class TarifasComponent {
    token: string | null;//token de session
    tiposDeHabitacion:TipoHabitacion[]=[];

    constructor(private hotelService:HotelService,private router: Router){
        if (typeof localStorage !== 'undefined') {
            this.token = localStorage.getItem('token');
          } else {
            this.token = null;
          }
    }

    ngOnInit():void{
        if (this.token != null) {
            this.router.navigate(['/admin/home']);
          }
        
    }




}
