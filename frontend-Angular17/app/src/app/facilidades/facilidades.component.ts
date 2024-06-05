import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";
import { HotelService } from '../api/hotel.service';
import { Hotel } from '../dominio/Hotel';


@Component({
  selector: 'app-facilidades',
  standalone: true,
  templateUrl: './facilidades.component.html',
  styleUrl: './facilidades.component.scss',
  imports: [FooterComponent]

})
export class FacilidadesComponent {
  token: string | null;//token de session
  hotel: Hotel | null = null;

  constructor(private router: Router, private servicio: HotelService) {
    //para resguardar ruta
    if (typeof localStorage !== 'undefined') {
      this.token = localStorage.getItem('token');
    } else {
      this.token = null;
    }
  }
  ngOnInit() {
    //verificar autenticacion
    if (this.token != null) {
      this.router.navigate(['/admin/home']);
    }

    this.servicio.ObtenerFacilidades(1).subscribe(
      data => {
        this.hotel = data;
      },
      error => {
        alert('Ha ocurrido un erro con el servicio');
      }
    );
  }
}
