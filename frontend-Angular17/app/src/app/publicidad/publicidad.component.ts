import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleriaModule} from 'primeng/galleria';
import { PrimeNGConfig } from 'primeng/api';
import { PublicidadService } from '../api/Publicidad.service';
import { Publicidad } from '../dominio/Publicidada';
import { Interface } from 'readline';
import { ModalComponent } from '../modal/modal.component';

interface image{
  itemImageSrc: string, 
  thumbnailImageSrc: string,
  enlace: string

}

@Component({
  selector: 'app-publicidad',
  standalone: true,
  imports: [CommonModule,GalleriaModule, ModalComponent],
  templateUrl: './publicidad.component.html',
  styleUrl: './publicidad.component.scss'
})
export class PublicidadComponent {
  publicidades : Publicidad[]=[];
  showModal: boolean = false;
  modalTitle!: string;
  modalMessage!: string;

  images: any[]= [
   { 
      itemImageSrc: '', 
      thumbnailImageSrc: '',
      enlace: ''
    }/*,
    { 
      itemImageSrc: 'assets/Publicidad/smirnoff.jpg', 
      thumbnailImageSrc: 'assets/Publicidad/smirnoff.jpg',
      enlace: 'https://www.smirnoff.com/es-mx'
    },
    { 
      itemImageSrc: 'assets/Publicidad/coca.jpg', 
      thumbnailImageSrc: 'assets/Publicidad/coca.jpg',
      enlace: 'https://coca-colafemsa.com/'
    },
    */
  ];

  
  constructor(private primengConfig: PrimeNGConfig, private servicio: PublicidadService) { 
    this.images
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.servicio.ObtenerTodasPublicidad().subscribe(
      data=>{
        this.publicidades=data;
        this.images=[];
        this.publicidades.forEach(publicidad_ =>{
          
          let image = {
            itemImageSrc: publicidad_.imagen, 
            thumbnailImageSrc: publicidad_.imagen,
            enlace: publicidad_.enlace
          }
          this.images.push(image);
        });

      },
      error=>{
        //alert("Error con el servicio");
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