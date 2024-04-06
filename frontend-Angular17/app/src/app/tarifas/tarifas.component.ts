import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { HotelService } from '../api/hotel.service';
import { CommonModule } from '@angular/common';

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

    tiposDeHabitacion:TipoHabitacion[]=[];

    constructor(private hotelService:HotelService){
    
    }

    ngOnInit():void{
        this.hotelService.getTiposHabitaciones().subscribe(data => {
            this.tiposDeHabitacion = data;
        });
    }




}
