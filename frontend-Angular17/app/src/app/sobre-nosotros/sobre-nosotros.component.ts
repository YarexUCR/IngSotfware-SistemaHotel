import { Component, OnInit, inject } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FooterComponent } from '../footer/footer.component';
import { GalleriaModule } from 'primeng/galleria';
import { GalleriaResponsiveOptions } from 'primeng/galleria';
import { Router } from "@angular/router";
import { Hotel } from '../dominio/Hotel';
import { HotelService } from '../api/hotel.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-sobre-nosotros',
  standalone: true,
  imports: [
    FooterComponent,
    AsyncPipe,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    GalleriaModule,
    ModalComponent
  ],
  templateUrl: './sobre-nosotros.component.html',
  styleUrls: ['./sobre-nosotros.component.scss'] // Corregido 'styleUrls'
})
export class SobreNosotrosComponent  {

  token: string | null;//token de session
  hotel: Hotel | null = null;
  showModal: boolean = false;
  modalTitle!: string;
  modalMessage!: string;
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

    this.servicio.ObtenerSobreNosotros(1).subscribe(
      data => {
        this.hotel = data;
      },
      error => {
        //alert('Ha ocurrido un erro con el servicio');
        this.modalTitle = 'Mensaje';
        this.modalMessage = 'Ha ocurrido un error con el servicio';
        this.showModal = true;
      }
    );
  }

  images: any[] = [
    { 
      itemImageSrc: 'https://www.colonialtours.com/1allinclusiveHotels.jpg', 
      thumbnailImageSrc: 'https://www.colonialtours.com/1allinclusiveHotels.jpg'
    },
    { 
      itemImageSrc: 'https://dev.clubsolaris.com/imgs/make-the-most-of-your-all-inclusive-vacation/all-inclusive-advantages_blog.jpg', 
      thumbnailImageSrc: 'https://dev.clubsolaris.com/imgs/make-the-most-of-your-all-inclusive-vacation/all-inclusive-advantages_blog.jpg'
    },
    { 
      itemImageSrc: 'https://7seasonsresort.com/wp-content/uploads/2016/10/kids-zone2.jpg', 
      thumbnailImageSrc: 'https://7seasonsresort.com/wp-content/uploads/2016/10/kids-zone2.jpg'
    },
    { 
      itemImageSrc: 'https://rtaoutdoorliving.com/wp-content/uploads/2023/11/pool-bar-with-pergola.jpg', 
      thumbnailImageSrc: 'https://rtaoutdoorliving.com/wp-content/uploads/2023/11/pool-bar-with-pergola.jpg'
    }
  ];
  responsiveOptions: GalleriaResponsiveOptions[] = [
    {
      breakpoint: '1024px',
      numVisible: 3
    },
    {
      breakpoint: '768px',
      numVisible: 2
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  
  ];

  closeModal() {
    this.showModal = false; // Cierra el modal cuando se emite el evento desde el componente hijo
  }

} 
