import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { HotelService } from '../api/hotel.service';
import { CommonModule } from '@angular/common';
import { Router } from "@angular/router";
import { DescuentoOferta } from '../dominio/DescuentoOferta';
import { TipoHabitacion } from '../dominio/TipoHabitacion';
import { DescuentoOfertaService } from '../api/DescuentoOferta.service';
import { TipoHabitacionService } from '../api/tipo.habitacion.service';
import { MatDividerModule } from '@angular/material/divider';
import { ModalComponent } from '../modal/modal.component';

@Component({
    selector: 'app-tarifas',
    standalone: true,
    templateUrl: './tarifas.component.html',
    styleUrl: './tarifas.component.scss',
    imports: [FooterComponent,CommonModule,MatDividerModule,ModalComponent]
})



export class TarifasComponent {
    token: string | null;//token de session
    tiposDeHabitacion:TipoHabitacion[]=[];
    descuentosOfertas : DescuentoOferta []=[];
    showModal: boolean = false;
    modalTitle!: string;
    modalMessage!: string;
    constructor(private tipoHabitacionServicio :TipoHabitacionService,private router: Router, private desuentoOfertaSercivio : DescuentoOfertaService){

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

        this.ObtenerTiposHabitaciones();
        this.ObtenerTodasOfertas();
    }

    ObtenerTodasOfertas(){
        this.desuentoOfertaSercivio.ObtenerTodasOfertas().subscribe(
          data=>{
            this.descuentosOfertas = data;
          }
        );
    }

    ObtenerTiposHabitaciones(){
      this.tipoHabitacionServicio.obtenerTiposHabitaciones().subscribe(
        data => {
          this.tiposDeHabitacion=data;
        },
        error => {
          alert('Ha ocurrido un erro con el servicio');
          this.modalTitle = 'Mensaje';
          this.modalMessage = 'Ha ocurrido un error con el servicio';
          this.showModal = true;
        }
      );
    }

    closeModal() {
      this.showModal = false; // Cierra el modal cuando se emite el evento desde el componente hijo
    }

}
