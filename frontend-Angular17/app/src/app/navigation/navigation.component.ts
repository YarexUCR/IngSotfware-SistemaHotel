import { Component, inject,HostListener } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { DashboardComponent } from "../dashboard/dashboard.component";
import {RouterLink, RouterOutlet} from '@angular/router';
import { FooterComponent } from "../footer/footer.component";
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardFooter } from '@angular/material/card';
import { PublicidadComponent } from "../publicidad/publicidad.component";
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrl: './navigation.component.scss',
    standalone: true,
    imports: [
        MatCard, MatCardFooter,
        RouterLink,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatListModule,
        MatIconModule,
        AsyncPipe,
        DashboardComponent,
        RouterOutlet,
        FooterComponent,
        PublicidadComponent,
        CommonModule,
        MatButton
    ]
})
export class NavigationComponent {
  private breakpointObserver = inject(BreakpointObserver);
  esLogin: boolean = false;
  mostrarAdminMensaje: boolean=false;
  mostrarNombre: boolean = true;

  constructor(private router: Router) {

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.esLogin = this.router.url === '/login';
      }
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && event.url === '/login') {
        // Mostrar el mensaje "Módulo Administrador" cuando se carga la ruta '/login'
        this.mostrarAdminMensaje = true;
      } else {
        this.mostrarAdminMensaje = false;
      }
    });

    // Verificar si localStorage está disponible antes de acceder a él
    if (typeof localStorage !== 'undefined') {
      this.token = localStorage.getItem('token');
    } else {
      this.token = null;
    }

    
  }
  token: string |  null;
  ngOnInit(){
    this.checkTamañoVentana();
  }
  
  cerrarSession(){
    localStorage.removeItem('token');
    window.location.reload();
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkTamañoVentana();
  }
  checkTamañoVentana(): void {
    this.mostrarNombre= window.innerWidth >= 820; // Devuelve un valor booleano según el tamaño de la ventana
    this.mostrarAdminMensaje = window.innerWidth >= 390;
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
}
