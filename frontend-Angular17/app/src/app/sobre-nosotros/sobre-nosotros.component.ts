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
    GalleriaModule
  ],
  templateUrl: './sobre-nosotros.component.html',
  styleUrls: ['./sobre-nosotros.component.scss'] // Corregido 'styleUrls'
})
export class SobreNosotrosComponent  {

  token: string | null;//token de session

  constructor(private router: Router) {
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
  }

  images: any[] = [
    { 
      itemImageSrc: 'assets/Hotel/Hotel1.jpg', 
      thumbnailImageSrc: 'assets/Hotel/Hotel1.jpg'
    },
    { 
      itemImageSrc: 'assets/Hotel/Hotel2.jpg', 
      thumbnailImageSrc: 'assets/Hotel/Hotel2.jpg'
    },
    { 
      itemImageSrc: 'assets/Hotel/Hotel3.jpg', 
      thumbnailImageSrc: 'assets/Hotel/Hotel3.jpg'
    },
    { 
      itemImageSrc: 'assets/Hotel/Hotel4.jpg', 
      thumbnailImageSrc: 'assets/Hotel/Hotel4.jpg'
    },
    { 
      itemImageSrc: 'assets/Hotel/Hotel5.jpg', 
      thumbnailImageSrc: 'assets/Hotel/Hotel5.jpg'
    },
    { 
      itemImageSrc: 'assets/Hotel/Hotel6.jpg', 
      thumbnailImageSrc: 'assets/Hotel/Hotel6.jpg'
    },
    { 
      itemImageSrc: 'assets/Hotel/Hotel7.jpg', 
      thumbnailImageSrc: 'assets/Hotel/Hotel7.jpg'
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

} 
