import { Component } from '@angular/core';
import { RouterLink,RouterOutlet } from '@angular/router';
import { NavigationComponent } from "./navigation/navigation.component";
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from "./footer/footer.component";
import { ContactenosComponent } from './contactenos/contactenos.component';
import { FacilidadesComponent } from './facilidades/facilidades.component';
import { TarifasComponent } from './tarifas/tarifas.component';


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
    imports: [RouterLink, RouterOutlet, NavigationComponent, DashboardComponent, FooterComponent, ContactenosComponent, FacilidadesComponent, TarifasComponent]
})
export class AppComponent {
  title = 'app';
}

