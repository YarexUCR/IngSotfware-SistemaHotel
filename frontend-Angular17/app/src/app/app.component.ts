import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink,RouterOutlet } from '@angular/router';
import { NavigationComponent } from "./navigation/navigation.component";
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from "./footer/footer.component";
import { ContactenosComponent } from './contactenos/contactenos.component';
import { FacilidadesComponent } from './facilidades/facilidades.component';
import { TarifasComponent } from './tarifas/tarifas.component';
import { SobreNosotrosComponent } from './sobre-nosotros/sobre-nosotros.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';



@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    template: `
    <main>
      <header class="brand-name">
        <img class="brand-logo" src="/assets/logo.svg" alt="logo" aria-hidden="true">
      </header>
      <section class="content">
      </section>
    </main>`,

    imports: [HttpClientModule, 
      RouterLink, RouterOutlet, 
      NavigationComponent, 
      DashboardComponent, 
      FooterComponent, 
      ContactenosComponent, 
      FacilidadesComponent, 
      TarifasComponent, 
      SobreNosotrosComponent,
      CommonModule  
    ]

})
export class AppComponent {
  title = 'app';
  mostrarLogin : boolean;
  constructor(private route: ActivatedRoute){
    this.mostrarLogin = false;
  }
  
  ngOnInit():void{
    this.route.url.subscribe(url => {
      // Verifica si la URL actual es exactamente '/login' y actualiza mostrarLogin
      this.mostrarLogin = url.length === 1 && url[0].path === 'login';
    });
  }
}

