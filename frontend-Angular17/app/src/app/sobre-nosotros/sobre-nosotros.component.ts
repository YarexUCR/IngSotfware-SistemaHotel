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
import { HttpClient } from '@angular/common/http';
import { CloudinaryService } from '../api/CloudinaryService';
export const environment = {
  production: false,
  cloudinary: {
    cloudName: 'dw2xzcpf7',
    apiKey: '344191312322118',
    apiSecret: 'v5SCZED9ZJaiX3p4VGESbsSFKA8'
  }
};





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
export class SobreNosotrosComponent {

  token: string | null;//token de session
  images: any[] = [];
  constructor(private router: Router, private http: HttpClient, public cloudinaryService: CloudinaryService) {
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

    } else {

      this.cloudinaryService.getCloudinaryImages().subscribe(data => {
        alert(JSON.stringify(data));
        this.images = data.resources.map((resource: any) => ({
          itemImageSrc: resource.url,
          thumbnailImageSrc: resource.url // Usamos la misma URL como miniatura por simplicidad
        }));
        alert(JSON.stringify(data.resources));
      });

    }
  }

}

