import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleriaModule} from 'primeng/galleria';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-publicidad',
  standalone: true,
  imports: [CommonModule,GalleriaModule],
  templateUrl: './publicidad.component.html',
  styleUrl: './publicidad.component.scss'
})
export class PublicidadComponent {
  

  images: any[] = [
    { 
      itemImageSrc: 'assets/Publicidad/doritos.jpeg', 
      thumbnailImageSrc: 'assets/Publicidad/doritos.jpeg'
    },
    { 
      itemImageSrc: 'assets/Publicidad/smirnoff.jpg', 
      thumbnailImageSrc: 'assets/Publicidad/smirnoff.jpg'
    },
    { 
      itemImageSrc: 'assets/Publicidad/coca.jpg', 
      thumbnailImageSrc: 'assets/Publicidad/coca.jpg'
    },
   
  ];

  
  constructor(private primengConfig: PrimeNGConfig) { }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }
  
}