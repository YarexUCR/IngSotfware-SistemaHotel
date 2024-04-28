import { Router } from "@angular/router";
export class VerificarRutas{
    token: string | null;//token de session

  constructor(private router: Router) {
    //para resguardar ruta
    if (typeof localStorage !== 'undefined') {
      this.token = localStorage.getItem('token');
    } else {
      this.token = null;
    }
  }
  verificarModuloAdministrador() {
    //verificar autenticacion
    if (this.token == null) {
      this.router.navigate(['/login']);
    }
  }
}