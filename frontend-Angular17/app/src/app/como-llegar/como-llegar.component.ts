import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

declare const google: any;
@Component({
  selector: 'app-como-llegar',
  standalone: true,
  templateUrl: './como-llegar.component.html',
  styleUrl: './como-llegar.component.scss',
  imports: [
    FooterComponent,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,


  ]
})

export class ComoLlegarComponent implements OnInit {
  token: string | null;//token de session

  constructor(@Inject(PLATFORM_ID) private platformId: Object,private router: Router) { 
     //para resguardar ruta
     if (typeof localStorage !== 'undefined') {
      this.token = localStorage.getItem('token');
    } else {
      this.token = null;
    }
  }
  puntoFijoLatLng = { lat: 10.300314, lng: -85.840938 }; // Coordenadas del punto fijo
  ubicacionUsuarioMarker: any;

  ngOnInit(): void {
     //verificar autenticacion
     if (this.token != null) {
      this.router.navigate(['/admin/home']);
      
    }
    // Verifica si el código se está ejecutando en el lado del cliente
    if (isPlatformBrowser(this.platformId)) {
      // Define la función `initMap` en el ámbito global
      (window as any).initMap = this.initMap.bind(this);

      // Crea un elemento <script> para cargar la API de Google Maps
      const script = document.createElement('script');
      script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyB4IjttO1iQMAS18arj1gAVzWzdXqVW4iE&callback=initMap&libraries=maps,marker&v=beta';
      document.body.appendChild(script);

    }
  }


  initMap(): void {
    const map = new google.maps.Map(
      document.getElementById('map') as HTMLElement,
      {
        center: this.puntoFijoLatLng, // Centra el mapa en el punto fijo
        zoom: 12
      }
    );

    // Crea el marcador para el punto fijo
    new google.maps.Marker({
      position: this.puntoFijoLatLng,
      map,
      title: 'Punto Fijo'
    });

    // Obtiene la ubicación en tiempo real del usuario
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          const userLatLng = { lat: position.coords.latitude, lng: position.coords.longitude };

          // Si el marcador de la ubicación del usuario aún no está creado, créalo
          if (!this.ubicacionUsuarioMarker) {
            this.ubicacionUsuarioMarker = new google.maps.Marker({
              position: userLatLng,
              map,
              icon: {
                url: 'assets/maps/icono.svg',
                scaledSize: new google.maps.Size(50, 50)
              },
              title: 'Mi Ubicación en Tiempo Real',
             
            });
          } else {
            // Si el marcador ya está creado, actualiza su posición
            this.ubicacionUsuarioMarker.setPosition(userLatLng);
          }

          // Centra el mapa en la ubicación del usuario
          map.setCenter(userLatLng);
        const directionService= new google.maps.DirectionsService();
        const directionRenderer= new google.maps.DirectionsRenderer();
        directionRenderer.setOptions({
          markerOptions: {
            icon: {
              url: 'src\assets\maps\icono.svg', // URL del ícono personalizado para el origen
              scaledSize: new google.maps.Size(50, 50) // Tamaño del ícono
            }
          }
        });
        directionRenderer.setMap(map);

        directionService.route({
          origin: userLatLng,
          destination: this.puntoFijoLatLng,
          travelMode: google.maps.TravelMode.DRIVING
        }, (resultado: any, estado: any) => {
          if (estado === 'OK') {
            directionRenderer.setDirections(resultado);
          } else {
            console.error('Error al calcular la ruta:', estado);
          }
        });

        },
        (error) => {
          console.error('Error al obtener la ubicación:', error);
        }
      );
    } else {
      console.error('La geolocalización no está disponible en este navegador.');
    }






  }



}