import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { Router } from '@angular/router';

@Component({
    selector: 'app-contactenos',
    standalone: true,
    templateUrl: './contactenos.component.html',
    styleUrl: './contactenos.component.scss',
    imports: [FooterComponent]
})
export class ContactenosComponent {
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
}
