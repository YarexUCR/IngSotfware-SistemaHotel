import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from "../footer/footer.component";
import { CommonModule } from '@angular/common';

interface Habitacion{
  tipo : string;
  cantidad: number;
  precio: number;
  personas: number;
}

@Component({
    selector: 'app-reservar',
    standalone: true,
    templateUrl: './reservar.component.html',
    styleUrl: './reservar.component.scss',
    imports: [
        CommonModule,
        FormsModule,
        MatGridListModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        FooterComponent
    ]
})



export class ReservarComponent {

  formData: any = [];
  habitaciones : Habitacion[]=[];
  precio : number;
  personas: number;

constructor(private routerA: ActivatedRoute, private router: Router){
    this.personas = 0;
    this.precio = 0;

}

  ngOnInit():void{
    this.routerA.params.subscribe(parametros =>{console.log(parametros)});
  }
  

  agregarHabitacion(){
    
    if(this.formData.tipo_habitacion==="Standart"){
      this.precio=1000*this.formData.cantidad_habitacion;
      this.personas = 4;
    }else if(this.formData.tipo_habitacion==="Junior"){
      this.precio=2000*this.formData.cantidad_habitacion;
      this.personas = 2;
    }else if(this.formData.tipo_habitacion==="Presidencial"){
      this.precio=3000*this.formData.cantidad_habitacion;
      this.personas = 8;
    }
    const nuevaHabitacion: Habitacion = {
      tipo: this.formData.tipo_habitacion,
      cantidad: this.formData.cantidad_habitacion,
      precio: this.precio,
      personas : this.personas*this.formData.cantidad_habitacion
    };
    this.habitaciones.push(nuevaHabitacion);
    alert('Habitación agregada.');
    
    this.precio = 0;
  }

  quitarHabitacion(){
    alert('Habitación eliminada.');
  }

  reservar(){
    alert('Reservar');
  }
}
