import { Component } from '@angular/core';
import { FooterComponent } from "../../footer/footer.component";
import { Router } from '@angular/router';

@Component({
    selector: 'app-modificar-paginas',
    standalone: true,
    templateUrl: './modificar-paginas.component.html',
    styleUrl: './modificar-paginas.component.scss',
    imports: [FooterComponent]
})
export class ModificarPaginasComponent {
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
    if (this.token == null) {
      this.router.navigate(['/login']);
    }
  }
}
